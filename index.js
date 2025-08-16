import path from 'path';
import http from 'http';
import url from 'url';
import fs from 'fs/promises';

const PORT = process.env.PORT;
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = http.createServer(async (req, res) => {
  try {
    if (req.method === 'GET') {
      let filepath;
      if (req.url === '/') {
        filepath = path.join(__dirname, 'public', 'index.html');
      } else if (req.url === '/contact') {
        filepath = path.join(__dirname, 'public', 'contact-me.html');
      } else if (req.url === '/about') {
        filepath = path.join(__dirname, 'public', 'about.html');
      } else {
        filepath = path.join(__dirname, 'public', '404.html');
      }
      const data = await fs.readFile(filepath);
      res.setHeader('Content-Type', 'text/html');
      res.end(data);
    } else {
      throw new Error('Unauthorized method!');
    }
  } catch (err) {
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Server error');
  }
});

server.listen(PORT, () => {
  console.log(`Started server on port: ${PORT}`);
});
