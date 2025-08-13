import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { SignInButton, SignUpButton } from "@/lib/clerk";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="text-center mb-8">
            <div className="bg-black text-white w-16 h-16 rounded-lg flex items-center justify-center font-poppins font-bold text-2xl mx-auto mb-4">
              SH
            </div>
            <DialogTitle className="font-poppins font-bold text-2xl mb-2">
              Welcome to Stylish Hub
            </DialogTitle>
            <p className="text-accent">Join our fashion community</p>
          </div>
        </DialogHeader>
        
        <div className="space-y-4">
          <SignInButton mode="modal">
            <Button className="w-full bg-black text-white hover:bg-accent transition-colors">
              Sign In
            </Button>
          </SignInButton>
          
          <SignUpButton mode="modal">
            <Button variant="outline" className="w-full">
              Create Account
            </Button>
          </SignUpButton>
        </div>
        
        <div className="text-center mt-6">
          <p className="text-sm text-accent">
            By continuing, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
