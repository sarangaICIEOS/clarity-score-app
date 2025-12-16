// src/types/index.ts

export enum UserRole {
  ADMIN = 'ADMIN',
  DEVELOPER = 'DEVELOPER',
  REPORTER = 'REPORTER',
  BA = 'BA'
}

export enum SprintType {
  ONE_WEEK = '1_WEEK',
  TWO_WEEKS = '2_WEEKS',
  THREE_WEEKS = '3_WEEKS',
  FOUR_WEEKS = '4_WEEKS'
}

export enum SubmissionStatus {
  DRAFT = 'DRAFT',
  SUBMITTED = 'SUBMITTED',
  REPORTER_APPROVED = 'REPORTER_APPROVED',
  REPORTER_REJECTED = 'REPORTER_REJECTED',
  BA_APPROVED = 'BA_APPROVED',
  BA_REJECTED = 'BA_REJECTED'
}

export enum DayOfWeek {
  MONDAY = 'MONDAY',
  TUESDAY = 'TUESDAY',
  WEDNESDAY = 'WEDNESDAY',
  THURSDAY = 'THURSDAY',
  FRIDAY = 'FRIDAY',
  SATURDAY = 'SATURDAY',
  SUNDAY = 'SUNDAY'
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  sprintStartDay: DayOfWeek;
  sprintType: SprintType;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string; // Admin user ID
}

export interface ProjectAssignment {
  id: string;
  projectId: string;
  userId: string;
  role: UserRole; // DEVELOPER, REPORTER, or BA
  assignedAt: Date;
  assignedBy: string; // Admin user ID
}

export interface Sprint {
  id: string;
  projectId: string;
  sprintNumber: number;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
  createdAt: Date;
}

export interface ClarityScoreSubmission {
  id: string;
  sprintId: string;
  developerId: string;
  status: SubmissionStatus;
  
  // Clarity Score Fields (from Excel)
  requirementClarity: number; // 1-5
  documentationQuality: number; // 1-5
  technicalSpecificationClarity: number; // 1-5
  acceptanceCriteriaClarity: number; // 1-5
  designMockupClarity: number; // 1-5
  apiDocumentationClarity: number; // 1-5
  businessLogicClarity: number; // 1-5
  edgeCaseCoverage: number; // 1-5
  dependencyClarity: number; // 1-5
  timelineRealisticness: number; // 1-5
  
  // Calculated
  averageScore: number;
  
  // Comments
  developerComments: string;
  reporterComments?: string;
  baComments?: string;
  
  // Approval tracking
  reporterApprovedBy?: string;
  reporterApprovedAt?: Date;
  baApprovedBy?: string;
  baApprovedAt?: Date;
  
  submittedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface ClarityScoreHistory {
  id: string;
  submissionId: string;
  changeType: 'CREATED' | 'UPDATED' | 'APPROVED' | 'REJECTED';
  changedBy: string;
  changeDetails: string;
  timestamp: Date;
}

// DTOs for API requests
export interface CreateUserRequest {
  email: string;
  name: string;
  role: UserRole;
}

export interface CreateProjectRequest {
  name: string;
  description: string;
  sprintStartDay: DayOfWeek;
  sprintType: SprintType;
  developerIds: string[];
  reporterId: string;
  baId: string;
}

export interface UpdateProjectRequest {
  name?: string;
  description?: string;
  sprintStartDay?: DayOfWeek;
  sprintType?: SprintType;
}

export interface SubmitClarityScoreRequest {
  requirementClarity: number;
  documentationQuality: number;
  technicalSpecificationClarity: number;
  acceptanceCriteriaClarity: number;
  designMockupClarity: number;
  apiDocumentationClarity: number;
  businessLogicClarity: number;
  edgeCaseCoverage: number;
  dependencyClarity: number;
  timelineRealisticness: number;
  developerComments: string;
}

export interface ApproveRejectRequest {
  comments: string;
  action: 'APPROVE' | 'REJECT';
}

// View Models
export interface ProjectWithAssignments extends Project {
  developers: User[];
  reporter: User;
  ba: User;
  currentSprint?: Sprint;
}

export interface DashboardStats {
  totalProjects: number;
  activeProjects: number;
  totalDevelopers: number;
  averageClarityScore: number;
  pendingApprovals: number;
}

export interface DeveloperDashboard {
  assignedProjects: ProjectWithAssignments[];
  pendingSubmissions: Sprint[];
  recentSubmissions: ClarityScoreSubmission[];
}

export interface ReporterDashboard {
  assignedProjects: ProjectWithAssignments[];
  pendingReviews: ClarityScoreSubmission[];
  recentReviews: ClarityScoreSubmission[];
}

export interface AdminDashboard extends DashboardStats {
  recentProjects: Project[];
  recentUsers: User[];
  clarityTrends: {
    date: string;
    averageScore: number;
  }[];
}