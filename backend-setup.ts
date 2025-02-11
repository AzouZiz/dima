// server/index.ts
import express from 'express';
import { Server } from 'socket.io';
import cors from 'cors';
import { DeepSpeech } from 'deepspeech';
import path from 'path';
import * as dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Initialize DeepSpeech model
const modelPath = path.join(__dirname, '../models/deepspeech-0.9.3-models.pbmm');
const scorerPath = path.join(__dirname, '../models/deepspeech-0.9.3-models.scorer');

const model = new DeepSpeech(modelPath);
model.enableExternalScorer(scorerPath);

// WebSocket setup for real-time audio streaming
const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
});

io.on('connection', (socket) => {
  console.log('Client connected');
  
  let audioBuffer = Buffer.from([]);

  socket.on('audioData', (data) => {
    audioBuffer = Buffer.concat([audioBuffer, data]);
  });

  socket.on('endAudio', async () => {
    try {
      const result = await model.stt(audioBuffer);
      socket.emit('transcription', { text: result });
    } catch (error) {
      console.error('Transcription error:', error);
      socket.emit('error', { message: 'Error processing audio' });
    }
    audioBuffer = Buffer.from([]);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// API endpoints
app.post('/api/save-transcription', async (req, res) => {
  const { text, userId } = req.body;
  try {
    // Save to database logic will be added here
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save transcription' });
  }
});
