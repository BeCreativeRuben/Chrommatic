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

      const performer = { '@type': 'MusicGroup', name: 'Chromattic', url: SITE_URL }
      const events = shows
        .filter((s) => !/priv[eé]/i.test(s.title)) // private parties are not public events
        .sort((a, b) => b.date.localeCompare(a.date))
        .map((s) => {
          const postal = s.location.match(/^(\d{4})\s+(.*)$/)
          const locality = postal ? postal[2] : s.location
          const event = {
            '@type': 'MusicEvent',
            name: `Chromattic @ ${s.title}`,
            startDate: s.time ? `${s.date}T${s.time}:00${brusselsOffset(s.date, s.time)}` : s.date,
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
            performer,
            url: `${SITE_URL}/#shows`,
          }
          if (s.free) event.isAccessibleForFree = true
          if (s.ticketsUrl) event.offers = { '@type': 'Offer', url: s.ticketsUrl }
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
