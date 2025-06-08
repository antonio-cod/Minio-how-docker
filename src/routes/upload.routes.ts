import { Router } from 'express';
import multer from 'multer';
import { Readable } from 'stream';
import { minioClient } from '../minoClient';

const router = Router();
const upload = multer();

router.post('/upload', upload.single('file'), async (req, res) => {
  const file = req.file;
  if (!file) {
    res.status(400).json({ message: 'Arquivo não encontrado' });
    return;
  }

  const bucket = process.env.MINIO_BUCKET!;
  const fileName = `${Date.now()}-${file.originalname}`;

  const exists = await minioClient.bucketExists(bucket).catch(() => false);
  if (!exists) await minioClient.makeBucket(bucket, 'us-east-1');

  const stream = Readable.from(file.buffer);
  await minioClient.putObject(bucket, fileName, stream);

  res.status(200).json({ message: 'Upload feito com sucesso', fileName });
});

export default router;
