import React from 'react';
import {
  FolderKanban,
  Users,
  FileCheck,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  BarChart3,
  Calendar,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  MessageSquare,
  FileEdit,
  Bell,
  Info,
  Zap,
  Target,
  Brain,
  Sparkles,
  Lightbulb,
} from 'lucide-react';

/* -----------------------------
   MOCK DATA
----------------------------- */

const stats = {
  admin: [
    { name: 'Total Projects', value: '12', icon: FolderKanban, change: '+2 this month' },
    { name: 'Active Users', value: '24', icon: Users, change: '+5 this month' },
    { name: 'Pending Reviews', value: '8', icon: FileCheck, change: '3 urgent' },
    { name: 'Avg Clarity Score', value: '7.8', icon: TrendingUp, change: '+0.5 from last sprint' },
  ],
  developer: [
    { name: 'My Projects', value: '3', icon: FolderKanban, change: '2 active sprints' },
    { name: 'Pending Submissions', value: '2', icon: Clock, change: 'Due in 3 days' },
    { name: 'Approved Scores', value: '15', icon: CheckCircle2, change: 'This quarter' },
    { name: 'Avg Score', value: '8.2', icon: TrendingUp, change: '+0.3 improvement' },
  ],
  reporter: [
    { name: 'Assigned Projects', value: '4', icon: FolderKanban, change: '3 active' },
    { name: 'Pending Reviews', value: '6', icon: AlertCircle, change: '2 urgent' },
    { name: 'Approved Today', value: '3', icon: CheckCircle2, change: 'Good progress' },
    { name: 'Team Avg Score', value: '7.5', icon: BarChart3, change: 'Stable' },
  ],
  ba: [
    { name: 'Assigned Projects', value: '4', icon: FolderKanban, change: '3 active' },
    { name: 'Final Approvals', value: '4', icon: AlertCircle, change: 'Ready for review' },
    { name: 'Completed Reviews', value: '28', icon: CheckCircle2, change: 'This month' },
    { name: 'Overall Score', value: '7.8', icon: TrendingUp, change: 'Trending up' },
  ],
};

const recentSubmissions = [
  { id: 1, project: 'E-Commerce Platform', developer: 'Sarah Dev', score: 8.5, status: 'pending', sprint: 'Sprint 14', date: '2 hours ago' },
  { id: 2, project: 'Mobile App Redesign', developer: 'John Smith', score: 7.2, status: 'approved', sprint: 'Sprint 8', date: '5 hours ago' },
  { id: 3, project: 'API Integration', developer: 'Emily Chen', score: 9.1, status: 'approved', sprint: 'Sprint 22', date: '1 day ago' },
  { id: 4, project: 'Dashboard Analytics', developer: 'Mike Johnson', score: 6.8, status: 'rejected', sprint: 'Sprint 5', date: '2 days ago' },
  { id: 5, project: 'Payment Gateway', developer: 'Alex Kumar', score: 8.8, status: 'approved', sprint: 'Sprint 12', date: '3 days ago' },
  { id: 6, project: 'User Authentication', developer: 'Lisa Wong', score: 7.9, status: 'pending', sprint: 'Sprint 9', date: '4 days ago' },
];

const upcomingDeadlines = [
  { id: 1, project: 'E-Commerce Platform', task: 'Sprint 14 Review', daysLeft: 2, priority: 'high' },
  { id: 2, project: 'Mobile App Redesign', task: 'Final BA Approval', daysLeft: 5, priority: 'medium' },
  { id: 3, project: 'API Integration', task: 'Documentation Review', daysLeft: 7, priority: 'low' },
];

const teamPerformance = [
  { name: 'Frontend Team', score: 8.4, trend: 'up', submissions: 12 },
  { name: 'Backend Team', score: 7.8, trend: 'up', submissions: 10 },
  { name: 'Mobile Team', score: 8.1, trend: 'down', submissions: 8 },
  { name: 'DevOps Team', score: 7.5, trend: 'stable', submissions: 6 },
];

