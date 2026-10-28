import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json());

  // API Endpoint: Búsqueda en vivo de YouTube sin necesidad de claves API
  app.get('/api/youtube/search', async (req, res) => {
    try {
      const query = String(req.query.q || '').trim();
      if (!query) {
        return res.json({ success: true, results: [] });
      }

      const searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
      const response = await fetch(searchUrl, {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept-Language': 'es-ES,es;q=0.9,en;q=0.8'
        }
      });

      if (!response.ok) {
        throw new Error(`YouTube respondió con status ${response.status}`);
      }

      const html = await response.text();
      const match =
        html.match(/var ytInitialData = ({.*?});<\/script>/s) ||
        html.match(/ytInitialData\s*=\s*({.*?});/s);

      if (!match) {
        return res.json({ success: true, results: [] });
      }

      const parsedData = JSON.parse(match[1]);
      const contents =
        parsedData?.contents?.twoColumnSearchResultsRenderer?.primaryContents
          ?.sectionListRenderer?.contents || [];

      const results: Array<{
        id: string;
        videoId: string;
        title: string;
        channelTitle: string;
        duration: string;
        thumbnailUrl: string;
        views?: string;
      }> = [];

      for (const section of contents) {
        const itemSection = section?.itemSectionRenderer?.contents || [];
        for (const item of itemSection) {
          const v = item?.videoRenderer;
          if (v && v.videoId) {
            const title =
              v.title?.runs?.[0]?.text ||
              v.title?.accessibility?.accessibilityData?.label ||
              'Video sin título';
            const channelTitle =
              v.ownerText?.runs?.[0]?.text ||
              v.shortBylineText?.runs?.[0]?.text ||
              'YouTube';
            const duration = v.lengthText?.simpleText || '0:00';
            const thumbnails = v.thumbnail?.thumbnails || [];
            const thumbnailUrl =
              thumbnails[thumbnails.length - 1]?.url ||
              `https://img.youtube.com/vi/${v.videoId}/hqdefault.jpg`;
            const views = v.shortViewCountText?.simpleText || v.viewCountText?.simpleText || '';

            results.push({
              id: 'yt_' + v.videoId,
              videoId: v.videoId,
              title,
              channelTitle,
              duration,
              thumbnailUrl,
              views
            });

            if (results.length >= 25) break;
          }
        }
        if (results.length >= 25) break;
      }

      return res.json({
        success: true,
        query,
        results
      });
    } catch (err: unknown) {
      console.error('Error buscando en YouTube:', err);
      return res.status(500).json({
        success: false,
        error: err instanceof Error ? err.message : 'Error desconocido al buscar en YouTube',
        results: []
      });
    }
  });

  // Servir archivos estáticos de /public (PWA manifest, service worker, iconos)
  app.use(express.static(path.join(__dirname, 'public')));

  // Modo desarrollo con Vite middlewares o producción
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true, host: '0.0.0.0', port: PORT },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`JAaron Music Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Error starting server:', err);
});
