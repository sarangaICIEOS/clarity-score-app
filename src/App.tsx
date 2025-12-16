import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { ProtectedLayout } from "@/components/ProtectedLayout";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Users from "./pages/Users";
import ClarityScores from "./pages/ClarityScores";
import Reviews from "./pages/Reviews";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import Admin from "./pages/Admin";
import Developer from "./pages/Developer";
import Reporter from "./pages/Reporter";
import BA from "./pages/BA";
import ProjectDashboard from './pages/ProjectDashboard';
import SprintConfiguration from './pages/SprintConfiguration';
import ClarityScoreForm from './pages/ClarityScoreForm';

const queryClient = new QueryClient();

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="animate-pulse">
          <div className="h-12 w-12 rounded-lg bg-primary/20" />
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <ProtectedLayout>{children}</ProtectedLayout>;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/projects"
        element={
          <ProtectedRoute>
            <ProjectDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/users"
        element={
          <ProtectedRoute>
            <Users />
          </ProtectedRoute>
        }
      />
      <Route
        path="/clarity-scores"
        element={
          <ProtectedRoute>
            <ClarityScores />
          </ProtectedRoute>
        }
      />
      <Route
        path="/reviews"
        element={
          <ProtectedRoute>
            <Reviews />
          </ProtectedRoute>
        }
      />
      <Route
        path="/reports"
        element={
          <ProtectedRoute>
            <Reports />
          </ProtectedRoute>
        }
      />
      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <Admin />
          </ProtectedRoute>
        }
      />
      <Route
        path="/developer"
        element={
          <ProtectedRoute>
            <Developer />
          </ProtectedRoute>
        }
      />
      <Route
        path="/reporter"
        element={
          <ProtectedRoute>
            <Reporter />
          </ProtectedRoute>
        }
      />
      <Route
        path="/ba"
        element={
          <ProtectedRoute>
            <BA />
          </ProtectedRoute>
        }
      />
      <Route
        path="/sprint-configuration"
        element={
          <ProtectedRoute>
            <SprintConfiguration />
          </ProtectedRoute>
        }
      />
      <Route
        path="/clarity-score-form"
        element={
          <ProtectedRoute>
            <ClarityScoreForm />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
