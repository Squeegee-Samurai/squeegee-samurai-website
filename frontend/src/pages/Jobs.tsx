import React, { useState, useEffect } from 'react';
import { Briefcase, Calendar, MapPin, Phone, LogOut } from 'lucide-react';
import { getCurrentUser, logout } from '../utils/auth';
import { useNavigate } from 'react-router-dom';

interface Job {
  id: number;
  customerName: string;
  address: string;
  phone: string;
  scheduledDate: string;
  timeSlot: string;
  serviceType: string;
  paneCount: number;
  total: number;
  status: string;
  notes: string;
}

const Jobs = () => {
  const [user, setUser] = useState<{ fullName?: string } | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);

    const mockJobs: Job[] = [
      { id: 1, customerName: 'John Smith', address: '123 Main St, Ashburn, VA 20147', phone: '540-555-0123', scheduledDate: '2024-01-20', timeSlot: '9:00 AM - 11:00 AM', serviceType: 'Residential - Standard', paneCount: 15, total: 150.00, status: 'Scheduled', notes: 'Customer prefers morning appointments' },
      { id: 2, customerName: 'Sarah Johnson', address: '456 Oak Ave, Leesburg, VA 20175', phone: '540-555-0456', scheduledDate: '2024-01-21', timeSlot: '1:00 PM - 3:00 PM', serviceType: 'Residential - Premium', paneCount: 28, total: 280.00, status: 'In Progress', notes: 'Include screen cleaning' },
      { id: 3, customerName: 'Mike Wilson', address: '789 Pine St, Sterling, VA 20164', phone: '540-555-0789', scheduledDate: '2024-01-19', timeSlot: '10:00 AM - 12:00 PM', serviceType: 'Residential - Basic', paneCount: 12, total: 95.00, status: 'Completed', notes: 'Exterior only' },
    ];
    setJobs(mockJobs);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const updateJobStatus = (jobId: number, newStatus: string) => {
    setJobs(jobs.map(job => job.id === jobId ? { ...job, status: newStatus } : job));
  };

  const statusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-indigo-50 text-indigo-700';
      case 'In Progress': return 'bg-emerald-50 text-emerald-700';
      case 'Scheduled': return 'bg-amber-50 text-amber-700';
      default: return 'bg-sumi-50 text-sumi-600';
    }
  };

  return (
    <div className="min-h-screen bg-washi-50">
      {/* Header */}
      <header className="bg-sumi-800 text-washi-50 border-b border-sumi-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="font-display text-xl font-bold">Job Management</h1>
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
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 mb-8">
          {[
            { icon: <Calendar className="h-6 w-6 text-amber-500" />, label: 'Scheduled', value: jobs.filter(j => j.status === 'Scheduled').length },
            { icon: <Briefcase className="h-6 w-6 text-indigo-500" />, label: 'In Progress', value: jobs.filter(j => j.status === 'In Progress').length },
            { icon: <Briefcase className="h-6 w-6 text-emerald-500" />, label: 'Completed', value: jobs.filter(j => j.status === 'Completed').length },
          ].map((stat) => (
            <div key={stat.label} className="bg-white border border-sumi-100 p-5 flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center bg-sumi-50 flex-shrink-0">{stat.icon}</div>
              <div>
                <p className="text-xs font-medium text-sumi-500 uppercase tracking-wide">{stat.label}</p>
                <p className="font-display text-xl font-bold text-sumi-800">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Jobs */}
        <div className="space-y-4">
          {jobs.map((job) => (
            <div key={job.id} className="bg-white border border-sumi-100 p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-display text-lg font-semibold text-sumi-800">{job.customerName}</h3>
                  <div className="flex items-center text-sumi-500 mt-1 gap-1.5">
                    <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
                    <span className="text-sm">{job.address}</span>
                  </div>
                  <div className="flex items-center text-sumi-500 mt-1 gap-1.5">
                    <Phone className="h-3.5 w-3.5 flex-shrink-0" />
                    <span className="text-sm">{job.phone}</span>
                  </div>
                </div>
                <span className={`inline-flex px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${statusColor(job.status)}`}>
                  {job.status}
                </span>
              </div>

              <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4 mb-4">
                <div>
                  <p className="text-xs font-medium text-sumi-400 uppercase tracking-wide">Date & Time</p>
                  <p className="text-sm text-sumi-700 mt-0.5">{job.scheduledDate}</p>
                  <p className="text-sm text-sumi-500">{job.timeSlot}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-sumi-400 uppercase tracking-wide">Service Type</p>
                  <p className="text-sm text-sumi-700 mt-0.5">{job.serviceType}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-sumi-400 uppercase tracking-wide">Pane Count</p>
                  <p className="text-sm text-sumi-700 mt-0.5">{job.paneCount} panes</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-sumi-400 uppercase tracking-wide">Total</p>
                  <p className="text-sm font-semibold text-sumi-800 mt-0.5">${job.total.toFixed(2)}</p>
                </div>
              </div>

              {job.notes && (
                <div className="mb-4">
                  <p className="text-xs font-medium text-sumi-400 uppercase tracking-wide">Notes</p>
                  <p className="text-sm text-sumi-500 mt-0.5">{job.notes}</p>
                </div>
              )}

              <div className="flex gap-3">
                {job.status === 'Scheduled' && (
                  <button
                    onClick={() => updateJobStatus(job.id, 'In Progress')}
                    className="bg-sumi-800 text-washi-50 px-4 py-2 text-sm font-medium tracking-wide hover:bg-sumi-700 transition-colors"
                  >
                    Start Job
                  </button>
                )}
                {job.status === 'In Progress' && (
                  <button
                    onClick={() => updateJobStatus(job.id, 'Completed')}
                    className="bg-indigo-600 text-white px-4 py-2 text-sm font-medium tracking-wide hover:bg-indigo-700 transition-colors"
                  >
                    Mark Complete
                  </button>
                )}
                <button className="border border-sumi-200 text-sumi-700 px-4 py-2 text-sm font-medium tracking-wide hover:bg-sumi-50 transition-colors">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export { Jobs };
export default Jobs;
