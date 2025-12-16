import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import {
  FileCheck,
  Send,
  Save,
  Clock,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
} from 'lucide-react';

interface ScoreCategory {
  id: string;
  name: string;
  description: string;
  value: number;
}

const initialScores: ScoreCategory[] = [
  { id: 'documentation', name: 'Documentation Clarity', description: 'How clear and comprehensive is the documentation?', value: 7 },
  { id: 'technical', name: 'Technical Requirements', description: 'Are technical requirements well-defined?', value: 7 },
  { id: 'acceptance', name: 'Acceptance Criteria', description: 'How clear are the acceptance criteria?', value: 7 },
  { id: 'uiux', name: 'UI/UX Clarity', description: 'Are designs and UX requirements clear?', value: 7 },
  { id: 'dependency', name: 'Dependency Clarity', description: 'Are dependencies and blockers identified?', value: 7 },
  { id: 'time', name: 'Time Estimation', description: 'Can you accurately estimate effort?', value: 7 },
  { id: 'communication', name: 'Communication Quality', description: 'Quality of communication with stakeholders', value: 7 },
];

const mockSubmissions = [
  { id: '1', project: 'E-Commerce Platform', sprint: 'Sprint 14', status: 'draft' as const, avgScore: 7.5, dueDate: 'Dec 15, 2025' },
  { id: '2', project: 'Mobile App Redesign', sprint: 'Sprint 8', status: 'submitted' as const, avgScore: 8.2, dueDate: 'Dec 10, 2025' },
  { id: '3', project: 'API Integration Hub', sprint: 'Sprint 22', status: 'approved' as const, avgScore: 9.1, dueDate: 'Dec 5, 2025' },
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'draft':
      return <Clock className="h-4 w-4" />;
    case 'submitted':
      return <AlertCircle className="h-4 w-4" />;
    case 'approved':
      return <CheckCircle2 className="h-4 w-4" />;
    default:
      return null;
  }
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'draft':
      return <Badge variant="draft">Draft</Badge>;
    case 'submitted':
      return <Badge variant="pending">Pending Review</Badge>;
    case 'approved':
      return <Badge variant="success">Approved</Badge>;
    case 'rejected':
      return <Badge variant="destructive">Rejected</Badge>;
    default:
      return null;
  }
};

const getScoreColor = (score: number) => {
  if (score >= 8) return 'text-success';
  if (score >= 6) return 'text-warning';
  return 'text-destructive';
};

export default function ClarityScores() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [scores, setScores] = useState<ScoreCategory[]>(initialScores);
  const [comments, setComments] = useState('');

  const averageScore = scores.reduce((sum, s) => sum + s.value, 0) / scores.length;

  const handleScoreChange = (id: string, value: number[]) => {
    setScores(scores.map(s => s.id === id ? { ...s, value: value[0] } : s));
  };

  const handleSave = () => {
    toast({
      title: 'Draft saved',
      description: 'Your clarity score has been saved as draft.',
    });
    setIsFormOpen(false);
  };

  const handleSubmit = () => {
    toast({
      title: 'Score submitted',
      description: 'Your clarity score has been submitted for review.',
    });
    setIsFormOpen(false);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Clarity Scores</h1>
          <p className="text-muted-foreground mt-1">
            Submit and track your clarity scores for each sprint
          </p>
        </div>

        {/* Submissions List */}
        <div className="grid gap-4">
          {mockSubmissions.map((submission, index) => (
            <Card
              key={submission.id}
              className="data-card animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <FileCheck className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{submission.project}</h3>
                      <p className="text-sm text-muted-foreground">
                        {submission.sprint} · Due: {submission.dueDate}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Average Score</p>
                      <p className={`text-2xl font-bold ${getScoreColor(submission.avgScore)}`}>
                        {submission.avgScore.toFixed(1)}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(submission.status)}
                      <Button
                        variant={submission.status === 'draft' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => {
                          setSelectedProject(submission.project);
                          setIsFormOpen(true);
                        }}
                        className="gap-1"
                      >
                        {submission.status === 'draft' ? 'Continue' : 'View'}
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Clarity Score Form Dialog */}
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Clarity Score Form</DialogTitle>
              <DialogDescription>
                {selectedProject} · Sprint 14
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-6 py-4">
              {/* Average Score Display */}
              <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Average Clarity Score</p>
                  <p className="text-sm text-muted-foreground">Based on your ratings below</p>
                </div>
                <div className={`text-4xl font-bold ${getScoreColor(averageScore)}`}>
                  {averageScore.toFixed(1)}
                </div>
              </div>

              {/* Score Categories */}
              <div className="space-y-6">
                {scores.map((category) => (
                  <div key={category.id} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base">{category.name}</Label>
                        <p className="text-sm text-muted-foreground">{category.description}</p>
                      </div>
                      <span className={`text-lg font-semibold ${getScoreColor(category.value)}`}>
                        {category.value}
                      </span>
                    </div>
                    <Slider
                      value={[category.value]}
                      onValueChange={(value) => handleScoreChange(category.id, value)}
                      max={10}
                      min={1}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Unclear (1)</span>
                      <span>Very Clear (10)</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Comments */}
              <div className="space-y-2">
                <Label htmlFor="comments">Additional Comments</Label>
                <Textarea
                  id="comments"
                  placeholder="Add any additional notes about requirement clarity, blockers, or suggestions for improvement..."
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  rows={4}
                />
              </div>
            </div>

            <DialogFooter className="gap-2">
              <Button variant="outline" onClick={handleSave}>
                <Save className="mr-2 h-4 w-4" />
                Save Draft
              </Button>
              <Button onClick={handleSubmit}>
                <Send className="mr-2 h-4 w-4" />
                Submit for Review
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}
