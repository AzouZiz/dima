// components/AudioRecorder.tsx
import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { toast } from '@/components/ui/toast';

export const AudioRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcription, setTranscription] = useState('');
  const socketRef = useRef<Socket | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  useEffect(() => {
    socketRef.current = io(process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001');

    socketRef.current.on('transcription', (data) => {
      setTranscription(prev => prev + ' ' + data.text);
    });

    socketRef.current.on('error', (error) => {
      toast({
        title: "خطأ",
        description: error.message,
        variant: "destructive",
      });
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0 && socketRef.current) {
          const reader = new FileReader();
          reader.onload = () => {
            if (reader.result instanceof ArrayBuffer) {
              socketRef.current?.emit('audioData', Buffer.from(reader.result));
            }
          };
          reader.readAsArrayBuffer(event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        socketRef.current?.emit('endAudio');
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorderRef.current.start(250); // Send audio data every 250ms
      setIsRecording(true);
    } catch (error) {
      console.error('Error starting recording:', error);
      toast({
        title: "خطأ",
        description: "فشل في بدء التسجيل",
        variant: "destructive",
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  return {
    isRecording,
    transcription,
    startRecording,
    stopRecording,
  };
};
