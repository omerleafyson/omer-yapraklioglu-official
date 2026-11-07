# Ömer Yapraklıoğlu — Official Website

Personal website for Ömer Yapraklıoğlu, featuring AURA Technology, AURA Snap and Sahne Plus.

Deployment target: Cloudflare Workers Static Assets.

Cloudflare Workers Builds settings:
- Root directory: `/`
- Build command: leave empty
- Deploy command: `npx wrangler deploy`
- Production branch: `main`

Do not use Sahne Plus monorepo build commands for this standalone site.

The site is designed to be served from `public/` using `wrangler.toml`.

Music playback is subject to browser autoplay restrictions; use the site's audio control to start playback.