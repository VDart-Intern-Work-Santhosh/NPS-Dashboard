import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { Upload, Users, BarChart3, Settings, Bell, Search, Plus, Edit3, Trash2, Play, Pause, Star, TrendingUp, TrendingDown, Music, Phone, MessageSquare, Award, Target, Activity, Calendar, Clock, Zap, Shield, Globe, Headphones, Filter, Download, Eye, CheckCircle } from 'lucide-react';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [users, setUsers] = useState([
    { id: 1, name: 'John Smith', email: 'john.smith@company.com', department: 'Sales', role: 'Senior Rep', rating: 4.8, calls: 156, trend: 'up', performance: 92 },
    { id: 2, name: 'Sarah Johnson', email: 'sarah.johnson@company.com', department: 'Support', role: 'Specialist', rating: 4.9, calls: 203, trend: 'up', performance: 96 },
    { id: 3, name: 'Mike Davis', email: 'mike.davis@company.com', department: 'Marketing', role: 'Manager', rating: 4.2, calls: 98, trend: 'down', performance: 78 },
    { id: 4, name: 'Emily Chen', email: 'emily.chen@company.com', department: 'Sales', role: 'Representative', rating: 4.6, calls: 174, trend: 'up', performance: 88 },
    { id: 5, name: 'David Wilson', email: 'david.wilson@company.com', department: 'Support', role: 'Team Lead', rating: 4.9, calls: 267, trend: 'up', performance: 94 },
    { id: 6, name: 'Lisa Rodriguez', email: 'lisa.rodriguez@company.com', department: 'Marketing', role: 'Coordinator', rating: 4.3, calls: 123, trend: 'stable', performance: 82 },
  ]);
  const [showUserModal, setShowUserModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [notifications, setNotifications] = useState(3);
  const [viewMode, setViewMode] = useState('overview');

  const monthlyData = [
    { month: 'Jan', uploads: 850, rating: 4.1, satisfaction: 87, issues: 23 },
    { month: 'Feb', uploads: 920, rating: 4.2, satisfaction: 89, issues: 18 },
    { month: 'Mar', uploads: 1050, rating: 4.3, satisfaction: 91, issues: 15 },
    { month: 'Apr', uploads: 980, rating: 4.1, satisfaction: 88, issues: 21 },
    { month: 'May', uploads: 1150, rating: 4.4, satisfaction: 93, issues: 12 },
    { month: 'Jun', uploads: 1284, rating: 4.5, satisfaction: 95, issues: 8 },
  ];

  const ratingDistribution = [
    { name: '5 Stars', value: 456, percentage: 35.5, color: '#3B82F6' },
    { name: '4 Stars', value: 394, percentage: 30.7, color: '#60A5FA' },
    { name: '3 Stars', value: 285, percentage: 22.2, color: '#93C5FD' },
    { name: '2 Stars', value: 89, percentage: 6.9, color: '#D1D5DB' },
    { name: '1 Star', value: 60, percentage: 4.7, color: '#9CA3AF' },
  ];

  const departmentPerformance = [
    { department: 'Sales', performance: 92, calls: 428, rating: 4.6 },
    { department: 'Support', performance: 96, calls: 512, rating: 4.8 },
    { department: 'Marketing', performance: 85, calls: 234, rating: 4.3 },
    { department: 'Operations', performance: 89, calls: 156, rating: 4.4 },
  ];

  const recentCalls = [
    { id: 'CS001', user: 'John Smith', department: 'Sales', date: '2024-06-11', time: '14:30', duration: '15:34', rating: 5, status: 'Completed', sentiment: 'Positive' },
    { id: 'CS002', user: 'Sarah Johnson', department: 'Support', date: '2024-06-11', time: '13:45', duration: '22:15', rating: 4, status: 'Completed', sentiment: 'Neutral' },
    { id: 'CS003', user: 'Mike Davis', department: 'Marketing', date: '2024-06-10', time: '16:20', duration: '18:42', rating: 5, status: 'Processing', sentiment: 'Positive' },
    { id: 'CS004', user: 'Emily Chen', department: 'Sales', date: '2024-06-10', time: '11:15', duration: '12:08', rating: 3, status: 'Completed', sentiment: 'Negative' },
    { id: 'CS005', user: 'David Wilson', department: 'Support', date: '2024-06-10', time: '09:30', duration: '19:23', rating: 5, status: 'Completed', sentiment: 'Positive' },
  ];

  const performanceMetrics = [
    { metric: 'Call Quality', score: 94, target: 90, color: '#3B82F6' },
    { metric: 'Customer Satisfaction', score: 92, target: 85, color: '#10B981' },
    { metric: 'Response Time', score: 87, target: 80, color: '#F59E0B' },
    { metric: 'Issue Resolution', score: 96, target: 90, color: '#8B5CF6' },
    { metric: 'Agent Productivity', score: 89, target: 85, color: '#EF4444' },
  ];

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setActiveTab('dashboard');
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-slate-900 to-slate-800 flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\\'60\\' height=\\'60\\' viewBox=\\'0 0 60 60\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Cg fill=\\'none\\' fill-rule=\\'evenodd\\'%3E%3Cg fill=\\'%23ffffff\\' fill-opacity=\\'0.03\\'%3E%3Ccircle cx=\\'7\\' cy=\\'7\\' r=\\'1\\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>

        <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-12 items-center relative z-10">
          {/* Hero Section */}
          <div className="text-center lg:text-left space-y-8">
            <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-400/30 rounded-full px-4 py-2 text-blue-300 text-sm font-medium backdrop-blur-sm">
              <Activity className="w-4 h-4" />
              Next-Gen Voice Analytics
            </div>

            <div className="space-y-6">
              <h1 className="text-5xl lg:text-7xl font-bold bg-gradient-to-r from-white via-blue-100 to-blue-300 bg-clip-text text-transparent leading-tight">
                CallSync AI
              </h1>
              <p className="text-xl text-slate-300 max-w-2xl leading-relaxed">
                Transform your call quality analysis with AI-powered insights, real-time feedback, and advanced performance metrics that drive results.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              {[
                { icon: Target, text: 'AI-Powered Analysis' },
                { icon: BarChart3, text: 'Real-time Insights' },
                { icon: Phone, text: 'Voice Analytics' },
                { icon: TrendingUp, text: 'Performance Tracking' }
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={index}
                    className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-sm text-white"
                  >
                    <Icon className="w-4 h-4 text-blue-400" />
                    {item.text}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Login Form */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
              <p className="text-slate-300">Sign in to access your analytics dashboard</p>
            </div>

            <div className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Email Address</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all backdrop-blur-sm"
                    placeholder="you@company.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Password</label>
                  <input
                    type="password"
                    className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all backdrop-blur-sm"
                    placeholder="Enter your password"
                  />
                </div>
              </div>

              <button
                onClick={handleLogin}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl shadow-lg"
              >
                Access Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

return (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/50">
    {/* Navigation */}
    <nav className="bg-white/90 backdrop-blur-xl border-b border-slate-200/60 sticky top-0 z-50 shadow-sm">
      <div className="max-w-8xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center gap-10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-2xl font-black text-slate-800">CallSync AI</span>
                <p className="text-xs text-slate-500 font-medium">Voice Analytics Platform</p>
              </div>
            </div>

            <div className="hidden lg:flex items-center gap-2">
              {[
                { id: 'dashboard', label: 'Overview', icon: BarChart3 },
                { id: 'users', label: 'Team', icon: Users },
                { id: 'upload', label: 'Upload', icon: Upload },
                { id: 'analytics', label: 'Analytics', icon: Activity },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${activeTab === tab.id
                      ? 'bg-blue-100 text-blue-700 shadow-md scale-105'
                      : 'text-slate-600 hover:text-blue-600 hover:bg-blue-50'
                    }`}
                >
                  <tab.icon className="w-5 h-5" />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search anything..."
                className="pl-12 pr-6 py-3 bg-slate-100 border-0 rounded-xl text-sm focus:outline-none focus:ring-3 focus:ring-blue-500/30 w-80 font-medium"
              />
            </div>

            <button className="relative p-3 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all">
              <Bell className="w-6 h-6" />
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center animate-pulse">
                  {notifications}
                </span>
              )}
            </button>

            <div className="flex items-center gap-4 bg-slate-100 rounded-xl px-4 py-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold">A</span>
              </div>
              <div>
                <p className="font-bold text-slate-800">Admin</p>
                <p className="text-xs text-slate-500">Super Admin</p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="px-6 py-3 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold rounded-xl transition-all"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>

    <div className="max-w-8xl mx-auto px-6 lg:px-8 py-8">
      {/* Dashboard Tab */}
      {activeTab === 'dashboard' && (
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-5xl font-black text-slate-800">Analytics Dashboard</h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Real-time insights and performance metrics for your call quality management
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              { title: 'Total Calls', value: '1,284', change: '+12.3%', positive: true, icon: Phone, color: 'blue', subtitle: 'This month' },
              { title: 'Avg Rating', value: '4.3', change: '+0.2', positive: true, icon: Star, color: 'yellow', subtitle: 'Out of 5.0' },
              { title: 'Team Size', value: '24', change: '+2', positive: true, icon: Users, color: 'green', subtitle: 'Active agents' },
              { title: 'Processing', value: '18', change: '-5', positive: false, icon: Activity, color: 'purple', subtitle: 'In queue' },
              { title: 'Satisfaction', value: '95%', change: '+3%', positive: true, icon: Award, color: 'pink', subtitle: 'Customer score' },
            ].map((stat, index) => (
              <div key={index} className="bg-white rounded-3xl p-6 shadow-xl border border-slate-200/50 hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg ${stat.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                      stat.color === 'yellow' ? 'bg-yellow-100 text-yellow-600' :
                        stat.color === 'green' ? 'bg-green-100 text-green-600' :
                          stat.color === 'purple' ? 'bg-purple-100 text-purple-600' :
                            'bg-pink-100 text-pink-600'
                    }`}>
                    <stat.icon className="w-7 h-7" />
                  </div>
                  <div className={`flex items-center gap-1 text-sm font-bold px-3 py-1 rounded-full ${stat.positive ? 'text-green-700 bg-green-100' : 'text-red-700 bg-red-100'
                    }`}>
                    {stat.positive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                    {stat.change}
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-3xl font-black text-slate-800">{stat.value}</h3>
                  <p className="text-slate-600 font-semibold">{stat.title}</p>
                  <p className="text-xs text-slate-500">{stat.subtitle}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Main Charts Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Performance Trends */}
            <div className="xl:col-span-2 bg-white rounded-3xl p-8 shadow-xl border border-slate-200/50">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h3 className="text-2xl font-bold text-slate-800">Performance Trends</h3>
                  <p className="text-slate-600">Monthly analysis and ratings</p>
                </div>
                <div className="flex gap-6">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                    <span className="text-sm font-semibold text-slate-700">Uploads</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-semibold text-slate-700">Rating</span>
                  </div>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={350}>
                <AreaChart data={monthlyData}>
                  <defs>
                    <linearGradient id="colorUploads" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
                    </linearGradient>
                    <linearGradient id="colorRating" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0.1} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="month" stroke="#64748b" fontSize={12} fontWeight="600" />
                  <YAxis stroke="#64748b" fontSize={12} fontWeight="600" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #e2e8f0',
                      borderRadius: '16px',
                      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                      fontWeight: '600'
                    }}
                  />
                  <Area type="monotone" dataKey="uploads" stroke="#3b82f6" fillOpacity={1} fill="url(#colorUploads)" strokeWidth={3} />
                  <Area type="monotone" dataKey="rating" stroke="#10b981" fillOpacity={1} fill="url(#colorRating)" strokeWidth={3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Rating Distribution */}
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-200/50">
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-slate-800">Rating Distribution</h3>
                <p className="text-slate-600">Call quality breakdown</p>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={ratingDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {ratingDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-1 gap-3 mt-6">
                {ratingDistribution.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded-full shadow-sm" style={{ backgroundColor: item.color }}></div>
                      <span className="font-semibold text-slate-700">{item.name}</span>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-slate-800">{item.value}</p>
                      <p className="text-xs text-slate-500">{item.percentage}%</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Department Performance & Recent Calls */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {/* Department Performance */}
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-200/50">
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-slate-800">Department Performance</h3>
                <p className="text-slate-600">Team effectiveness metrics</p>
              </div>
              <div className="space-y-6">
                {departmentPerformance.map((dept, index) => (
                  <div key={index} className="space-y-3">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${index === 0 ? 'bg-blue-500' :
                            index === 1 ? 'bg-green-500' :
                              index === 2 ? 'bg-purple-500' : 'bg-orange-500'
                          }`}></div>
                        <span className="font-bold text-slate-800">{dept.department}</span>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-slate-800">{dept.performance}%</p>
                        <p className="text-xs text-slate-500">{dept.calls} calls</p>
                      </div>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-3">
                      <div
                        className={`h-3 rounded-full transition-all duration-1000 ${index === 0 ? 'bg-blue-500' :
                            index === 1 ? 'bg-green-500' :
                              index === 2 ? 'bg-purple-500' : 'bg-orange-500'
                          }`}
                        style={{ width: `${dept.performance}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Calls */}
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-200/50">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h3 className="text-2xl font-bold text-slate-800">Recent Calls</h3>
                  <p className="text-slate-600">Latest call analysis</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-xl font-semibold hover:bg-blue-200 transition-colors">
                  <Eye className="w-4 h-4" />
                  View All
                </button>
              </div>
              <div className="space-y-4">
                {recentCalls.slice(0, 4).map((call) => (
                  <div key={call.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                        <span className="text-white font-bold text-sm">{call.user.charAt(0)}</span>
                      </div>
                      <div>
                        <p className="font-bold text-slate-800">{call.user}</p>
                        <p className="text-sm text-slate-600">{call.department} • {call.duration}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-4 h-4 ${i < call.rating ? 'text-yellow-500 fill-current' : 'text-slate-300'}`} />
                        ))}
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${call.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                        }`}>
                        {call.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Team Tab */}
      {activeTab === 'users' && (
        <div className="space-y-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-black text-slate-800">Team Management</h1>
              <p className="text-xl text-slate-600 mt-2">Manage your team members and track their performance</p>
            </div>
            <button
              onClick={() => setShowUserModal(true)}
              className="flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-bold transition-all transform hover:scale-105 shadow-lg"
            >
              <Plus className="w-5 h-5" />
              Add Team Member
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {users.map((user) => (
              <div key={user.id} className="bg-white rounded-3xl p-6 shadow-xl border border-slate-200/50 hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
                      <span className="text-white font-black text-xl">{user.name.charAt(0)}</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-800">{user.name}</h3>
                      <p className="text-slate-600 font-semibold">{user.role}</p>
                      <p className="text-sm text-slate-500">{user.department}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors">
                      <Edit3 className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600 font-semibold">Performance</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-black text-slate-800">{user.performance}%</span>
                      {user.trend === 'up' && <TrendingUp className="w-4 h-4 text-green-500" />}
                      {user.trend === 'down' && <TrendingDown className="w-4 h-4 text-red-500" />}
                    </div>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-3">
                    <div
                      className="h-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-1000"
                      style={{ width: `${user.performance}%` }}
                    ></div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-slate-50 rounded-xl">
                      <p className="text-2xl font-black text-slate-800">{user.calls}</p>
                      <p className="text-sm text-slate-600 font-semibold">Total Calls</p>
                    </div>
                    <div className="text-center p-3 bg-slate-50 rounded-xl">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-2xl font-black text-slate-800">{user.rating}</span>
                      </div>
                      <p className="text-sm text-slate-600 font-semibold">Avg Rating</p>
                    </div>
                  </div>
                </div>

                <button className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 rounded-xl transition-colors">
                  View Detailed Analytics
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Upload Tab */}
      {activeTab === 'upload' && (
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-black text-slate-800">Upload Audio Files</h1>
            <p className="text-xl text-slate-600">Upload call recordings for comprehensive AI analysis</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl p-10 shadow-xl border border-slate-200/50">
              <div
                className="border-3 border-dashed border-slate-300 rounded-2xl p-16 text-center hover:border-blue-400 hover:bg-blue-50/50 transition-all cursor-pointer group"
                onClick={() => document.getElementById('file-upload').click()}
              >
                <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg">
                  <Music className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-slate-800 mb-4">Drop your audio files here</h3>
                <p className="text-xl text-slate-600 mb-6">or click to browse and select files</p>
                <input
                  id="file-upload"
                  type="file"
                  accept="audio/*"
                  onChange={handleFileUpload}
                  className="hidden"
                  multiple
                />
                <div className="flex justify-center gap-6 text-lg text-slate-500 font-semibold">
                  <span className="px-4 py-2 bg-slate-100 rounded-xl">MP3</span>
                  <span className="px-4 py-2 bg-slate-100 rounded-xl">WAV</span>
                  <span className="px-4 py-2 bg-slate-100 rounded-xl">M4A</span>
                  <span className="px-4 py-2 bg-slate-100 rounded-xl">FLAC</span>
                </div>
              </div>

              {selectedFile && (
                <div className="mt-8 p-6 bg-blue-50 rounded-2xl border-2 border-blue-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center">
                        <Music className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <p className="text-xl font-bold text-slate-800">{selectedFile.name}</p>
                        <p className="text-slate-600 font-semibold">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB • Audio File</p>
                      </div>
                    </div>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold transition-colors shadow-lg">
                      Start Analysis
                    </button>
                  </div>
                </div>
              )}

              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-lg font-bold text-slate-700 mb-3">Assign to Team Member</label>
                  <select className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/30 font-semibold">
                    <option>Select team member...</option>
                    {users.map((user) => (
                      <option key={user.id} value={user.id}>{user.name} - {user.department}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-lg font-bold text-slate-700 mb-3">Analysis Priority</label>
                  <select className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/30 font-semibold">
                    <option>Standard Processing</option>
                    <option>High Priority</option>
                    <option>Urgent Analysis</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Analytics Tab */}
      {activeTab === 'analytics' && (
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-black text-slate-800">Advanced Analytics</h1>
            <p className="text-xl text-slate-600">Deep insights and comprehensive performance analysis</p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {/* Monthly Performance Chart */}
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-200/50">
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-slate-800">Monthly Performance Breakdown</h3>
                <p className="text-slate-600">Comprehensive monthly metrics analysis</p>
              </div>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="month" stroke="#64748b" fontSize={12} fontWeight="600" />
                  <YAxis stroke="#64748b" fontSize={12} fontWeight="600" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #e2e8f0',
                      borderRadius: '16px',
                      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                      fontWeight: '600'
                    }}
                  />
                  <Bar dataKey="uploads" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="satisfaction" fill="#10b981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Performance Metrics Radar */}
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-200/50">
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-slate-800">Performance Radar</h3>
                <p className="text-slate-600">Multi-dimensional performance overview</p>
              </div>
              <ResponsiveContainer width="100%" height={400}>
                <RadarChart data={performanceMetrics}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="metric" />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} />
                  <Radar name="Score" dataKey="score" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} strokeWidth={3} />
                  <Radar name="Target" dataKey="target" stroke="#10b981" fill="#10b981" fillOpacity={0.1} strokeWidth={2} strokeDasharray="5 5" />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Performance Metrics Grid */}
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-200/50">
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-slate-800">Key Performance Indicators</h3>
              <p className="text-slate-600">Detailed breakdown of all performance metrics</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {performanceMetrics.map((metric, index) => (
                <div key={index} className="space-y-4 p-6 bg-slate-50 rounded-2xl">
                  <div className="flex justify-between items-start">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg" style={{ backgroundColor: metric.color }}>
                      <Target className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-black text-slate-800">{metric.score}%</p>
                      <p className="text-sm text-slate-500">Target: {metric.target}%</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="font-bold text-slate-800">{metric.metric}</p>
                    <div className="w-full bg-slate-200 rounded-full h-3">
                      <div
                        className="h-3 rounded-full transition-all duration-1000"
                        style={{
                          width: `${metric.score}%`,
                          backgroundColor: metric.color
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>

    {/* Enhanced User Modal */}
    {showUserModal && (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-6">
        <div className="bg-white rounded-3xl p-8 w-full max-w-2xl shadow-2xl">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="text-3xl font-bold text-slate-800">Add Team Member</h3>
              <p className="text-slate-600">Create a new team member profile</p>
            </div>
            <button
              onClick={() => setShowUserModal(false)}
              className="text-slate-400 hover:text-slate-600 transition-colors p-2 hover:bg-slate-100 rounded-xl"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-lg font-bold text-slate-700 mb-3">Full Name</label>
              <input
                type="text"
                className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/30 font-semibold"
                placeholder="Enter full name"
              />
            </div>
            <div>
              <label className="block text-lg font-bold text-slate-700 mb-3">Email Address</label>
              <input
                type="email"
                className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/30 font-semibold"
                placeholder="Enter email address"
              />
            </div>
            <div>
              <label className="block text-lg font-bold text-slate-700 mb-3">Department</label>
              <select className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/30 font-semibold">
                <option>Select department</option>
                <option>Sales</option>
                <option>Support</option>
                <option>Marketing</option>
                <option>Operations</option>
              </select>
            </div>
            <div>
              <label className="block text-lg font-bold text-slate-700 mb-3">Role</label>
              <input
                type="text"
                className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/30 font-semibold"
                placeholder="Enter role/position"
              />
            </div>
          </div>

          <div className="flex gap-4 pt-8">
            <button
              onClick={() => setShowUserModal(false)}
              className="flex-1 px-8 py-4 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => setShowUserModal(false)}
              className="flex-1 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all transform hover:scale-105 shadow-lg"
            >
              Add Team Member
            </button>
          </div>
        </div>
      </div>
    )}
  </div>
);
};

export default App;