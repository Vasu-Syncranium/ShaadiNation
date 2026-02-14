# ShaadinationAV - Wedding Website

A beautiful, production-ready wedding website built with Next.js, hosted on Cloudflare Pages with R2 image storage.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm
- Cloudflare account (free tier works!)

### Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the site.

### Build for Production

```bash
npm run build
```

Output will be in the `out/` directory, ready for Cloudflare Pages.

## 📁 Project Structure

```
shaadinationAV/
├── src/
│   ├── app/                # App Router pages
│   │   ├── page.tsx        # Home
│   │   ├── about/          # Our Story
│   │   ├── events/         # Events Schedule
│   │   ├── gallery/        # Photo Gallery
│   │   ├── contact/        # Contact & FAQ
│   │   └── admin/          # Admin Panel
│   ├── components/         # React components
│   ├── lib/                # Utilities (API, auth)
│   └── styles/             # Global CSS
├── workers/
│   └── gallery-api/        # Cloudflare Worker for R2
├── middleware.ts           # Domain-based routing
└── next.config.js          # Static export config
```

## 🌐 Domain Routing

The middleware enforces domain-based access:

| Domain | Allowed Routes |
|--------|---------------|
| `domain.com` | `/`, `/about`, `/events`, `/gallery`, `/contact` |
| `admin.domain.com` | `/admin` only |

## 🔧 Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for complete setup instructions.

### Quick Deploy

1. Push to GitHub
2. Connect to Cloudflare Pages
3. Build command: `npm run build`
4. Output directory: `out`

## 📸 Gallery Features

- **Runtime fetch**: Images update immediately after upload
- **Category filtering**: Ceremony, Reception, Mehendi, Sangeet, Pre-wedding
- **Lightbox**: Full-size image viewing
- **Demo mode**: Works without backend during development

## 🔐 Admin Panel

Access via `admin.domain.com`:
- Token-based authentication
- Drag & drop image upload
- Category management
- Image preview and delete

## 💰 Cost

All within Cloudflare free tier for 5-10k monthly visitors:
- Pages: Unlimited sites
- Workers: 100k requests/day
- R2: 10GB storage, 10M reads/month

## 📝 License

Private project for wedding website.
