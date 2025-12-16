import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { useNavigate } from 'react-router-dom';
import {
  Download,
  TrendingUp,
  TrendingDown,
  Calendar,
} from 'lucide-react';

const sprintData = [
  { name: 'Sprint 10', score: 7.2 },
  { name: 'Sprint 11', score: 7.5 },
  { name: 'Sprint 12', score: 7.8 },
  { name: 'Sprint 13', score: 7.4 },
  { name: 'Sprint 14', score: 8.1 },
  { name: 'Sprint 15', score: 8.3 },
];

const projectData = [
  { name: 'E-Commerce', score: 8.2 },
  { name: 'Mobile App', score: 7.5 },
  { name: 'API Hub', score: 9.1 },
  { name: 'Dashboard', score: 6.8 },
];

const categoryData = [
  { category: 'Documentation', score: 7.8 },
  { category: 'Technical Req.', score: 8.2 },
  { category: 'Acceptance', score: 7.5 },
  { category: 'UI/UX', score: 8.0 },
  { category: 'Dependencies', score: 7.2 },
  { category: 'Time Est.', score: 7.6 },
  { category: 'Communication', score: 8.1 },
];

export default function Reports() {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Redirect non-admins
  if (user?.role !== 'admin') {
    navigate('/dashboard');
    return null;
  }

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Reports & Analytics</h1>
            <p className="text-muted-foreground mt-1">
              Track clarity score trends across projects and sprints
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Select defaultValue="last-6-sprints">
              <SelectTrigger className="w-[180px]">
                <Calendar className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="last-6-sprints">Last 6 Sprints</SelectItem>
                <SelectItem value="last-12-sprints">Last 12 Sprints</SelectItem>
                <SelectItem value="this-quarter">This Quarter</SelectItem>
                <SelectItem value="this-year">This Year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid gap-4 sm:grid-cols-4">
          <Card className="data-card">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Avg Score (All)</p>
                  <p className="text-2xl font-bold mt-1">7.8</p>
                </div>
                <div className="flex items-center gap-1 text-success text-sm">
                  <TrendingUp className="h-4 w-4" />
                  +0.5
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="data-card">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Highest Project</p>
                  <p className="text-2xl font-bold mt-1">9.1</p>
                  <p className="text-xs text-muted-foreground">API Hub</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="data-card">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Lowest Project</p>
                  <p className="text-2xl font-bold mt-1">6.8</p>
                  <p className="text-xs text-muted-foreground">Dashboard</p>
                </div>
                <div className="flex items-center gap-1 text-destructive text-sm">
                  <TrendingDown className="h-4 w-4" />
                  -0.3
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="data-card">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Submissions</p>
                  <p className="text-2xl font-bold mt-1">156</p>
                  <p className="text-xs text-muted-foreground">This quarter</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Sprint Trend */}
          <Card>
            <CardHeader>
              <CardTitle>Sprint Trend</CardTitle>
              <CardDescription>Average clarity score by sprint</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={sprintData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                    <XAxis dataKey="name" className="text-xs" />
                    <YAxis domain={[0, 10]} className="text-xs" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="score"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                      dot={{ fill: 'hsl(var(--primary))' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Project Comparison */}
          <Card>
            <CardHeader>
              <CardTitle>Project Comparison</CardTitle>
              <CardDescription>Average clarity score by project</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={projectData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                    <XAxis dataKey="name" className="text-xs" />
                    <YAxis domain={[0, 10]} className="text-xs" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                      }}
                    />
                    <Bar dataKey="score" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Category Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Category Breakdown</CardTitle>
            <CardDescription>Average scores across all clarity categories</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis type="number" domain={[0, 10]} className="text-xs" />
                  <YAxis dataKey="category" type="category" className="text-xs" width={120} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                  />
                  <Bar dataKey="score" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
