import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import {
  CheckCircle2,
  XCircle,
  Clock,
  Eye,
  AlertTriangle,
} from 'lucide-react';

interface ReviewSubmission {
  id: string;
  developer: string;
  developerEmail: string;
  project: string;
  sprint: string;
  submittedAt: string;
  avgScore: number;
  status: 'pending' | 'approved' | 'rejected';
  scores: {
    category: string;
    value: number;
  }[];
  comments: string;
}

const mockReviews: ReviewSubmission[] = [
  {
    id: '1',
    developer: 'Sarah Developer',
    developerEmail: 'sarah@company.com',
    project: 'E-Commerce Platform',
    sprint: 'Sprint 14',
    submittedAt: '2025-12-06 10:30 AM',
    avgScore: 8.2,
    status: 'pending',
    scores: [
      { category: 'Documentation Clarity', value: 8 },
      { category: 'Technical Requirements', value: 9 },
      { category: 'Acceptance Criteria', value: 7 },
      { category: 'UI/UX Clarity', value: 8 },
      { category: 'Dependency Clarity', value: 9 },
      { category: 'Time Estimation', value: 8 },
      { category: 'Communication Quality', value: 8 },
    ],
    comments: 'Overall requirements are clear. Some minor ambiguity in the payment integration specs that could use more detail.',
  },
  {
    id: '2',
    developer: 'John Smith',
    developerEmail: 'john.smith@company.com',
    project: 'Mobile App Redesign',
    sprint: 'Sprint 8',
    submittedAt: '2025-12-05 3:45 PM',
    avgScore: 6.8,
    status: 'pending',
    scores: [
      { category: 'Documentation Clarity', value: 6 },
      { category: 'Technical Requirements', value: 7 },
      { category: 'Acceptance Criteria', value: 6 },
      { category: 'UI/UX Clarity', value: 8 },
      { category: 'Dependency Clarity', value: 6 },
      { category: 'Time Estimation', value: 7 },
      { category: 'Communication Quality', value: 7 },
    ],
    comments: 'Need more clarity on the animation requirements and offline functionality specs.',
  },
  {
    id: '3',
    developer: 'Emily Chen',
    developerEmail: 'emily.chen@company.com',
    project: 'API Integration Hub',
    sprint: 'Sprint 22',
    submittedAt: '2025-12-04 9:15 AM',
    avgScore: 9.1,
    status: 'approved',
    scores: [
      { category: 'Documentation Clarity', value: 9 },
      { category: 'Technical Requirements', value: 10 },
      { category: 'Acceptance Criteria', value: 9 },
      { category: 'UI/UX Clarity', value: 8 },
      { category: 'Dependency Clarity', value: 9 },
      { category: 'Time Estimation', value: 10 },
      { category: 'Communication Quality', value: 9 },
    ],
    comments: 'Excellent documentation and very clear technical requirements. Minor suggestions for UI component library decisions.',
  },
];

const getInitials = (name: string) => {
  return name.split(' ').map(n => n[0]).join('').toUpperCase();
};

const getScoreColor = (score: number) => {
  if (score >= 8) return 'text-success';
  if (score >= 6) return 'text-warning';
  return 'text-destructive';
};

const getScoreBg = (score: number) => {
  if (score >= 8) return 'bg-success';
  if (score >= 6) return 'bg-warning';
  return 'bg-destructive';
};

