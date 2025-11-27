'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { LogOut, User, History, Settings } from 'lucide-react';
import Link from 'next/link';

export function UserMenu() {
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        const currentUser = localStorage.getItem('currentUser');
        if (currentUser) {
            try {
                setUser(JSON.parse(currentUser));
            } catch (error) {
                console.error('Error parsing user:', error);
            }
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('userId');
        router.push('/login');
    };

    // Don't render anything until mounted to prevent hydration mismatch
    if (!isMounted || !user) {
        return null;
    }

    const initials = (user.username || user.email)
        .split(' ')
        .map((n: string) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                            {initials}
                        </AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
                {/* User Info */}
                <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                        <p className="font-medium text-sm">{user.username}</p>
                        <p className="w-full truncate text-xs text-muted-foreground">{user.email}</p>
                    </div>
                </div>
                <DropdownMenuSeparator />

                {/* Menu Items */}
                <Link href="/history">
                    <DropdownMenuItem className="cursor-pointer">
                        <History className="mr-2 h-4 w-4" />
                        <span>View History</span>
                    </DropdownMenuItem>
                </Link>

                <Link href="/challenges">
                    <DropdownMenuItem className="cursor-pointer">
                        <User className="mr-2 h-4 w-4" />
                        <span>Challenges</span>
                    </DropdownMenuItem>
                </Link>

                <DropdownMenuSeparator />

                {/* Logout */}
                <DropdownMenuItem
                    onClick={handleLogout}
                    className="text-destructive cursor-pointer focus:bg-destructive/10 focus:text-destructive"
                >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log Out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}