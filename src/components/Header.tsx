import { useState } from "react";
import { Shirt, User, Crown, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { AuthModal } from "@/components/auth/AuthModal";
import { UserDashboard } from "@/components/auth/UserDashboard";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export const Header = () => {
  const { user, profile, signOut, isPremium } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showUserDashboard, setShowUserDashboard] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    setShowUserDashboard(false);
  };

  return (
    <header className="bg-gradient-primary text-primary-foreground shadow-lg">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/10 rounded-lg">
              <Shirt className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">DotStitch</h1>
              <p className="text-primary-foreground/70 text-sm">Professional Customization</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-3">
                {isPremium && (
                  <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0">
                    <Crown className="w-3 h-3 mr-1" />
                    Premium
                  </Badge>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowUserDashboard(true)}
                  className="text-primary-foreground hover:bg-white/10"
                >
                  <User className="w-4 h-4 mr-2" />
                  {profile?.full_name || 'Account'}
                </Button>
              </div>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAuthModal(true)}
                className="text-primary-foreground hover:bg-white/10"
              >
                <User className="w-4 h-4 mr-2" />
                Sign In
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />

      {/* User Dashboard Modal */}
      <Dialog open={showUserDashboard} onOpenChange={setShowUserDashboard}>
        <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Account Dashboard</DialogTitle>
          </DialogHeader>
          <UserDashboard onClose={() => setShowUserDashboard(false)} />
        </DialogContent>
      </Dialog>
    </header>
  );
};