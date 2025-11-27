'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react';

interface User {
    id: string;
    email: string;
    username: string;
    password: string;
    createdAt: string;
}

export default function LoginPage() {
    const router = useRouter();
    const [isSignUp, setIsSignUp] = useState(false);
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState<User[]>([]);

    // Load users from localStorage on mount
    useEffect(() => {
        const storedUsers = localStorage.getItem('users');
        if (storedUsers) {
            setUsers(JSON.parse(storedUsers));
        }
        // Don't auto-redirect - let user stay on login page
    }, []);

    const validateEmail = (email: string) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        // Validation
        if (!email || !username || !password || !confirmPassword) {
            setError('Please fill in all fields');
            setLoading(false);
            return;
        }

        if (!validateEmail(email)) {
            setError('Please enter a valid email address');
            setLoading(false);
            return;
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters');
            setLoading(false);
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            setLoading(false);
            return;
        }

        // Check for existing email/username
        if (users.some(u => u.email === email)) {
            setError('Email already registered');
            setLoading(false);
            return;
        }

        if (users.some(u => u.username === username)) {
            setError('Username already taken');
            setLoading(false);
            return;
        }

        // Create new user
        const newUser: User = {
            id: Math.random().toString(36).substr(2, 9),
            email,
            username,
            password,
            createdAt: new Date().toISOString(),
        };

        const updatedUsers = [...users, newUser];
        localStorage.setItem('users', JSON.stringify(updatedUsers));
        localStorage.setItem('currentUser', JSON.stringify({
            id: newUser.id,
            email: newUser.email,
            username: newUser.username,
        }));

        setSuccess('Account created successfully! You can now log in.');
        setLoading(false);
        // Clear form fields and switch to login tab
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setIsSignUp(false);
    };

    const handleLogIn = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        if (!username || !password) {
            setError('Please fill in all fields');
            setLoading(false);
            return;
        }

        // Find user by username
        const user = users.find(
            u => u.username === username && u.password === password
        );

        if (!user) {
            setError('Invalid username or password');
            setLoading(false);
            return;
        }

        localStorage.setItem('currentUser', JSON.stringify({
            id: user.id,
            email: user.email,
            username: user.username,
        }));

        setSuccess('Logged in successfully! Redirecting to home...');
        setLoading(false);
        // Redirect to home immediately after successful login
        setTimeout(() => {
            router.push('/');
        }, 1000); // 1 second delay to show success message
    };

    const useDemoAccount = () => {
        setEmail('demo@example.com');
        setPassword('password123');
        setUsername('demo');
        setIsSignUp(false);
        setError('');
        setSuccess('');
    };

    const handleSubmit = isSignUp ? handleSignUp : handleLogIn;

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-2">
                    <CardTitle className="text-2xl">
                        {isSignUp ? 'Create Account' : 'Welcome Back'}
                    </CardTitle>
                    <CardDescription>
                        {isSignUp
                            ? 'Sign up to start your daily challenges'
                            : 'Log in to continue your journey'}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Email (sign up) or Username (login) Field */}
                        {isSignUp ? (
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    disabled={loading}
                                />
                            </div>
                        ) : (
                            <div className="space-y-2">
                                <Label htmlFor="username">Username</Label>
                                <Input
                                    id="username"
                                    type="text"
                                    placeholder="your username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    disabled={loading}
                                />
                            </div>
                        )}

                        {/* Username Field (Sign Up only) */}
                        {isSignUp && (
                            <div className="space-y-2">
                                <Label htmlFor="username">Username</Label>
                                <Input
                                    id="username"
                                    type="text"
                                    placeholder="Choose a username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    disabled={loading}
                                />
                            </div>
                        )}

                        {/* Password Field */}
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    disabled={loading}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                    disabled={loading}
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-4 w-4" />
                                    ) : (
                                        <Eye className="h-4 w-4" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Confirm Password Field (Sign Up only) */}
                        {isSignUp && (
                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword">Confirm Password</Label>
                                <div className="relative">
                                    <Input
                                        id="confirmPassword"
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        placeholder="Confirm your password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        disabled={loading}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                        disabled={loading}
                                    >
                                        {showConfirmPassword ? (
                                            <EyeOff className="h-4 w-4" />
                                        ) : (
                                            <Eye className="h-4 w-4" />
                                        )}
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Error Alert */}
                        {error && (
                            <Alert variant="destructive">
                                <AlertCircle className="h-4 w-4" />
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}

                        {/* Success Alert */}
                        {success && (
                            <Alert className="border-green-500 bg-green-50">
                                <CheckCircle className="h-4 w-4 text-green-600" />
                                <AlertDescription className="text-green-600">{success}</AlertDescription>
                            </Alert>
                        )}

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            className="w-full"
                            disabled={loading}
                        >
                            {loading ? 'Loading...' : (isSignUp ? 'Sign Up' : 'Log In')}
                        </Button>

                        {/* Demo Account Button */}
                        {!isSignUp && (
                            <Button
                                type="button"
                                variant="outline"
                                className="w-full"
                                onClick={useDemoAccount}
                                disabled={loading}
                            >
                                Use Demo Account
                            </Button>
                        )}

                        {/* Toggle Sign Up / Log In */}
                        <div className="text-center text-sm">
                            <span className="text-muted-foreground">
                                {isSignUp ? 'Already have an account?' : "Don't have an account?"}
                            </span>
                            <button
                                type="button"
                                onClick={() => {
                                    setIsSignUp(!isSignUp);
                                    setError('');
                                    setSuccess('');
                                    setEmail('');
                                    setUsername('');
                                    setPassword('');
                                    setConfirmPassword('');
                                }}
                                className="ml-1 text-primary hover:underline font-medium"
                                disabled={loading}
                            >
                                {isSignUp ? 'Log In' : 'Sign Up'}
                            </button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}