import React, { useState, useEffect } from 'react';
import { BarChart3, Users, DollarSign, Calendar, LogOut } from 'lucide-react';
import { getCurrentUser, logout } from '../utils/auth';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [user, setUser] = useState<{ fullName?: string } | null>(null);
  const [quotes, setQuotes] = useState<Array<{
    id: number; fullName: string; email: string; date: string;
    total: number; tier: string; paneCount: number; frequency: string; status: string;
  }>>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);

    const mockQuotes = [
      { id: 1, fullName: 'John Smith', email: 'john@example.com', date: '2024-01-15', total: 150.00, tier: 'Standard', paneCount: 15, frequency: 'Quarterly', status: 'Pending' },
      { id: 2, fullName: 'Sarah Johnson', email: 'sarah@example.com', date: '2024-01-14', total: 280.00, tier: 'Premium', paneCount: 28, frequency: 'Monthly', status: 'Approved' },
      { id: 3, fullName: 'Mike Wilson', email: 'mike@example.com', date: '2024-01-13', total: 95.00, tier: 'Basic', paneCount: 12, frequency: 'One-time', status: 'Completed' },
    ];
    setQuotes(mockQuotes);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const stats = {
    totalQuotes: quotes.length,
    totalRevenue: quotes.reduce((sum, q) => sum + q.total, 0),
    pendingQuotes: quotes.filter(q => q.status === 'Pending').length,
    completedJobs: quotes.filter(q => q.status === 'Completed').length,
  };

  const statusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-indigo-50 text-indigo-700';
      case 'Approved': return 'bg-emerald-50 text-emerald-700';
      default: return 'bg-amber-50 text-amber-700';
    }
  };

  return (
    <div className="min-h-screen bg-washi-50">
      {/* Header */}
      <header className="bg-sumi-800 text-washi-50 border-b border-sumi-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="font-display text-xl font-bold">Admin Dashboard</h1>
              <p className="text-sm text-sumi-300">Welcome back, {user?.fullName}</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center border border-sumi-500 text-washi-50 px-4 py-2 text-sm font-medium tracking-wide hover:bg-sumi-700 transition-colors gap-2"
            >
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
          {[
            { icon: <BarChart3 className="h-6 w-6 text-indigo-500" />, label: 'Total Quotes', value: stats.totalQuotes },
            { icon: <DollarSign className="h-6 w-6 text-indigo-500" />, label: 'Total Revenue', value: `$${stats.totalRevenue.toFixed(2)}` },
            { icon: <Calendar className="h-6 w-6 text-indigo-500" />, label: 'Pending Quotes', value: stats.pendingQuotes },
            { icon: <Users className="h-6 w-6 text-indigo-500" />, label: 'Completed Jobs', value: stats.completedJobs },
          ].map((stat) => (
            <div key={stat.label} className="bg-white border border-sumi-100 p-5 flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center bg-indigo-50 flex-shrink-0">{stat.icon}</div>
              <div>
                <p className="text-xs font-medium text-sumi-500 uppercase tracking-wide">{stat.label}</p>
                <p className="font-display text-xl font-bold text-sumi-800">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Quotes Table */}
        <div className="bg-white border border-sumi-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-sumi-100">
            <h2 className="font-display text-lg font-semibold text-sumi-800">All Submitted Quotes</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-sumi-100">
              <thead className="bg-sumi-50">
                <tr>
                  {['Customer', 'Email', 'Date', 'Total', 'Tier', 'Panes', 'Frequency', 'Status'].map((h) => (
                    <th key={h} className="px-5 py-3 text-left text-[10px] font-semibold text-sumi-500 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-sumi-100">
                {quotes.map((quote) => (
                  <tr key={quote.id} className="hover:bg-sumi-50/50 transition-colors">
                    <td className="px-5 py-3 text-sm font-medium text-sumi-800">{quote.fullName}</td>
                    <td className="px-5 py-3 text-sm text-sumi-500">{quote.email}</td>
                    <td className="px-5 py-3 text-sm text-sumi-500">{quote.date}</td>
                    <td className="px-5 py-3 text-sm font-medium text-sumi-800">${quote.total.toFixed(2)}</td>
                    <td className="px-5 py-3 text-sm text-sumi-500">{quote.tier}</td>
                    <td className="px-5 py-3 text-sm text-sumi-500">{quote.paneCount}</td>
                    <td className="px-5 py-3 text-sm text-sumi-500">{quote.frequency}</td>
                    <td className="px-5 py-3">
                      <span className={`inline-flex px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${statusColor(quote.status)}`}>
                        {quote.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
