// app/admin/page.tsx
'use client';

import { useState } from 'react';
import { Bar, Line } from 'recharts';
import { 
  Users, 
  Activity, 
  MessageSquare, 
  Settings,
  Database,
  Shield
} from 'lucide-react';

export default function AdminDashboard() {
  const [selectedTab, setSelectedTab] = useState('overview');

  const analyticsData = [
    { month: 'يناير', users: 120, accuracy: 85 },
    { month: 'فبراير', users: 150, accuracy: 87 },
    { month: 'مارس', users: 200, accuracy: 89 },
    // ... المزيد من البيانات
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="fixed w-64 h-screen bg-white shadow-lg">
        <div className="p-4">
          <h2 className="text-xl font-bold text-gray-800">لوحة التحكم</h2>
        </div>
        <nav className="mt-4">
          <MenuItem 
            icon={<Activity />} 
            title="نظرة عامة" 
            active={selectedTab === 'overview'}
            onClick={() => setSelectedTab('overview')}
          />
          <MenuItem 
            icon={<Users />} 
            title="المستخدمون" 
            active={selectedTab === 'users'}
            onClick={() => setSelectedTab('users')}
          />
          <MenuItem 
            icon={<MessageSquare />} 
            title="النصوص" 
            active={selectedTab === 'texts'}
            onClick={() => setSelectedTab('texts')}
          />
          <MenuItem 
            icon={<Database />} 
            title="قاعدة البيانات" 
            active={selectedTab === 'database'}
            onClick={() => setSelectedTab('database')}
          />
          <MenuItem 
            icon={<Shield />} 
            title="الأمان" 
            active={selectedTab === 'security'}
            onClick={() => setSelectedTab('security')}
          />
          <MenuItem 
            icon={<Settings />} 
            title="الإعدادات" 
            active={selectedTab === 'settings'}
            onClick={() => setSelectedTab('settings')}
          />
        </nav>
      </aside>

      {/* Main Content */}
      <main className="mr-64 p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard 
            title="المستخدمون النشطون"
            value="1,234"
            change="+12%"
            type="positive"
          />
          <StatCard 
            title="دقة التحويل"
            value="89%"
            change="+3%"
            type="positive"
          />
          <StatCard 
            title="النصوص المحولة"
            value="45,678"
            change="+25%"
            type="positive"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Charts */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">نمو المستخدمين</h3>
            <Line
              data={analyticsData}
              width={500}
              height={300}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              {/* Chart components */}
            </Line>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">دقة التحويل</h3>
            <Bar
              data={analyticsData}
              width={500}
              height={300}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              {/* Chart components */}
            </Bar>
          </div>
        </div>
      </main>
    </div>
  );
}

const MenuItem = ({ 
  icon, 
  title, 
  active, 
  onClick 
}: { 
  icon: React.ReactNode; 
  title: string; 
  active: boolean; 
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center space-x-3 rtl:space-x-reverse px-4 py-3 text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors ${
      active ? 'bg-blue-50 text-blue-600' : ''
    }`}
  >
    {icon}
    <span>{title}</span>
  </button>
);

const StatCard = ({ 
  title, 
  value, 
  change, 
  type 
}: { 
  title: string; 
  value: string; 
  change: string; 
  type: 'positive' | 'negative';
}) => (
  <div className="bg-white p-6 rounded-lg shadow">
    <h3 className="text-gray-600 mb-2">{title}</h3>
    <div className="flex items-center justify-between">
      <span className="text-2xl font-bold">{value}</span>
      <span className={`${
        type === 'positive' ? 'text-green-500' : 'text-red-500'
      }`}>
        {change}
      </span>
    </div>
  </div>
);
