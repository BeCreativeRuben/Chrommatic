import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { readFileSync, writeFileSync, mkdtempSync } from 'node:fs'
import { join } from 'node:path'
import { tmpdir } from 'node:os'
import { pathToFileURL } from 'node:url'

const SITE_URL = 'https://chromattic.rocks'

function loadDataModule(relativePath) {
  const src = readFileSync(new URL(relativePath, import.meta.url), 'utf8')
    .replace(/import\.meta\.env\.BASE_URL/g, '"/"')
    .replace(/import\.meta\.env\.[A-Z0-9_]+/g, '""')
  const tmp = join(mkdtempSync(join(tmpdir(), 'seo-')), 'mod.mjs')
  writeFileSync(tmp, src)
  return import(pathToFileURL(tmp).href)
}

function isUpcoming(show) {
  if (!show.time) return new Date(show.date) >= new Date()
  return new Date(`${show.date}T${show.time}:00`) >= new Date()
}

function cleanUrl(url) {
  try {
    const parsed = new URL(url)
    parsed.searchParams.delete('si')
    return parsed.toString()
  } catch {
    return url
  }
}

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

const EVENT_PAGE_URL = `${SITE_URL}/#shows`

// Ticket links win. A relative path is resolved against the site origin so the
// published value is always an absolute URL. Shows with no ticket link use the
// event's own page.
function offerUrl(show) {
  if (typeof show.ticketsUrl !== 'string') return EVENT_PAGE_URL
  const url = show.ticketsUrl.trim()
  if (!url) return EVENT_PAGE_URL
  if (/^https?:\/\//i.test(url)) return url
  if (url.startsWith('/')) return `${SITE_URL}${url}`
  return `${SITE_URL}/${url}`
}

// Offers are included only when the show record has a real price or ticket URL.
// `free: true` is an explicit price of 0 EUR. Shows with neither are omitted.
// Every offer has an absolute url, availability, and validFrom. There is no
// separate on-sale date, so validFrom is the event start rather than an
// invented sale time.
function eventOffers(show, startDate) {
  const ticketsUrl = typeof show.ticketsUrl === 'string' && show.ticketsUrl.trim()
  if (show.free !== true && !ticketsUrl) return null

  const offer = {
    '@type': 'Offer',
    url: offerUrl(show),
    availability: 'https://schema.org/InStock',
    validFrom: startDate,
  }
  if (show.free === true) {
    offer.price = '0'
    offer.priceCurrency = 'EUR'
  }
  return offer
}

// Build-time JSON-LD (schema.org MusicEvent) generated from src/data/shows.js,
// so every show added to the data file is automatically marked up.
function showsJsonLd() {
  return {
    name: 'shows-jsonld',
    async transformIndexHtml(html) {
      const { shows } = await loadDataModule('./src/data/shows.js')

      const bandRef = { '@id': `${SITE_URL}/#band` }
      const events = shows
        .filter((s) => !/priv[eé]/i.test(s.title) && isUpcoming(s))
        .sort((a, b) => a.date.localeCompare(b.date))
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
            performer: bandRef,
            organizer: bandRef,
            url: `${SITE_URL}/#shows`,
          }
          if (s.free) event.isAccessibleForFree = true
          const offers = eventOffers(s, startDate)
          if (offers) event.offers = offers
          return event
        })

      if (events.length === 0) return html

      const json = JSON.stringify({ '@context': 'https://schema.org', '@graph': events }, null, 2)
        .replace(/</g, '\\u003c')
      return html.replace(
        '</head>',
        `    <script type="application/ld+json" id="shows-jsonld">\n${json}\n    </script>\n  </head>`
      )
    },
  }
}

function bandJsonLd() {
  return {
    name: 'band-jsonld',
    async transformIndexHtml(html) {
      const [{ BRAND, SOCIAL_URLS, ARTIST_LINKS }, { members }, { releases }] = await Promise.all([
        loadDataModule('./src/data/constants.js'),
        loadDataModule('./src/data/members.js'),
        loadDataModule('./src/data/releases.js'),
      ])

      const bandId = `${SITE_URL}/#band`
      const graph = {
        '@context': 'https://schema.org',
        '@type': 'MusicGroup',
        '@id': bandId,
        name: 'Chromattic',
        description: BRAND.description,
        url: `${SITE_URL}/`,
        foundingDate: BRAND.foundingDate,
        foundingLocation: { '@type': 'Place', name: BRAND.foundingLocation },
        genre: BRAND.genres,
        email: BRAND.email,
        logo: `${SITE_URL}/images/logo.jpg`,
        image: `${SITE_URL}/images/og-image.jpg`,
        sameAs: [...SOCIAL_URLS, ARTIST_LINKS.deezer, ARTIST_LINKS.amazonMusic],
        member: members.map((member) => ({
          '@type': 'Person',
          name: member.name,
          roleName: member.roles.nl,
        })),
        album: releases.map((release) => {
          const links = (release.links || []).map((link) => ({ ...link, url: cleanUrl(link.url) }))
          const spotify = links.find((link) => link.platform === 'Spotify')
          const album = {
            '@type': 'MusicAlbum',
            name: release.title,
            datePublished: release.releaseDate,
            albumReleaseType: release.type === 'EP'
              ? 'https://schema.org/EPRelease'
              : 'https://schema.org/SingleRelease',
            byArtist: { '@id': bandId },
          }
          if (release.description?.nl) album.description = release.description.nl
          if (spotify) album.url = spotify.url
          const sameAs = links
            .map((link) => link.url)
            .filter((url) => url && url !== album.url)
          if (sameAs.length) album.sameAs = sameAs
          if (release.tracks?.length) {
            album.track = release.tracks.map((name) => ({ '@type': 'MusicRecording', name }))
          }
          return album
        }),
      }

      const json = JSON.stringify(graph, null, 2).replace(/</g, '\\u003c')
      const script = `<script type="application/ld+json" id="band-jsonld">\n${json}\n    </script>`
      if (html.includes('id="band-jsonld"')) {
        return html.replace(/<script type="application\/ld\+json" id="band-jsonld">[\s\S]*?<\/script>/, script)
      }
      return html.replace('</head>', `    ${script}\n  </head>`)
    },
  }
}

// https://vite.dev/config/
// Base path is configurable via VITE_BASE_URL environment variable
// Defaults to '/' for Vercel deployment
// GitHub Pages workflow sets VITE_BASE_URL=/Chrommatic/
export default defineConfig({
  plugins: [react(), bandJsonLd(), showsJsonLd()],
  base: process.env.VITE_BASE_URL || '/',
  build: {
    target: 'es2022',
  },
})
