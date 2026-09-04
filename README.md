This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:4001](http://localhost:4001) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Production with PM2

```bash
npm install -g pm2
npm run build
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

| Command | Description |
| - | - |
| `pm2 status` | Check running processes |
| `pm2 logs waktu_sholat` | View logs |
| `pm2 restart waktu_sholat` | Restart app |
| `pm2 stop waktu_sholat` | Stop app |

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


tolong pelajari codebase ini 
1. /home/asrock/projects/workspace_jadwal_masjid/jadwal_masjid_landing
2. /home/asrock/projects/workspace_jadwal_masjid/jadwal_masjid_web_app,

saat ini sudah production :
1. /home/asrock/projects/workspace_jadwal_masjid/jadwal_masjid_landing , domain : https://jadwalmasjid.com/
2. /home/asrock/projects/workspace_jadwal_masjid/jadwal_masjid_web_app , domain : https://app.jadwalmasjid.com/


saya ingin menambahkan link ini https://app.jadwalmasjid.com/ di web landing tapi saya bingung dimana posisi yang bagus. coba kamu cek design dengan playwright dan analisa dimana letak yang bagus. dan kata2nya apa register atau login atau apa 
