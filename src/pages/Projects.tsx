import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import {
  Plus,
  Search,
  Users,
  Calendar,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  FolderKanban,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// Mock projects data
const mockProjects = [
  {
    id: '1',
    name: 'E-Commerce Platform',
    description: 'Full-stack e-commerce solution with payment integration',
    sprintType: '2-week',
    sprintStartDay: 'monday',
    developers: ['Sarah Dev', 'John Smith', 'Emily Chen'],
    reporter: 'Mike Reporter',
    ba: 'Emily BA',
    currentSprint: 'Sprint 14',
    avgScore: 8.2,
    status: 'active',
  },
  {
    id: '2',
    name: 'Mobile App Redesign',
    description: 'Complete UI/UX overhaul for iOS and Android apps',
    sprintType: '2-week',
    sprintStartDay: 'tuesday',
    developers: ['John Smith', 'Alex Wong'],
    reporter: 'Mike Reporter',
    ba: 'Emily BA',
    currentSprint: 'Sprint 8',
    avgScore: 7.5,
    status: 'active',
  },
  {
    id: '3',
    name: 'API Integration Hub',
    description: 'Centralized API management and integration platform',
    sprintType: '1-week',
    sprintStartDay: 'wednesday',
    developers: ['Emily Chen', 'David Park'],
    reporter: 'Mike Reporter',
    ba: 'Emily BA',
    currentSprint: 'Sprint 22',
    avgScore: 9.1,
    status: 'active',
  },
  {
    id: '4',
    name: 'Dashboard Analytics',
    description: 'Real-time analytics dashboard with data visualization',
    sprintType: '2-week',
    sprintStartDay: 'monday',
    developers: ['Mike Johnson'],
    reporter: 'Mike Reporter',
    ba: 'Emily BA',
    currentSprint: 'Sprint 5',
    avgScore: 6.8,
    status: 'paused',
  },
];

const getScoreColor = (score: number) => {
  if (score >= 8) return 'text-success';
  if (score >= 6) return 'text-warning';
  return 'text-destructive';
};

const getScoreBg = (score: number) => {
  if (score >= 8) return 'bg-success/10';
  if (score >= 6) return 'bg-warning/10';
  return 'bg-destructive/10';
};

export default function Projects() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const isAdmin = user?.role === 'admin';

  const filteredProjects = mockProjects.filter(
    (project) =>
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              {isAdmin ? 'All Projects' : 'My Projects'}
            </h1>
            <p className="text-muted-foreground mt-1">
              {isAdmin
                ? 'Manage and configure all company projects'
                : 'View and submit clarity scores for your assigned projects'}
            </p>
          </div>
          {isAdmin && (
            <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  Create Project
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Create New Project</DialogTitle>
                  <DialogDescription>
                    Set up a new project with sprint configuration and team assignments.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Project Name</Label>
                    <Input id="name" placeholder="Enter project name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea id="description" placeholder="Brief description of the project" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Sprint Start Day</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select day" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="monday">Monday</SelectItem>
                          <SelectItem value="tuesday">Tuesday</SelectItem>
                          <SelectItem value="wednesday">Wednesday</SelectItem>
                          <SelectItem value="thursday">Thursday</SelectItem>
                          <SelectItem value="friday">Friday</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Sprint Type</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1-week">1 Week</SelectItem>
                          <SelectItem value="2-week">2 Weeks</SelectItem>
                          <SelectItem value="3-week">3 Weeks</SelectItem>
                          <SelectItem value="4-week">4 Weeks</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Assign Reporter</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select reporter" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mike">Mike Reporter</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Assign Business Analyst</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select BA" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="emily">Emily BA</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => setIsCreateOpen(false)}>Create Project</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Projects Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project, index) => (
            <Card
              key={project.id}
              className="data-card animate-slide-up overflow-hidden"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <FolderKanban className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{project.name}</CardTitle>
                      <CardDescription className="text-xs mt-0.5">
                        {project.currentSprint}
                      </CardDescription>
                    </div>
                  </div>
                  {isAdmin && (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Project
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {project.description}
                </p>

                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>{project.developers.length} developers</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{project.sprintType}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-border">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Avg Score</span>
                    <div
                      className={`px-2 py-0.5 rounded-md text-sm font-semibold ${getScoreBg(project.avgScore)} ${getScoreColor(project.avgScore)}`}
                    >
                      {project.avgScore.toFixed(1)}
                    </div>
                  </div>
                  <Badge variant={project.status === 'active' ? 'success' : 'draft'}>
                    {project.status}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <FolderKanban className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium">No projects found</h3>
            <p className="text-muted-foreground">
              {searchQuery
                ? 'Try adjusting your search query'
                : 'No projects have been created yet'}
            </p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