const recentActivity = [
  { id: 1, user: 'Sarah Dev', action: 'submitted clarity score', project: 'E-Commerce Platform', time: '2 hours ago', type: 'submission' },
  { id: 2, user: 'Mark Reporter', action: 'approved score', project: 'Mobile App Redesign', time: '5 hours ago', type: 'approval' },
  { id: 3, user: 'Emily Chen', action: 'updated documentation', project: 'API Integration', time: '1 day ago', type: 'update' },
  { id: 4, user: 'John BA', action: 'requested changes', project: 'Dashboard Analytics', time: '2 days ago', type: 'comment' },
];

const notifications = [
  { id: 1, title: 'New Sprint Started', message: 'Sprint 16 kicked off today', icon: Zap, time: '1 hour ago', type: 'info' },
  { id: 2, title: 'Pending Submission', message: 'Your project review is due soon', icon: AlertCircle, time: '3 hours ago', type: 'warning' },
  { id: 3, title: 'Score Approved', message: 'Your clarity score for API Integration was approved', icon: CheckCircle2, time: '1 day ago', type: 'success' },
];

const insights = [
  { id: 1, label: 'Your clarity score trend is improving steadily.', icon: TrendingUp },
  { id: 2, label: 'Teams with more than 10 submissions have higher avg scores.', icon: Lightbulb },
  { id: 3, label: 'Pending reviews increase rejection risk by 20%.', icon: Brain },
];

/* -----------------------------
   UTILITY FUNCTIONS
----------------------------- */

const getScoreColor = (score) => {
  if (score >= 8) return 'text-green-600';
  if (score >= 6) return 'text-yellow-600';
  return 'text-red-600';
};

const getScoreBg = (score) => {
  if (score >= 8) return 'bg-green-50';
  if (score >= 6) return 'bg-yellow-50';
  return 'bg-red-50';
};

const getTrendIcon = (trend) => {
  if (trend === 'up') return ArrowUpRight;
  if (trend === 'down') return ArrowDownRight;
  return Minus;
};

const getTrendColor = (trend) => {
  if (trend === 'up') return 'text-green-600';
  if (trend === 'down') return 'text-red-600';
  return 'text-gray-500';
};

const getActivityIcon = (type) => {
  if (type === 'submission') return FileEdit;
  if (type === 'approval') return CheckCircle2;
  if (type === 'comment') return MessageSquare;
  return Activity;
};

const getPriorityColor = (priority) => {
  if (priority === 'high') return 'text-red-600 border-red-300 bg-red-50';
  if (priority === 'medium') return 'text-yellow-600 border-yellow-300 bg-yellow-50';
  return 'text-gray-500 border-gray-300 bg-gray-50';
};

const getStatusStyle = (status) => {
  if (status === 'approved') return 'bg-green-100 text-green-700 border-green-300';
  if (status === 'rejected') return 'bg-red-100 text-red-700 border-red-300';
  return 'bg-gray-100 text-gray-700 border-gray-300';
};

/* -----------------------------
   MAIN COMPONENT
----------------------------- */

