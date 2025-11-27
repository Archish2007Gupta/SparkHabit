'use client'
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function LogInButton() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        const currentUser = localStorage.getItem('currentUser');
        setIsLoggedIn(!!currentUser);
    }, []);

    // Don't render anything until mounted to prevent hydration mismatch
    if (!isMounted) {
        return (
            <div className="flex items-center gap-3">
                <div className="h-10 w-20 bg-secondary rounded-md animate-pulse" />
                <div className="h-10 w-20 bg-secondary rounded-md animate-pulse" />
            </div>
        );
    }

    if (isLoggedIn) {
        return (
            <Link href="/challenges">
                <Button size="sm">
                    Start Challenge
                </Button>
            </Link>
        );
    }

    return (
        <>
            <Link href="/login">
                <Button variant="outline" size="sm">
                    Log in
                </Button>
            </Link>
            <Link href="/login">
                <Button size="sm">Get Started</Button>
            </Link>
        </>
    );
}