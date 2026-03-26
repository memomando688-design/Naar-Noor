# Deployment Guide for Naar & Noor

## Vercel Deployment

Your app is configured to deploy to: **https://naar222noor.vercel.app/**

### Quick Deploy Steps:

1. **Connect to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Click "Add New Project"
   - Import your repository: `Mostafa-SAID7/Naar-Noor`

2. **Configure Build Settings:**
   - Framework Preset: **Angular**
   - Build Command: `npm run build:prod`
   - Output Directory: `dist/lost-yeti`
   - Install Command: `npm install`

3. **Environment Variables:**
   No environment variables needed for this project.

4. **Deploy:**
   - Click "Deploy"
   - Wait for build to complete (2-3 minutes)
   - Your site will be live at `https://naar222noor.vercel.app`

### Auto-Deploy:
Every push to the `main` branch will automatically trigger a new deployment.

### Features Included:
- ✅ PWA Support (Progressive Web App)
- ✅ SEO Optimized for Egyptian market
- ✅ Responsive design
- ✅ Performance optimized
- ✅ Image-based map with location marker
- ✅ Manifest.json for installable app
- ✅ Sitemap.xml configured
- ✅ Robots.txt configured

### Build Locally:
```bash
npm install
npm run build:prod
```

### Test Locally:
```bash
npm start
```
Then open: http://localhost:4200

### PWA Testing:
After deployment, test PWA features:
1. Open site in Chrome/Edge
2. Click install icon in address bar
3. App can be installed on mobile/desktop

### Performance:
- Lighthouse Score Target: 90+
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3.5s

### SEO Keywords Optimized:
- مطعم في مصر (Restaurant in Egypt)
- مطعم هيمالايا (Himalayan Restaurant)
- افضل مطعم في مصر (Best restaurant in Egypt)
- مطاعم القاهرة (Cairo restaurants)
- Himalayan restaurant Egypt
- Best restaurant Egypt
- Fine dining Egypt

### Support:
For deployment issues, check:
- Vercel Dashboard: https://vercel.com/dashboard
- Build logs in Vercel
- GitHub Actions (if configured)
