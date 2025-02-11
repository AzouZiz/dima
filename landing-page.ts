// app/page.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Globe, Star, MessageCircle, Settings, Book, HelpCircle } from 'lucide-react';
import Link from 'next/link';

export default function LandingPage() {
  const [currentLanguage, setCurrentLanguage] = useState('ar');

  const features = [
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: 'تحويل الصوت إلى نص',
      description: 'تحويل دقيق للصوت إلى نص مع دعم للهجات المختلفة'
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: 'تصحيح ذكي',
      description: 'تصحيح تلقائي باستخدام الذكاء الاصطناعي'
    },
    {
      icon: <Settings className="w-8 h-8" />,
      title: 'تخصيص كامل',
      description: 'إمكانية تخصيص الأداة حسب احتياجاتك'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              مساعد النطق
            </Link>
            <select
              value={currentLanguage}
              onChange={(e) => setCurrentLanguage(e.target.value)}
              className="border rounded-md p-1"
            >
              <option value="ar">العربية</option>
              <option value="en">English</option>
              <option value="fr">Français</option>
            </select>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/login" className="px-4 py-2 rounded-md hover:bg-gray-100">
              تسجيل الدخول
            </Link>
            <Link href="/signup" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              إنشاء حساب
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto px-4 py-16 text-center"
      >
        <h1 className="text-5xl font-bold mb-6">أداة مساعدة النطق الذكية</h1>
        <p className="text-xl text-gray-600 mb-8">حول صوتك إلى نص بسهولة مع تصحيح تلقائي ذكي</p>
        <Link 
          href="/app" 
          className="px-8 py-4 bg-blue-600 text-white rounded-lg text-lg hover:bg-blue-700 transition-colors"
        >
          ابدأ الآن مجاناً
        </Link>
      </motion.section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">المميزات</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="p-6 bg-white rounded-lg shadow-lg text-center"
            >
              <div className="text-blue-600 mb-4 flex justify-center">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Tutorial Section */}
      <section className="bg-blue-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">كيف يعمل؟</h2>
          <div className="space-y-8">
            <Step number={1} title="سجل صوتك" description="اضغط على زر التسجيل وابدأ في التحدث" />
            <Step number={2} title="تحويل تلقائي" description="سيتم تحويل صوتك إلى نص بشكل مباشر" />
            <Step number={3} title="تصحيح وتحسين" description="يمكنك تصحيح النص يدوياً أو استخدام التصحيح التلقائي" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">روابط سريعة</h3>
              <ul className="space-y-2">
                <li><Link href="/about">عن الأداة</Link></li>
                <li><Link href="/pricing">الأسعار</Link></li>
                <li><Link href="/contact">اتصل بنا</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">الدعم</h3>
              <ul className="space-y-2">
                <li><Link href="/faq">الأسئلة الشائعة</Link></li>
                <li><Link href="/docs">التوثيق</Link></li>
                <li><Link href="/support">الدعم الفني</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">قانوني</h3>
              <ul className="space-y-2">
                <li><Link href="/privacy">سياسة الخصوصية</Link></li>
                <li><Link href="/terms">الشروط والأحكام</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">تواصل معنا</h3>
              <div className="space-y-2">
                <p>البريد الإلكتروني: info@example.com</p>
                <p>الهاتف: +123 456 789</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

const Step = ({ number, title, description }: { number: number; title: string; description: string }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    className="flex items-center space-x-4 rtl:space-x-reverse"
  >
    <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
      {number}
    </div>
    <div>
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  </motion.div>
);
