// components/SavedPhrases.tsx
import { useState, useEffect } from 'react';
import { Play, Trash2, Edit3 } from 'lucide-react';

interface SavedPhrase {
  id: string;
  text: string;
  category: string;
  createdAt: Date;
}

export const SavedPhrases = () => {
  const [phrases, setPhrases] = useState<SavedPhrase[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const fetchPhrases = async () => {
    try {
      const response = await fetch('/api/phrases');
      const data = await response.json();
      setPhrases(data.phrases);
      
      // Extract unique categories
      const uniqueCategories = [...new Set(data.phrases.map((p: SavedPhrase) => p.category))];
      setCategories(uniqueCategories);
    } catch (error) {
      console.error('Error fetching phrases:', error);
    }
  };

  useEffect(() => {
    fetchPhrases();
  }, []);

  const playPhrase = async (text: string) => {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = 'ar-SA';
    window.speechSynthesis.speak(speech);
  };

  const deletePhrase = async (id: string) => {
    try {
      await fetch(`/api/phrases/${id}`, { method: 'DELETE' });
      fetchPhrases();
    } catch (error) {
      console.error('Error deleting phrase:', error);
    }
  };

  const filteredPhrases = selectedCategory === 'all'
    ? phrases
    : phrases.filter(p => p.category === selectedCategory);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">العبارات المحفوظة</h3>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="p-2 border rounded-md"
        >
          <option value="all">جميع الفئات</option>
          {categories.map((category) => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      <div className="space-y-4">
        {filteredPhrases.map((phrase) => (
          <div key={phrase.id} className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex-1">
              <p className="text-lg">{phrase.text}</p>
              <p className="text-sm text-gray-500">{phrase.category}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => playPhrase(phrase.text)}
                className="p-2 text-blue-500 hover:bg-blue-50 rounded-full"
              >
                <Play className="w-5 h-5" />
              </button>
              <button
                onClick={() => deletePhrase(phrase.id)}
                className="p-2 text-red-500 hover:bg-red-50 rounded-full"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
