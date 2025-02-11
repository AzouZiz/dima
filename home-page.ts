// app/page.tsx
'use client'

import { useState } from 'react'
import { Mic, StopCircle } from 'lucide-react'

export default function Home() {
  const [isRecording, setIsRecording] = useState(false)
  const [transcription, setTranscription] = useState('')

  const startRecording = async () => {
    setIsRecording(true)
    // Speech recognition logic will be implemented here
  }

  const stopRecording = () => {
    setIsRecording(false)
    // Stop recording logic will be implemented here
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">مساعد النطق الذكي</h1>
      
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6">
        <div className="flex flex-col items-center gap-4">
          <button
            onClick={isRecording ? stopRecording : startRecording}
            className={`p-4 rounded-full ${
              isRecording 
                ? 'bg-red-500 hover:bg-red-600' 
                : 'bg-blue-500 hover:bg-blue-600'
            } text-white transition-colors`}
          >
            {isRecording ? (
              <StopCircle className="w-8 h-8" />
            ) : (
              <Mic className="w-8 h-8" />
            )}
          </button>
          
          <div className="w-full min-h-[200px] p-4 border rounded-lg mt-4">
            <p className="text-gray-700">{transcription || 'النص سيظهر هنا...'}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
