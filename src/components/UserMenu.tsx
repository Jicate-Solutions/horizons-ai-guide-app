import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { User, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

const UserMenu = () => {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const [displayName, setDisplayName] = useState<string>('');

  useEffect(() => {
    if (!user) return;
    const fetchName = async () => {
      // 1. Check profiles table
      const { data: profile } = await supabase
        .from('profiles')
        .select('display_name')
        .eq('user_id', user.id)
        .maybeSingle();
      if (profile?.display_name) { setDisplayName(profile.display_name); return; }

      // 2. Check user_metadata
      if (user.user_metadata?.full_name) { setDisplayName(user.user_metadata.full_name); return; }

      // 3. Check registration tables
      const { data: reg12 } = await (supabase
        .from('registrations_12th_learners') as any)
        .select('full_name')
        .eq('email', user.email)
        .maybeSingle();
      if (reg12?.full_name) { setDisplayName(reg12.full_name); return; }

      const { data: regLearner } = await (supabase
        .from('registrations_learners') as any)
        .select('full_name')
        .eq('email', user.email)
        .maybeSingle();
      if (regLearner?.full_name) { setDisplayName(regLearner.full_name); return; }

      // 4. Fallback: capitalize email username
      if (user.email) {
        const name = user.email.split('@')[0];
        setDisplayName(name.charAt(0).toUpperCase() + name.slice(1));
      }
    };
    fetchName();
  }, [user]);

  const handleSignOut = async () => {
    await signOut();
    toast({
      title: "Signed Out",
      description: "You have been successfully signed out.",
    });
  };

  if (!user) {
    return (
      <Link to="/auth">
        <Button variant="outline" size="sm" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
          Sign In
        </Button>
      </Link>
    );
  }

  const initials = displayName
    ? displayName.split(' ').map(w => w[0]).join('').substring(0, 2).toUpperCase()
    : user.email?.substring(0, 2).toUpperCase() || 'U';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-secondary text-secondary-foreground text-xs">
              {initials}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            {displayName && <p className="font-semibold text-sm text-foreground">{displayName}</p>}
            <p className="text-xs text-muted-foreground">{user.email}</p>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer">
          <User className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-destructive focus:text-destructive">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sign Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
