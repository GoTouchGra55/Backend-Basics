import path from 'path';
import url from 'url';
import express from 'express';

const PORT = process.env.PORT;
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
})

app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'contact-me.html'));
})

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'about.html'));
})

app.use((req, res) => {
  res.status(404);
  res.sendFile(path.join(__dirname, 'public', '404.html'));
})

app.listen(PORT, (error) => {
  if (error) {
    throw new Error(error);
  }
  console.log(`Server started on port: ${PORT}`);
})