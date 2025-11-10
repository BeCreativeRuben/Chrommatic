# Chromattic Website

Website voor Chromattic, een alternatieve rockband uit het Waasland.

## Project Structuur

```
chromattic-website/
├── public/
│   └── images/
│       ├── logo.jpg
│       ├── covers/
│       │   ├── sunrise-cover.jpg
│       │   └── silent-dejection-cover.jpg
│       └── shows/
│           ├── droomballon.jpg
│           ├── pop-is-dead.jpg
│           └── damberd.jpg
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.jsx      # Navigatiebalk
│   │   │   ├── Footer.jsx       # Footer component
│   │   │   └── Section.jsx      # Herbruikbare section wrapper
│   │   ├── sections/
│   │   │   ├── Hero.jsx         # Hero sectie
│   │   │   ├── Releases.jsx    # Releases sectie
│   │   │   ├── Shows.jsx       # Shows sectie
│   │   │   ├── Media.jsx       # Media sectie
│   │   │   ├── Bio.jsx         # Bio sectie
│   │   │   └── Contact.jsx     # Contact sectie
│   │   └── ui/
│   │       ├── ReleaseCard.jsx  # Release card component
│   │       ├── ShowCard.jsx    # Show card component
│   │       └── SocialLink.jsx  # Social media link component
│   ├── data/
│   │   ├── constants.js        # Brand constants en configuratie
│   │   ├── releases.js         # Releases data
│   │   ├── shows.js            # Shows data
│   │   └── socialLinks.js      # Social media links
│   ├── hooks/
│   │   └── useSmoothScroll.js  # Smooth scrolling hook
│   ├── utils/
│   │   ├── dateFormatter.js    # Datum formatting utilities
│   │   └── imagePaths.js       # Gecentraliseerde image paths
│   ├── styles/
│   │   ├── globals.css         # Globale styles
│   │   └── App.css             # App-specifieke styles
│   ├── App.jsx                 # Hoofdcomponent
│   └── main.jsx                # Entry point
├── index.html                  # HTML template met SEO
├── package.json
├── tailwind.config.js          # Tailwind CSS configuratie
└── vite.config.js              # Vite configuratie
```

## Technologieën

- **React 19** - UI library
- **Vite** - Build tool en dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon library

## Installatie

```bash
npm install
```

## Development

Start de development server:

```bash
npm run dev
```

De website zal beschikbaar zijn op `http://localhost:5173`

## Build

Bouw de productie versie:

```bash
npm run build
```

Preview de productie build:

```bash
npm run preview
```

## Code Structuur

### Data Files

Alle data is gescheiden van de presentatie componenten:

- `src/data/constants.js` - Brand constants (naam, email, kleuren)
- `src/data/releases.js` - Alle releases met metadata
- `src/data/shows.js` - Alle shows met data en locatie
- `src/data/socialLinks.js` - Social media links met icons

### Componenten

- **Layout componenten** (`components/layout/`) - Herbruikbare layout componenten
- **Section componenten** (`components/sections/`) - Hoofd secties van de website
- **UI componenten** (`components/ui/`) - Kleine herbruikbare UI componenten

### Utilities

- `utils/dateFormatter.js` - Functies voor datum formatting
- `utils/imagePaths.js` - Gecentraliseerde image paths
- `hooks/useSmoothScroll.js` - Custom hook voor smooth scrolling

## Features

- ✅ Responsive design
- ✅ SEO geoptimaliseerd (meta tags, Open Graph, structured data)
- ✅ Accessibility verbeteringen (ARIA labels, semantic HTML)
- ✅ Lazy loading voor images
- ✅ Smooth scrolling
- ✅ Moderne, schone code structuur

## Licentie

Alle rechten voorbehouden aan Chromattic.
