// components/TextCorrection.tsx
import { useState, useEffect } from 'react';
import { Edit2, Save, RotateCcw, Check } from 'lucide-react';

interface TextCorrectionProps {
  originalText: string;
  onSave: (correctedText: string) => void;
  onAutoCorrect: () => void;
}

export const TextCorrection = ({ originalText, onSave, onAutoCorrect }: TextCorrectionProps) => {
  const [editableText, setEditableText] = useState(originalText);
  const [isEditing, setIsEditing] = useState(false);
  const [history, setHistory] = useState<string[]>([originalText]);
  const [historyIndex, setHistoryIndex] = useState(0);

  useEffect(() => {
    setEditableText(originalText);
    setHistory([originalText]);
    setHistoryIndex(0);
  }, [originalText]);

  const handleTextChange = (newText: string) => {
    setEditableText(newText);
  };

  const handleSave = () => {
    const newHistory = [...history.slice(0, historyIndex + 1), editableText];
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    setIsEditing(false);
    onSave(editableText);
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setEditableText(history[historyIndex - 1]);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">تصحيح النص</h3>
        <div className="flex gap-2">
          <button
            onClick={onAutoCorrect}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            <Check className="w-5 h-5" />
            تصحيح تلقائي
          </button>
          <button
            onClick={handleUndo}
            disabled={historyIndex === 0}
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 disabled:opacity-50"
          >
            <RotateCcw className="w-5 h-5" />
            تراجع
          </button>
        </div>
      </div>

      <div className="relative">
        {isEditing ? (
          <textarea
            value={editableText}
            onChange={(e) => handleTextChange(e.target.value)}
            className="w-full min-h-[200px] p-4 border rounded-lg focus:ring-2 focus:ring-blue-500"
            dir="rtl"
          />
        ) : (
          <div className="w-full min-h-[200px] p-4 border rounded-lg">
            {editableText}
          </div>
        )}
        
        <button
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          className="absolute top-2 right-2 p-2 rounded-full hover:bg-gray-100"
        >
          {isEditing ? <Save className="w-5 h-5" /> : <Edit2 className="w-5 h-5" />}
        </button>
      </div>
    </div>
  );
};