export default function Reviews() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedReview, setSelectedReview] = useState<ReviewSubmission | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');

  const isReporter = (user?.role as unknown as string) === 'reporter';
  const isBA = (user?.role as unknown as string) === 'ba';

  const pendingReviews = mockReviews.filter(r => r.status === 'pending');
  const completedReviews = mockReviews.filter(r => r.status !== 'pending');

  const handleApprove = () => {
    toast({
      title: 'Submission approved',
      description: `${selectedReview?.developer}'s clarity score has been approved.`,
    });
    setSelectedReview(null);
  };

  const handleReject = () => {
    if (!rejectionReason.trim()) {
      toast({
        title: 'Reason required',
        description: 'Please provide a reason for rejection.',
        variant: 'destructive',
      });
      return;
    }
    toast({
      title: 'Submission rejected',
      description: `${selectedReview?.developer}'s submission has been sent back for revision.`,
    });
    setSelectedReview(null);
    setRejectionReason('');
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Review Submissions</h1>
          <p className="text-muted-foreground mt-1">
            {isReporter
              ? 'Review and approve clarity scores from developers'
              : 'Final approval for clarity score submissions'}
          </p>
        </div>

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-3">
          <Card className="data-card">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Pending Review</p>
                  <p className="text-2xl font-bold mt-1">{pendingReviews.length}</p>
                </div>
                <div className="h-10 w-10 rounded-lg bg-warning/10 flex items-center justify-center">
                  <Clock className="h-5 w-5 text-warning" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="data-card">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Approved</p>
                  <p className="text-2xl font-bold mt-1">{completedReviews.filter(r => r.status === 'approved').length}</p>
                </div>
                <div className="h-10 w-10 rounded-lg bg-success/10 flex items-center justify-center">
                  <CheckCircle2 className="h-5 w-5 text-success" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="data-card">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Avg Team Score</p>
                  <p className="text-2xl font-bold mt-1">7.8</p>
                </div>
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <AlertTriangle className="h-5 w-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="pending">
          <TabsList>
            <TabsTrigger value="pending" className="gap-2">
              <Clock className="h-4 w-4" />
              Pending ({pendingReviews.length})
            </TabsTrigger>
            <TabsTrigger value="completed" className="gap-2">
              <CheckCircle2 className="h-4 w-4" />
              Completed ({completedReviews.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="mt-4">
            <div className="grid gap-4">
              {pendingReviews.map((review, index) => (
                <Card
                  key={review.id}
                  className="data-card animate-slide-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-12 w-12">
                          <AvatarFallback className="bg-primary/10 text-primary">
                            {getInitials(review.developer)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold">{review.developer}</h3>
                          <p className="text-sm text-muted-foreground">
                            {review.project} · {review.sprint}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Submitted: {review.submittedAt}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">Score</p>
                          <p className={`text-2xl font-bold ${getScoreColor(review.avgScore)}`}>
                            {review.avgScore.toFixed(1)}
                          </p>
                        </div>
                        <Button
                          onClick={() => setSelectedReview(review)}
                          className="gap-2"
                        >
                          <Eye className="h-4 w-4" />
                          Review
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {pendingReviews.length === 0 && (
                <div className="text-center py-12">
                  <CheckCircle2 className="h-12 w-12 text-success mx-auto mb-4" />
                  <h3 className="text-lg font-medium">All caught up!</h3>
                  <p className="text-muted-foreground">No pending reviews at the moment.</p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="completed" className="mt-4">
            <div className="grid gap-4">
              {completedReviews.map((review, index) => (
                <Card
                  key={review.id}
                  className="data-card opacity-75"
                >
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-12 w-12">
                          <AvatarFallback className="bg-muted text-muted-foreground">
                            {getInitials(review.developer)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold">{review.developer}</h3>
                          <p className="text-sm text-muted-foreground">
                            {review.project} · {review.sprint}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <Badge variant="success">Approved</Badge>
                        <span className={`text-lg font-bold ${getScoreColor(review.avgScore)}`}>
                          {review.avgScore.toFixed(1)}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Review Dialog */}
        <Dialog open={!!selectedReview} onOpenChange={() => setSelectedReview(null)}>
          <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Review Clarity Score</DialogTitle>
              <DialogDescription>
                {selectedReview?.developer} · {selectedReview?.project} · {selectedReview?.sprint}
              </DialogDescription>
            </DialogHeader>

            {selectedReview && (
              <div className="space-y-6 py-4">
                {/* Average Score */}
                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Average Clarity Score</p>
                  </div>
                  <div className={`text-4xl font-bold ${getScoreColor(selectedReview.avgScore)}`}>
                    {selectedReview.avgScore.toFixed(1)}
                  </div>
                </div>

                {/* Score Breakdown */}
                <div className="space-y-4">
                  <h4 className="font-medium">Score Breakdown</h4>
                  {selectedReview.scores.map((score) => (
                    <div key={score.category} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">{score.category}</span>
                        <span className={`font-semibold ${getScoreColor(score.value)}`}>
                          {score.value}/10
                        </span>
                      </div>
                      <Progress value={score.value * 10} className={`h-2 ${getScoreBg(score.value)}`} />
                    </div>
                  ))}
                </div>

                {/* Developer Comments */}
                <div className="space-y-2">
                  <h4 className="font-medium">Developer Comments</h4>
                  <p className="text-sm text-muted-foreground p-3 rounded-lg bg-muted/30">
                    {selectedReview.comments}
                  </p>
                </div>

                {/* Rejection Reason */}
                <div className="space-y-2">
                  <h4 className="font-medium">Rejection Reason (if applicable)</h4>
                  <Textarea
                    placeholder="Provide feedback if rejecting this submission..."
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                    rows={3}
                  />
                </div>
              </div>
            )}

            <DialogFooter className="gap-2">
              <Button variant="destructive" onClick={handleReject}>
                <XCircle className="mr-2 h-4 w-4" />
                Reject
              </Button>
              <Button variant="success" onClick={handleApprove}>
                <CheckCircle2 className="mr-2 h-4 w-4" />
                Approve
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}
