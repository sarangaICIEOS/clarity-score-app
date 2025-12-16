import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
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
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Plus,
  Search,
  MoreVertical,
  Edit,
  Trash2,
  Mail,
  Shield,
  UserPlus,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useNavigate } from 'react-router-dom';

// Mock users data
const mockUsers = [
  { id: '1', name: 'John Admin', email: 'admin@company.com', role: 'admin', projects: 'All', status: 'active', createdAt: '2024-01-15' },
  { id: '2', name: 'Sarah Developer', email: 'sarah@company.com', role: 'developer', projects: '3 projects', status: 'active', createdAt: '2024-02-20' },
  { id: '3', name: 'John Smith', email: 'john.smith@company.com', role: 'developer', projects: '2 projects', status: 'active', createdAt: '2024-03-10' },
  { id: '4', name: 'Emily Chen', email: 'emily.chen@company.com', role: 'developer', projects: '2 projects', status: 'active', createdAt: '2024-03-15' },
  { id: '5', name: 'Mike Reporter', email: 'mike.reporter@company.com', role: 'reporter', projects: '4 projects', status: 'active', createdAt: '2024-01-20' },
  { id: '6', name: 'Emily BA', email: 'emily.ba@company.com', role: 'ba', projects: '4 projects', status: 'active', createdAt: '2024-01-25' },
  { id: '7', name: 'David Park', email: 'david.park@company.com', role: 'developer', projects: '1 project', status: 'inactive', createdAt: '2024-04-01' },
  { id: '8', name: 'Alex Wong', email: 'alex.wong@company.com', role: 'developer', projects: '1 project', status: 'active', createdAt: '2024-04-05' },
];

const getRoleBadge = (role: string) => {
  const variants: Record<string, 'default' | 'secondary' | 'success' | 'warning'> = {
    admin: 'default',
    developer: 'secondary',
    reporter: 'success',
    ba: 'warning',
  };
  const labels: Record<string, string> = {
    admin: 'Admin',
    developer: 'Developer',
    reporter: 'Reporter',
    ba: 'Business Analyst',
  };
  return <Badge variant={variants[role]}>{labels[role]}</Badge>;
};

const getInitials = (name: string) => {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();
};

export default function Users() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);

  // Redirect non-admins
  if ((user?.role as unknown as string) !== 'admin') {
    navigate('/dashboard');
    return null;
  }

  const filteredUsers = mockUsers.filter(
    (u) =>
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = {
    total: mockUsers.length,
    admins: mockUsers.filter((u) => u.role === 'admin').length,
    developers: mockUsers.filter((u) => u.role === 'developer').length,
    reviewers: mockUsers.filter((u) => u.role === 'reporter' || u.role === 'ba').length,
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">User Management</h1>
            <p className="text-muted-foreground mt-1">
              Manage system users and their access permissions
            </p>
          </div>
          <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <UserPlus className="h-4 w-4" />
                Add User
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Add New User</DialogTitle>
                <DialogDescription>
                  Create a new user account. They will receive an email with login credentials.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="John" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Doe" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="john.doe@company.com" />
                </div>
                <div className="space-y-2">
                  <Label>Role</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Administrator</SelectItem>
                      <SelectItem value="developer">Developer</SelectItem>
                      <SelectItem value="reporter">Reporter</SelectItem>
                      <SelectItem value="ba">Business Analyst</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddUserOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsAddUserOpen(false)}>
                  <Mail className="mr-2 h-4 w-4" />
                  Send Invitation
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-4">
          <Card className="data-card">
            <CardContent className="pt-6">
              <p className="text-sm font-medium text-muted-foreground">Total Users</p>
              <p className="text-2xl font-bold mt-1">{stats.total}</p>
            </CardContent>
          </Card>
          <Card className="data-card">
            <CardContent className="pt-6">
              <p className="text-sm font-medium text-muted-foreground">Administrators</p>
              <p className="text-2xl font-bold mt-1">{stats.admins}</p>
            </CardContent>
          </Card>
          <Card className="data-card">
            <CardContent className="pt-6">
              <p className="text-sm font-medium text-muted-foreground">Developers</p>
              <p className="text-2xl font-bold mt-1">{stats.developers}</p>
            </CardContent>
          </Card>
          <Card className="data-card">
            <CardContent className="pt-6">
              <p className="text-sm font-medium text-muted-foreground">Reviewers</p>
              <p className="text-2xl font-bold mt-1">{stats.reviewers}</p>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Users Table */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Projects</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((u) => (
                  <TableRow key={u.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarFallback className="bg-primary/10 text-primary text-sm">
                            {getInitials(u.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{u.name}</p>
                          <p className="text-sm text-muted-foreground">{u.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{getRoleBadge(u.role)}</TableCell>
                    <TableCell className="text-muted-foreground">{u.projects}</TableCell>
                    <TableCell>
                      <Badge variant={u.status === 'active' ? 'success' : 'draft'}>
                        {u.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{u.createdAt}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit User
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Shield className="mr-2 h-4 w-4" />
                            Change Role
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
