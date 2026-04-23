# Optimized Deployment Guide

This project is configured with `output: 'standalone'` to minimize RAM usage and deployment size.

## 1. Build the Project
Run the standard build command:
```bash
npm run build
```
This will create a `.next/standalone` folder containing a minimal Node.js server and only the necessary dependencies.

## 2. Prepare the Standalone Directory
The standalone build does **not** automatically include the `public` or `.next/static` folders. You must copy them manually if running outside of a Docker container that handles this.

### Windows (PowerShell)
```powershell
cp -r public .next/standalone/public
cp -r .next/static .next/standalone/.next/static
```

### Linux / Mac
```bash
cp -r public .next/standalone/public
cp -r .next/static .next/standalone/.next/static
```

## 3. Start the Server
Navigate to the standalone directory and start the server:
```bash
node .next/standalone/server.js
```
*Note: Do not use `npm start` for the standalone build. `npm start` runs the standard Next.js production server, which consumes more RAM.*

## 4. Docker Deployment
If deploying with Docker, ensure your `Dockerfile` copies the standalone folder and the static assets:

```dockerfile
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

CMD ["node", "server.js"]
```
