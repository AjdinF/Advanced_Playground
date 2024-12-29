import express from 'express';
import cors from 'cors';
import bearRoutes from './routes/bears';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to the Bear Data API!');
});

app.use('/api', bearRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
