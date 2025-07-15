import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface EmailCollectionProps {
  onSubmit: (email: string, firstName?: string) => void;
}

export const EmailCollection = ({ onSubmit }: EmailCollectionProps) => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    onSubmit(email, firstName);
    setIsSubmitted(true);
    setIsSubmitting(false);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-lg w-full text-center space-y-6">
          <div className="space-y-4">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
            <h1 className="text-3xl font-bold text-foreground">
              Results Sent!
            </h1>
            <p className="text-lg text-muted-foreground">
              Your IQ test results have been sent to <span className="text-primary font-semibold">{email}</span>
            </p>
            <p className="text-sm text-muted-foreground">
              Please check your inbox (and spam folder) for your detailed results and IQ score.
            </p>
          </div>
          
          <div className="iq-card">
            <h3 className="font-semibold mb-3">What's Next?</h3>
            <div className="text-left space-y-2 text-sm text-muted-foreground">
              <p>• View your detailed IQ score and analysis</p>
              <p>• Compare your results with global averages</p>
              <p>• Get personalized recommendations for cognitive improvement</p>
              <p>• Share your results with friends and family</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-lg w-full space-y-8">
        <div className="text-center space-y-4">
          <Mail className="w-12 h-12 text-primary mx-auto" />
          <h1 className="text-3xl font-bold text-foreground">
            Almost Done!
          </h1>
          <p className="text-lg text-muted-foreground">
            Enter your email to receive your detailed IQ test results
          </p>
        </div>

        <div className="iq-card">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email Address *
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.com"
                required
                className="bg-secondary border-border"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="firstName" className="text-sm font-medium">
                First Name (Optional)
              </Label>
              <Input
                id="firstName"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Enter your first name"
                className="bg-secondary border-border"
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary hover:bg-primary/90 py-3"
            >
              {isSubmitting ? 'Sending Results...' : 'Get My IQ Results'}
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-border">
            <div className="text-xs text-muted-foreground space-y-1">
              <p>✓ Your results will be sent instantly</p>
              <p>✓ No spam, just your IQ analysis</p>
              <p>✓ Your email is secure and never shared</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};