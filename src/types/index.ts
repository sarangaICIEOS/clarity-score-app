export type UserRole = 'admin' | 'developer' | 'reporter' | 'ba';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  createdAt: Date;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  sprintStartDay: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday';
  sprintType: '1-week' | '2-week' | '3-week' | '4-week';
  developers: string[];
  reporterId: string;
  baId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Sprint {
  id: string;
  projectId: string;
  name: string;
  startDate: Date;
  endDate: Date;
  status: 'active' | 'completed' | 'upcoming';
}

export interface ClarityScore {
  id: string;
  sprintId: string;
  projectId: string;
  developerId: string;
  status: 'draft' | 'submitted' | 'reporter_approved' | 'ba_approved' | 'rejected';
  
  // Scoring categories
  documentationClarity: number;
  technicalRequirements: number;
  acceptanceCriteria: number;
  uiUxClarity: number;
  dependencyClarity: number;
  timeEstimation: number;
  communicationQuality: number;
  
  averageScore: number;
  comments: string;
  
  submittedAt?: Date;
  reporterApprovedAt?: Date;
  baApprovedAt?: Date;
  rejectionReason?: string;
  
  createdAt: Date;
  updatedAt: Date;
}

export interface ProjectRole {
  userId: string;
  projectId: string;
  role: 'developer' | 'reporter' | 'ba';
}
