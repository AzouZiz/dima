// components/Tutorial.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, ChevronLeft } from 'lucide-react';

interface TutorialStep {
  title: string;
  description: string;
  image: string;
  action?: () => void;
}

export const Tutorial = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const tutorialSteps: TutorialStep[] = [
    {
      title: 'مرحباً بك في مساعد النطق',
      description: 'دعنا نتعرف على كيفية استخدام التطبيق خطوة بخطوة',
      image: '/api/placeholder/600/400'
    },
    {
      title: 'تسجيل الصوت',
      description: 'اضغط على زر الميكروفون لبدء التسجيل',
      image: '/api/placeholder/600/400',
      action: () => console.log('Start recording demo')
    },
    {
      title: 'تصحيح النص',
      description: 'يمكنك تصحيح النص يدوياً أو استخدام التصحيح التلقائي',
      image: '/api/placeholder/600/400'
    },
    // ... المزيد من الخطوات
  ];

  const nextStep = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full mx-4">
        <div className="p-6">
          <div className="mb-4 flex justify-between items-center">
            <h2 className="text-2xl font-bold">{tutorialSteps[currentStep].title}</h2>
            <div className="text-sm text-gray-500">
              {currentStep + 1} / {tutorialSteps.length}
            </div>
          </div>

          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="mb-6"
          >
            <img
              src={tutorialSteps[currentStep].image}
              alt={tutorialSteps[currentStep].title}
              className="w-full rounded-lg mb-4"
            />
            <p className="text-gray-600">{tutorialSteps[currentStep].description}</p>
          </motion.div>

          {tutorialSteps[currentStep].action && (
            <button
              onClick={tutorialSteps[currentStep].action}
              className="w-full py-3 bg-blue-600 text-white rounde