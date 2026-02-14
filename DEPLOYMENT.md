# Deployment Guide

Complete step-by-step instructions for deploying ShaadinationAV to Cloudflare.

## Prerequisites

1. **Cloudflare Account** - [Sign up free](https://dash.cloudflare.com/sign-up)
2. **GitHub Account** - For connecting to Cloudflare Pages
3. **Domain** - Managed through Cloudflare DNS (optional but recommended)

---

## Step 1: Create R2 Bucket

1. Log in to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Go to **R2 Object Storage** in the sidebar
3. Click **Create bucket**
4. Name: `shaadination-gallery`
5. Location: **Automatic** (uses nearest region)
6. Click **Create bucket**

### Create Initial Folders

In the bucket, create these folders:
- `gallery/ceremony/`
- `gallery/reception/`
- `gallery/mehendi/`
- `gallery/sangeet/`
- `gallery/pre-wedding/`

---

## Step 2: Deploy Cloudflare Worker

### Install Wrangler

```bash
npm install -g wrangler
wrangler login
```

### Deploy Worker

```bash
cd workers/gallery-api
npm install
wrangler deploy
```

### Set Admin Token

```bash
# Generate a secure token
openssl rand -hex 32

# Set it as a secret
wrangler secret put ADMIN_TOKEN
# Paste your generated token when prompted
```

### Note Worker URL

After deployment, you'll see something like:
```
Published gallery-api (1.0.0)
  https://gallery-api.YOUR-SUBDOMAIN.workers.dev
```

Save this URL for the next step.

---

## Step 3: Deploy to Cloudflare Pages

### Option A: GitHub Integration (Recommended)

1. Push your code to GitHub
2. Go to Cloudflare Dashboard → **Workers & Pages** → **Create**
3. Select **Pages** → **Connect to Git**
4. Choose your repository
5. Configure build:
   - **Build command**: `npm run build`
   - **Output directory**: `out`
   - **Root directory**: `/` (leave default)
6. Add environment variable:
   - `NEXT_PUBLIC_WORKER_URL` = `https://gallery-api.YOUR-SUBDOMAIN.workers.dev`
7. Click **Save and Deploy**

### Option B: Direct Upload

```bash
npm run build
npx wrangler pages deploy out
```

---

## Step 4: Configure Custom Domains

### Main Domain (domain.com)

1. Go to Pages project → **Custom domains**
2. Click **Set up a custom domain**
3. Enter: `yourdomain.com`
4. Follow DNS verification steps

### Admin Subdomain (admin.domain.com)

1. Same Pages project → **Custom domains**
2. Click **Set up a custom domain**
3. Enter: `admin.yourdomain.com`
4. Follow DNS verification steps

> **Note**: Both domains point to the same Pages deployment. The middleware handles routing.

---

## Step 5: Update Worker CORS

Edit `workers/gallery-api/wrangler.toml`:

```toml
[vars]
ALLOWED_ORIGINS = "https://yourdomain.com,https://admin.yourdomain.com"
```

Redeploy:

```bash
cd workers/gallery-api
wrangler deploy
```

---

## Step 6: Test Everything

### Public Site
1. Visit `https://yourdomain.com`
2. Navigate to Gallery
3. Verify images load (demo images in dev, R2 images in prod)

### Admin Panel
1. Visit `https://admin.yourdomain.com`
2. Log in with your admin token
3. Upload a test image
4. Verify it appears in the public gallery

### Domain Routing
1. `yourdomain.com/admin` → Should redirect to `/`
2. `admin.yourdomain.com/gallery` → Should redirect to `/admin`

---

## Troubleshooting

### Images not loading
- Check Worker is deployed and running
- Verify `NEXT_PUBLIC_WORKER_URL` in Pages env vars
- Check CORS settings in Worker

### Admin login fails
- Verify `ADMIN_TOKEN` secret is set in Worker
- Token must match exactly what you use to log in

### Domain routing not working
- Middleware only works after deployment
- Verify both domains are connected to same Pages project

---

## Environment Variables Reference

### Cloudflare Pages
| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_WORKER_URL` | Your Worker API URL |

### Cloudflare Worker (Secrets)
| Secret | Description |
|--------|-------------|
| `ADMIN_TOKEN` | Admin authentication token |

---

## Cost Breakdown

| Service | Free Tier | Your Usage | Monthly Cost |
|---------|-----------|------------|--------------|
| Pages | Unlimited | 1 project | $0 |
| Workers | 100k req/day | ~1k req/day | $0 |
| R2 Storage | 10GB | 2-5GB | $0 |
| R2 Class A (writes) | 1M/month | ~1k/month | $0 |
| R2 Class B (reads) | 10M/month | ~50k/month | $0 |

**Total: $0/month** within free tier for 5-10k visitors.

---

## Updating the Site

### Content Changes
1. Edit code locally
2. Push to GitHub
3. Cloudflare Pages auto-deploys

### Adding Photos
1. Log in to admin panel
2. Select category
3. Drag & drop images
4. Photos appear immediately in gallery

---

## Security Notes

- **R2 credentials** are never exposed to the browser
- **Admin token** is stored as a Cloudflare secret
- All image operations go through the Worker API
- CORS restricts API access to your domains only
