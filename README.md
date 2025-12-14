# 🎸 Chrommatic - Official Band Website

> **The Official Website of Chrommatic** | Alternative Rock from Waasland 🎵  
> [View Live Site](https://chrommatic.be) • [See Project Files](https://github.com/BeCreativeRuben/Chrommatic)

---

## 🎯 About Chrommatic

Chrommatic is an alternative rock band hailing from the Waasland region, crafting powerful, emotive music that resonates with audiences. This is the official website showcasing our releases, live shows, media, and connecting with fans worldwide.

Built with modern web technologies, this site delivers a seamless experience across all devices while showcasing our music and tour dates.

---

## ✨ Key Features

| Feature | Description | Impact |
|---------|-------------|--------|
| **🎵 Release Hub** | Showcase albums and singles with artwork, streaming links | Centralized music distribution point |
| **📅 Tour Calendar** | Dynamic shows listing with venue, date, and ticket info | Never miss a performance |
| **📸 Media Gallery** | High-quality images from shows and studio sessions | Visual storytelling |
| **🔗 Social Integration** | Direct links to all streaming and social platforms | One-click fan engagement |
| **📱 Mobile Responsive** | Perfect display on phones, tablets, and desktops | Reach fans everywhere |
| **♿ Accessible** | ARIA labels, semantic HTML, keyboard navigation | Inclusive experience for all |
| **⚡ Fast Loading** | Optimized images, lazy loading, Vite-powered builds | Instant fan access |
| **🔍 SEO Optimized** | Meta tags, Open Graph, structured data | Better search visibility |

---

## 🛠️ Tech Stack

```
┌─────────────────────────────────────┐
│      Frontend Technologies          │
├─────────────────────────────────────┤
│ React 19        → UI Components     │
│ Vite            → Build & Dev       │
│ Tailwind CSS    → Styling           │
│ Lucide React    → Icons             │
│ JavaScript ES6+ → Core Logic        │
└─────────────────────────────────────┘
```

**Why This Stack?**
- ⚡ **Vite** provides lightning-fast development and optimized builds
- ⚛️ **React 19** enables interactive, component-driven architecture
- 🎨 **Tailwind** delivers consistent, customizable styling
- 📦 **Modular design** makes updates and maintenance simple

---

## 📂 Project Architecture

```
chrommatic-website/
├── 📁 public/
│   └── images/
│       ├── logo.jpg                 # Band logo
│       ├── covers/                  # Album artwork
│       │   ├── sunrise-cover.jpg
│       │   └── silent-dejection-cover.jpg
│       └── shows/                   # Event photos
│           ├── droomballon.jpg
│           ├── pop-is-dead.jpg
│           └── damberd.jpg
│
├── 📁 src/
│   ├── 📁 components/
│   │   ├── 📁 layout/              # Persistent layout components
│   │   │   ├── Navbar.jsx          # Navigation bar
│   │   │   ├── Footer.jsx          # Footer with links
│   │   │   └── Section.jsx         # Reusable section wrapper
│   │   │
│   │   ├── 📁 sections/            # Full-page section components
│   │   │   ├── Hero.jsx            # Landing hero section
│   │   │   ├── Releases.jsx        # Albums & singles showcase
│   │   │   ├── Shows.jsx           # Tour dates calendar
│   │   │   ├── Media.jsx           # Photo/video gallery
│   │   │   ├── Bio.jsx             # Band biography
│   │   │   └── Contact.jsx         # Contact & social
│   │   │
│   │   └── 📁 ui/                  # Reusable UI components
│   │       ├── ReleaseCard.jsx     # Album/single card
│   │       ├── ShowCard.jsx        # Event card
│   │       └── SocialLink.jsx      # Social media button
│   │
│   ├── 📁 data/                    # Centralized data files
│   │   ├── constants.js            # Band info, colors, config
│   │   ├── releases.js             # Album & single metadata
│   │   ├── shows.js                # Tour dates & venues
│   │   └── socialLinks.js          # Social media platforms
│   │
│   ├── 📁 hooks/                   # Custom React hooks
│   │   └── useSmoothScroll.js      # Smooth page scrolling
│   │
│   ├── 📁 utils/                   # Utility functions
│   │   ├── dateFormatter.js        # Format & parse dates
│   │   └── imagePaths.js           # Centralized image paths
│   │
│   ├── 📁 styles/                  # Global & component styles
│   │   ├── globals.css             # App-wide styling
│   │   └── App.css                 # Component-specific styles
│   │
│   ├── App.jsx                     # Root component
│   └── main.jsx                    # Application entry point
│
├── index.html                      # HTML template + SEO
├── package.json                    # Dependencies & scripts
├── tailwind.config.js              # Tailwind customization
└── vite.config.js                  # Vite build configuration
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** 16.0 or higher
- **npm** or **yarn** package manager

### Installation (3 steps)

```bash
# 1️⃣ Clone and navigate to project
git clone https://github.com/BeCreativeRuben/Chrommatic.git
cd Chrommatic

# 2️⃣ Install dependencies
npm install

# 3️⃣ Start development server
npm run dev
```

✅ **Website ready!** Open `http://localhost:5173` in your browser.

---

## 📝 Available Scripts

```bash
# Start development server with hot-reload
npm run dev

# Build optimized production version
npm run build

# Preview production build locally
npm run preview

# Format code with Prettier (if configured)
npm run format
```

---

## 🎨 Customization Guide

### Adding a New Release

Edit `src/data/releases.js`:

```javascript
export const releases = [
  {
    id: 'new-release',
    title: 'New Album Title',
    artist: 'Chrommatic',
    coverImage: '/images/covers/new-cover.jpg',
    releaseDate: '2025-01-15',
    spotifyUrl: 'https://open.spotify.com/album/...',
    appleMusicUrl: 'https://music.apple.com/...',
    youtubeUrl: 'https://youtube.com/...',
    description: 'Album description here'
  }
  // ... other releases
];
```

### Adding Tour Dates

Edit `src/data/shows.js`:

```javascript
export const shows = [
  {
    id: 'show-1',
    date: '2025-02-14',
    venue: 'Venue Name',
    city: 'City, Country',
    time: '20:00',
    ticketUrl: 'https://ticketing-link.com',
    description: 'Special guest info or event details'
  }
  // ... other shows
];
```

### Updating Band Info

Edit `src/data/constants.js`:

```javascript
export const BAND_INFO = {
  name: 'Chrommatic',
  email: 'contact@chrommatic.be',
  bio: 'Band biography and description',
  socialLinks: {
    spotify: 'https://open.spotify.com/artist/...',
    instagram: 'https://instagram.com/...',
    // ... more links
  }
};
```

### Brand Colors

Customize in `tailwind.config.js`:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        'chrommatic-primary': '#your-color',
        'chrommatic-secondary': '#your-color',
      },
    },
  },
};
```

---

## 📊 Data Structure Overview

### Releases Data
Each release includes:
- Unique ID for routing
- Title and artist name
- Cover artwork path
- Release date (ISO format)
- Streaming service URLs
- Optional description

### Shows Data
Each show contains:
- Date and time information
- Venue name and location
- Ticket purchase link
- Optional description or special notes

### Social Links
Configured in centralized location:
- Spotify, Apple Music, YouTube
- Instagram, Facebook, TikTok
- Email and booking contacts

---

## ♿ Accessibility Features

- **ARIA Labels** - Screen reader support throughout
- **Semantic HTML** - Proper heading hierarchy and structure
- **Keyboard Navigation** - Full keyboard access to all features
- **Color Contrast** - WCAG AA compliant contrast ratios
- **Responsive Text** - Readable on all screen sizes
- **Focus Indicators** - Clear focus states for interactive elements

---

## ⚡ Performance Optimizations

| Optimization | Benefit |
|--------------|---------|
| **Image Lazy Loading** | Only load images when visible |
| **Vite Bundling** | Lightning-fast production builds |
| **Component Code Splitting** | Load only what's needed |
| **CSS Purging** | Remove unused styles |
| **Asset Optimization** | Compressed images & minified code |

**Result:** Sub-second page loads and smooth scrolling experience.

---

## 🔍 SEO Implementation

✅ **Meta Tags** - Page title, description, keywords  
✅ **Open Graph** - Rich sharing on social media  
✅ **Structured Data** - Schema.org markup for search engines  
✅ **Mobile Meta** - Viewport and touch icon tags  
✅ **Sitemap Ready** - Easy to add XML sitemap  
✅ **Social Links** - Clear artist/music entity definition  

---

## 📱 Browser Support

| Browser | Minimum Version |
|---------|-----------------|
| Chrome | 90+ |
| Firefox | 88+ |
| Safari | 14+ |
| Edge | 90+ |
| Mobile browsers | Last 2 versions |

---

## 🐛 Troubleshooting

### Development server won't start
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Images not loading
- Check image paths in `src/utils/imagePaths.js`
- Verify image files exist in `public/images/`
- Use the centralized path utility for consistency

### Build fails
```bash
# Clear Vite cache
rm -rf .vite
npm run build
```

### Styling issues
- Ensure Tailwind config is properly loaded
- Check `tailwind.config.js` for custom class definitions
- Verify CSS files are imported in `main.jsx`

---

## 🎯 Future Enhancements

- 🎥 **Video Player** - Embed band videos and performances
- 🎧 **Music Player** - In-site audio playback
- 📧 **Newsletter** - Fan mailing list integration
- 💬 **Comments** - Fan interaction on releases
- 🎫 **Ticket Integration** - Direct ticketing system
- 🌍 **Internationalization** - Multi-language support
- 📊 **Analytics** - Track fan engagement
- 🛒 **Merchandise** - Official band store

---

## 📄 License

All rights reserved © Chrommatic. No reproduction without permission.

For licensing inquiries, contact: contact@chrommatic.be

---

## 👨‍💻 Development

**Built with ❤️ by BeCreativeRuben**

Questions or suggestions? [Open an issue](https://github.com/BeCreativeRuben/Chrommatic/issues) or reach out to the band!

---

## ⭐ Show Support

If you enjoy Chrommatic's music, please:
- Stream on [Spotify](https://open.spotify.com/artist/...) 
- Follow on [Instagram](https://instagram.com/...)
- Attend a live show
- Share with friends

**Together, we create the soundtrack to unforgettable moments.** 🎵🎸

---

*Last updated: December 2025*  
*Made with Vite + React + Tailwind CSS*
