# DashExecs Landing Page

A beautiful, modern landing page for the DashExecs AI Governance Dashboard platform.

## Technologies

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The application will be available at `http://localhost:8000`

### Build

```bash
npm run build
```

The built files will be in the `dist/` directory.

### Preview

```bash
npm run preview
```

## Deployment to Netlify

### Option 1: Deploy via Netlify CLI

1. Install Netlify CLI:
```bash
npm install -g netlify-cli
```

2. Login to Netlify:
```bash
netlify login
```

3. Deploy:
```bash
netlify deploy --prod
```

### Option 2: Deploy via GitHub

1. Push your code to GitHub
2. Go to [Netlify](https://www.netlify.com/)
3. Click "Add new site" > "Import an existing project"
4. Connect your GitHub repository
5. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Click "Deploy site"

### Option 3: Drag and Drop

1. Build the project:
```bash
npm run build
```

2. Go to [Netlify Drop](https://app.netlify.com/drop)
3. Drag and drop the `dist` folder

## Configuration

The `netlify.toml` file is configured to:
- Build command: `npm run build`
- Publish directory: `dist`
- Handle SPA routing with redirects

## Project Structure

```
web/
├── src/
│   ├── components/     # React components
│   ├── pages/          # Page components
│   ├── lib/            # Utility functions
│   └── styles/         # Global styles
├── public/             # Static assets
└── dist/              # Build output (generated)
```
