// components/HelpCenter.tsx
'use client';

import { useState } from 'react';
import { Search, Book, MessageSquare, VideoIcon, HelpCircle } from 'lucide-react';

export const HelpCenter = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const helpCategories = [
    {
      icon: <Book />,
      title: 'دليل المستخدم',
      description: 'تعلم كيفية استخدام جميع ميزات التطبيق'
    },
    {
      icon: <MessageSquare />,
      title: 'الدعم المباشر',
      description: 'تحدث مع فريق الدعم الفني'
    },
    {
      icon: <VideoIcon />,
      title: 'فيديوهات تعليمية',
      description: 'شاهد شروحات مرئية للاستخدام'
    }
  ];

  const faqItems = [
    {
      question: 'كيف يمكنني بدء استخدام التطبيق؟',
      answer: 'يمكنك البدء بالضغط على زر التسجيل وبدء التحدث. سيقوم التطبيق تلقائياً بتحويل صوتك إلى نص.'
    },
    // ... المزيد من الأسئلة الشائعة
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">مركز المساعدة</h1>

      {/* Search Bar */}
      <div className="relative mb-8">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="ابحث عن المساعدة..."
          className="w-full p-4 pl-12 border rounded-lg"
        />
        <Search className="absolute left-4 top-4 text-gray-400" />
      </div>

      {/* Help Categories */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {helpCategories.map((category, index) => (
          <div
            key={index}
            className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
          >
            <div className="text-blue-600 mb-4">{category.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{category.title}</h3>
            <p className="text-gray-600">{category.description}</p>
          </div>
        ))}
      </div>

      {/* FAQ Section */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6">الأسئلة الشائعة</h2>
        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <details key={index} className="group">
              <summary className="flex justify-between items-center cursor-pointer p-4 bg-gray-50 rounded-lg">
                <span className="font-medium">{item.question}</span>
                <HelpCircle className="text-gray-400 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="p-4 text-gray-600">
                {item.answer}
              </div>
            </details>
          ))}
        </div>
      </div>

      {/* Live Chat */}
      <div className="fixed bottom-4 right-4">
        <button className="p-4 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700">
          <MessageSquare className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};
