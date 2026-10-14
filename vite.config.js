import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { readFileSync, writeFileSync, mkdtempSync } from 'node:fs'
import { join } from 'node:path'
import { tmpdir } from 'node:os'
import { pathToFileURL } from 'node:url'

const SITE_URL = 'https://chromattic.rocks'

// Offset of Europe/Brussels on a given date, e.g. "+02:00"
function brusselsOffset(date, time) {
  const d = new Date(`${date}T${time || '12:00'}:00Z`)
  const part = new Intl.DateTimeFormat('en-US', { timeZone: 'Europe/Brussels', timeZoneName: 'longOffset' })
    .formatToParts(d)
    .find((p) => p.type === 'timeZoneName')
  const m = part?.value.match(/GMT([+-]\d{2}:\d{2})/)
  return m ? m[1] : '+01:00'
}

// Description comes from the show record. A written description wins;
// otherwise the sentence is built only from fields that show actually has.
function eventDescription(show) {
  if (typeof show.description === 'string' && show.description.trim()) {
    return show.description.trim()
  }
  const place = [show.venue, show.area, show.location].filter(Boolean).join(', ')
  let text = `Liveoptreden van Chromattic: ${show.title}`
  if (place) text += ` (${place})`
  if (show.time) text += `, aanvang ${show.time}`
  text += '.'
  if (show.free) text += ' Gratis toegang.'
  return text
}

function eventStartDate(show) {
  if (!show.time) return show.date
  return `${show.date}T${show.time}:00${brusselsOffset(show.date, show.time)}`
}

// endDate is the start instant plus durationMinutes when both a start time
// and a duration are recorded. No current show has both, so the published
// value matches startDate rather than an invented end time.
function eventEndDate(show, startDate) {
  const duration = show.durationMinutes
  if (!show.time || !Number.isFinite(duration) || duration <= 0) return startDate

  const [hours, minutes] = show.time.split(':').map(Number)
  const totalMinutes = hours * 60 + minutes + duration
  const dayOffset = Math.floor(totalMinutes / (24 * 60))
  const endMinutes = totalMinutes % (24 * 60)
  const endTime = `${String(Math.floor(endMinutes / 60)).padStart(2, '0')}:${String(endMinutes % 60).padStart(2, '0')}`
  let endDay = show.date
  if (dayOffset > 0) {
    const day = new Date(`${show.date}T00:00:00Z`)
    day.setUTCDate(day.getUTCDate() + dayOffset)
    endDay = day.toISOString().slice(0, 10)
  }
  return `${endDay}T${endTime}:00${brusselsOffset(endDay, endTime)}`
}

// Offers are included only when the show record has a real price or ticket URL.
// `free: true` is an explicit price of 0 EUR. Shows with neither are omitted.
function eventOffers(show) {
  const offer = { '@type': 'Offer' }
  let hasOffer = false
  if (show.free === true) {
    offer.price = '0'
    offer.priceCurrency = 'EUR'
    hasOffer = true
  }
  if (typeof show.ticketsUrl === 'string' && show.ticketsUrl.trim()) {
    offer.url = show.ticketsUrl.trim()
    hasOffer = true
  }
  return hasOffer ? offer : null
}

// Build-time JSON-LD (schema.org MusicEvent) generated from src/data/shows.js,
// so every show added to the data file is automatically marked up.
function showsJsonLd() {
  return {
    name: 'shows-jsonld',
    async transformIndexHtml(html) {
      const src = readFileSync(new URL('./src/data/shows.js', import.meta.url), 'utf8')
        .replace(/import\.meta\.env\.BASE_URL/g, '"/"')
      const tmp = join(mkdtempSync(join(tmpdir(), 'shows-')), 'shows.mjs')
      writeFileSync(tmp, src)
      const { shows } = await import(pathToFileURL(tmp).href)

      const band = { '@type': 'MusicGroup', name: 'Chromattic', url: SITE_URL }
      const events = shows
        .filter((s) => !/priv[eé]/i.test(s.title)) // private parties are not public events
        .sort((a, b) => b.date.localeCompare(a.date))
        .map((s) => {
          const postal = s.location.match(/^(\d{4})\s+(.*)$/)
          const locality = postal ? postal[2] : s.location
          const startDate = eventStartDate(s)
          const event = {
            '@type': 'MusicEvent',
            name: `Chromattic @ ${s.title}`,
            description: eventDescription(s),
            startDate,
            endDate: eventEndDate(s, startDate),
            eventStatus: 'https://schema.org/EventScheduled',
            eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
            location: {
              '@type': 'Place',
              name: s.venue || s.title,
              address: {
                '@type': 'PostalAddress',
                addressLocality: locality,
                ...(postal ? { postalCode: postal[1] } : {}),
                addressCountry: 'BE',
              },
            },
            image: [`${SITE_URL}${s.image || '/images/og-image.jpg'}`],
            performer: band,
            organizer: band,
            url: `${SITE_URL}/#shows`,
          }
          if (s.free) event.isAccessibleForFree = true
          const offers = eventOffers(s)
          if (offers) event.offers = offers
          return event
        })

      const json = JSON.stringify({ '@context': 'https://schema.org', '@graph': events }, null, 2)
        .replace(/</g, '\\u003c')
      return html.replace(
        '</head>',
        `    <script type="application/ld+json" id="shows-jsonld">\n${json}\n    </script>\n  </head>`
      )
    },
  }
}

// https://vite.dev/config/
// Base path is configurable via VITE_BASE_URL environment variable
// Defaults to '/' for Vercel deployment
// GitHub Pages workflow sets VITE_BASE_URL=/Chrommatic/
export default defineConfig({
  plugins: [react(), showsJsonLd()],
  base: process.env.VITE_BASE_URL || '/',
})
