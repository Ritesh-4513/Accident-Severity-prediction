import React, { useEffect, useState } from 'react';
import { BarChart, Users, AlertTriangle, TrendingUp } from 'lucide-react';
import Card from '../components/UI/Card';
import { PredictionResult } from '../types';
import { supabase } from '../services/supabase';

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState({
    totalPredictions: 0,
    totalUsers: 0,
    averageConfidence: 0,
    criticalPredictions: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data: predictions } = await supabase
          .from('predictions')
          .select('*');

        const { data: users } = await supabase
          .from('users')
          .select('*');

        if (predictions) {
          const criticalCount = predictions.filter(p => p.severity === 'Critical').length;
          const avgConfidence = predictions.reduce((acc, curr) => acc + curr.confidence, 0) / predictions.length;

          setStats({
            totalPredictions: predictions.length,
            totalUsers: users?.length || 0,
            averageConfidence: Math.round(avgConfidence * 100),
            criticalPredictions: criticalCount
          });
        }
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Predictions"
          value={stats.totalPredictions}
          icon={<BarChart className="text-blue-600" />}
        />
        <StatCard
          title="Total Users"
          value={stats.totalUsers}
          icon={<Users className="text-green-600" />}
        />
        <StatCard
          title="Average Confidence"
          value={`${stats.averageConfidence}%`}
          icon={<TrendingUp className="text-purple-600" />}
        />
        <StatCard
          title="Critical Predictions"
          value={stats.criticalPredictions}
          icon={<AlertTriangle className="text-red-600" />}
        />
      </div>

      {/* Add more admin features here */}
    </div>
  );
};

interface StatCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon }) => (
  <Card className="p-6">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-lg font-medium text-gray-700">{title}</h3>
      {icon}
    </div>
    <p className="text-3xl font-bold text-gray-900">{value}</p>
  </Card>
);

export default AdminDashboard;