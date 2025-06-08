import express from 'express';
import uploadRoutes from './routes/upload.routes';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

app.use('/api', uploadRoutes);

const PORT = 3333;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
