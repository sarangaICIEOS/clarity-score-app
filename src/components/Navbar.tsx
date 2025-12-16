import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const { logout } = useAuth();

  return (
    <nav className="border-b bg-background">
      <div className="flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-8">
          <Link to="/dashboard" className="font-semibold">
            Clarity Score
          </Link>
          <div className="flex gap-4">
            <Link to="/dashboard" className="text-sm hover:text-primary">
              Dashboard
            </Link>
            <Link to="/projects" className="text-sm hover:text-primary">
              Projects
            </Link>
            <Link to="/clarity-scores" className="text-sm hover:text-primary">
              Scores
            </Link>
            <Link to="/reviews" className="text-sm hover:text-primary">
              Reviews
            </Link>
            <Link to="/reports" className="text-sm hover:text-primary">
              Reports
            </Link>
            <Link to="/users" className="text-sm hover:text-primary">
              Users
            </Link>
            <Link to="/settings" className="text-sm hover:text-primary">
              Settings
            </Link>
          </div>
        </div>
        <Button variant="outline" onClick={logout}>
          Logout
        </Button>
      </div>
    </nav>
  );
}