export default function Dashboard() {
  const [userRole, setUserRole] = React.useState('developer');
  const [userName] = React.useState('Alex');

  const userStats = stats[userRole];

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* -------------------------------- */}
        {/* HEADER */}
        {/* -------------------------------- */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {getGreeting()}, {userName}
            </h1>
            <p className="text-gray-600 mt-1">
              Here's what's happening with your projects today.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Notifications */}
            <button className="relative p-2 rounded-lg bg-white border border-gray-200 hover:bg-gray-100">
              <Bell className="h-5 w-5 text-gray-700" />
              <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-red-500"></span>
            </button>

            {/* Role Switcher */}
            <div className="flex gap-2">
              {['developer', 'admin', 'reporter', 'ba'].map((role) => (
                <button
                  key={role}
                  onClick={() => setUserRole(role)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    userRole === role
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {role.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* -------------------------------- */}
        {/* STATS GRID */}
        {/* -------------------------------- */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {userStats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.name} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                    <p className="text-3xl font-bold mt-1 text-gray-900">{stat.value}</p>
                    <p className="text-xs text-gray-500 mt-1">{stat.change}</p>
                  </div>
                  <div className="h-10 w-10 rounded-lg bg-blue-50 flex items-center justify-center">
                    <Icon className="h-5 w-5 text-blue-600" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* -------------------------------- */}
        {/* MAIN CONTENT */}
        {/* -------------------------------- */}
        <div className="grid gap-6 lg:grid-cols-3">

          {/* ------------------------ */}
          {/* RECENT SUBMISSIONS */}
          {/* ------------------------ */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Recent Submissions</h3>
                <p className="text-sm text-gray-600 mt-1">Latest clarity score submissions across projects</p>
              </div>
              <button className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg">
                View all <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            <div className="p-6 space-y-3">
              {recentSubmissions.slice(0, 5).map((submission) => (
                <div key={submission.id} className="flex items-center justify-between p-4 rounded-lg bg-gray-50 hover:bg-gray-100 cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center font-bold text-lg ${getScoreBg(submission.score)} ${getScoreColor(submission.score)}`}>
                      {submission.score.toFixed(1)}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{submission.project}</p>
                      <p className="text-sm text-gray-600">
                        {submission.developer} · {submission.sprint}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">{submission.date}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusStyle(submission.status)}`}>
                    {submission.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ------------------------ */}
          {/* SPRINT PROGRESS */}
          {/* ------------------------ */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Current Sprint</h3>
              <p className="text-sm text-gray-600 mt-1">Sprint 15 · Dec 2-15, 2025</p>
            </div>

            <div className="p-6 space-y-6">
              {/* Sprint Progress */}
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Sprint Progress</span>
                  <span className="font-medium text-gray-900">Day 6 of 14</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '43%' }}></div>
                </div>
              </div>

              {/* Sprint Stats */}
              <div className="space-y-4">
                {/* Submitted */}
                <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                    </div>
                    <span className="text-sm text-gray-900">Submitted</span>
                  </div>
                  <span className="font-semibold text-gray-900">4/8</span>
                </div>

                {/* Pending */}
                <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-yellow-100 flex items-center justify-center">
                      <Clock className="h-4 w-4 text-yellow-600" />
                    </div>
                    <span className="text-sm text-gray-900">Pending Review</span>
                  </div>
                  <span className="font-semibold text-gray-900">3</span>
                </div>

                {/* Approved */}
                <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <FileCheck className="h-4 w-4 text-blue-600" />
                    </div>
                    <span className="text-sm text-gray-900">Approved</span>
                  </div>
                  <span className="font-semibold text-gray-900">1</span>
                </div>
              </div>

              <button className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
                View Sprint Details
              </button>
            </div>
          </div>
        </div>

        {/* -------------------------------- */}
        {/* SECOND ROW CONTENT */}
        {/* -------------------------------- */}
        <div className="grid gap-6 lg:grid-cols-3">

          {/* ------------------------ */}
          {/* UPCOMING DEADLINES */}
          {/* ------------------------ */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Upcoming Deadlines
              </h3>
              <p className="text-sm text-gray-600 mt-1">Tasks requiring attention</p>
            </div>

            <div className="p-6">
              <div className="space-y-3">
                {upcomingDeadlines.map((deadline) => (
                  <div key={deadline.id} className="flex items-start justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 cursor-pointer">
                    <div className="flex-1">
                      <p className="font-medium text-sm text-gray-900">{deadline.project}</p>
                      <p className="text-xs text-gray-600 mt-0.5">{deadline.task}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className={`px-2 py-0.5 rounded text-xs font-medium border ${getPriorityColor(deadline.priority)}`}>
                        {deadline.daysLeft}d
                      </span>
                      <span className="text-xs text-gray-500 capitalize">{deadline.priority}</span>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg">
                View All Deadlines
              </button>
            </div>
          </div>

          {/* ------------------------ */}
          {/* TEAM PERFORMANCE */}
          {/* ------------------------ */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Users className="h-5 w-5" />
                Team Performance
              </h3>
              <p className="text-sm text-gray-600 mt-1">Average clarity scores by team</p>
            </div>

            <div className="p-6 space-y-4">
              {teamPerformance.map((team) => {
                const TrendIcon = getTrendIcon(team.trend);
                return (
                  <div key={team.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-900">{team.name}</span>
                        <TrendIcon className={`h-3 w-3 ${getTrendColor(team.trend)}`} />
                      </div>
                      <span className="font-semibold text-gray-900">{team.score}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-1.5">
                        <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: `${(team.score / 10) * 100}%` }}></div>
                      </div>
                      <span className="text-xs text-gray-500 whitespace-nowrap">
                        {team.submissions} subs
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ------------------------ */}
          {/* RECENT ACTIVITY */}
          {/* ------------------------ */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Recent Activity
              </h3>
              <p className="text-sm text-gray-600 mt-1">Latest updates from your team</p>
            </div>

            <div className="p-6 space-y-4">
              {recentActivity.map((activity) => {
                const Icon = getActivityIcon(activity.type);
                return (
                  <div key={activity.id} className="flex gap-3">
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <Icon className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm">
                        <span className="font-medium text-gray-900">{activity.user}</span>{' '}
                        <span className="text-gray-600">{activity.action}</span>
                      </p>
                      <p className="text-xs text-gray-600">{activity.project}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{activity.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <button className="w-full mt-4 px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg">
              View All Activity
            </button>
          </div>
        </div>

        {/* -------------------------------- */}
        {/* THIRD ROW — NEW SECTIONS */}
        {/* -------------------------------- */}
        <div className="grid gap-6 lg:grid-cols-3">

          {/* ------------------------ */}
          {/* NOTIFICATIONS PANEL */}
          {/* ------------------------ */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200 flex items-center gap-2">
              <Bell className="h-5 w-5" />
              <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
            </div>

            <div className="p-6 space-y-4">
              {notifications.map((note) => {
                const Icon = note.icon;
                return (
                  <div key={note.id} className="flex gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 cursor-pointer">
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <Icon className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 text-sm">{note.title}</p>
                      <p className="text-xs text-gray-600">{note.message}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{note.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <button className="w-full px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">
              View All Notifications
            </button>
          </div>

          {/* ------------------------ */}
          {/* INSIGHTS */}
          {/* ------------------------ */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200 flex items-center gap-2">
              <Sparkles className="h-5 w-5" />
              <h3 className="text-lg font-semibold text-gray-900">Insights</h3>
            </div>

            <div className="p-6 space-y-4">
              {insights.map((insight) => {
                const Icon = insight.icon;
                return (
                  <div key={insight.id} className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-lg bg-purple-100 flex items-center justify-center">
                      <Icon className="h-4 w-4 text-purple-600" />
                    </div>
                    <p className="text-sm text-gray-700">{insight.label}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ------------------------ */}
          {/* PERSONAL PRODUCTIVITY */}
          {/* ------------------------ */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200 flex items-center gap-2">
              <Target className="h-5 w-5" />
              <h3 className="text-lg font-semibold text-gray-900">Your Productivity</h3>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <p className="text-sm text-gray-600 mb-1">This week</p>
                <p className="text-3xl font-bold text-gray-900">82%</p>
                <p className="text-xs text-gray-500">+12% from last week</p>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-2">Completion Rate</p>
                <div className="w-full bg-gray-200 h-2 rounded-full">
                  <div className="h-2 bg-green-600 rounded-full" style={{ width: '82%' }}></div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tasks Completed</span>
                  <span className="font-medium">14</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Pending</span>
                  <span className="font-medium">4</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Reviews Done</span>
                  <span className="font-medium">6</span>
                </div>
              </div>

              <button className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-100">
                View Detailed Report
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
