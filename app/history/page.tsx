'use client'
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { ArrowLeft, Trash2, Download, Flame, Calendar } from 'lucide-react';
import supabase from '@/config/supabaseClient';

interface Submission {
    id: string;
    user_id: string;
    challenge_id: number;
    challenge_title: string;
    file_url: string;
    file_type: string;
    duration?: number; // in seconds for audio/video
    created_at: string;
}

interface StreakInfo {
    currentStreak: number;
    longestStreak: number;
    lastSubmissionDate: string | null;
    streakDays: string[];
}

export default function HistoryPage() {
    const [submissions, setSubmissions] = useState<Submission[]>([]);
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState<string>('');
    const [deleting, setDeleting] = useState<string | null>(null);
    const [streakInfo, setStreakInfo] = useState<StreakInfo>({
        currentStreak: 0,
        longestStreak: 0,
        lastSubmissionDate: null,
        streakDays: [],
    });

    useEffect(() => {
        const id = localStorage.getItem('userId');
        if (!id) {
            setLoading(false);
            return;
        }
        setUserId(id);
        fetchSubmissions(id);
    }, []);

    const fetchSubmissions = async (id: string) => {
        try {
            const { data, error } = await supabase
                .from('submissions')
                .select('*')
                .eq('user_id', id)
                .order('created_at', { ascending: false });

            if (error) throw error;
            const submissionsData = data || [];
            
            // Fetch durations for audio/video files
            const enhancedSubmissions = await Promise.all(
                submissionsData.map(async (submission) => {
                    let duration: number | undefined;
                    if (submission.file_type === 'video' || submission.file_type === 'audio') {
                        duration = await getMediaDuration(submission.file_url, submission.file_type);
                    }
                    return { ...submission, duration };
                })
            );

            setSubmissions(enhancedSubmissions);
            calculateStreak(enhancedSubmissions);
        } catch (error) {
            console.error('Error fetching submissions:', error);
        } finally {
            setLoading(false);
        }
    };

    const getMediaDuration = (url: string, type: string): Promise<number> => {
        return new Promise((resolve) => {
            const element = type === 'video' 
                ? document.createElement('video') 
                : document.createElement('audio');
            
            element.addEventListener('loadedmetadata', () => {
                resolve(Math.round(element.duration));
            });
            
            element.addEventListener('error', () => {
                resolve(0);
            });
            
            element.src = url;
        });
    };

    const calculateStreak = (submissionsData: Submission[]) => {
        if (submissionsData.length === 0) {
            setStreakInfo({
                currentStreak: 0,
                longestStreak: 0,
                lastSubmissionDate: null,
                streakDays: [],
            });
            return;
        }

        // Get unique dates of submissions
        const uniqueDates = new Set<string>();
        const sortedByDate = [...submissionsData].sort(
            (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );

        sortedByDate.forEach((submission) => {
            const date = new Date(submission.created_at);
            const dateStr = date.toISOString().split('T')[0]; // YYYY-MM-DD
            uniqueDates.add(dateStr);
        });

        const dateArray = Array.from(uniqueDates).sort().reverse(); // Most recent first
        const streakDays = dateArray;

        // Calculate current streak
        let currentStreak = 0;
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        let checkDate = new Date(today);
        for (const dateStr of dateArray) {
            const submissionDate = new Date(dateStr);
            const timeDiff = checkDate.getTime() - submissionDate.getTime();
            const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

            if (daysDiff === 0 || daysDiff === 1) {
                currentStreak++;
                checkDate = new Date(submissionDate);
            } else {
                break;
            }
        }

        // Calculate longest streak
        let longestStreak = 1;
        let tempStreak = 1;
        for (let i = 0; i < dateArray.length - 1; i++) {
            const currentDate = new Date(dateArray[i]);
            const nextDate = new Date(dateArray[i + 1]);
            const daysDiff = Math.floor(
                (currentDate.getTime() - nextDate.getTime()) / (1000 * 60 * 60 * 24)
            );

            if (daysDiff === 1) {
                tempStreak++;
            } else {
                longestStreak = Math.max(longestStreak, tempStreak);
                tempStreak = 1;
            }
        }
        longestStreak = Math.max(longestStreak, tempStreak);

        setStreakInfo({
            currentStreak,
            longestStreak,
            lastSubmissionDate: dateArray[0] || null,
            streakDays,
        });
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this submission?')) return;

        setDeleting(id);
        try {
            const { error } = await supabase
                .from('submissions')
                .delete()
                .eq('id', id);

            if (error) throw error;
            const updatedSubmissions = submissions.filter(s => s.id !== id);
            setSubmissions(updatedSubmissions);
            calculateStreak(updatedSubmissions);
            alert('Submission deleted successfully');
        } catch (error: any) {
            alert(`Error deleting submission: ${error.message}`);
        } finally {
            setDeleting(null);
        }
    };

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const formatDuration = (seconds: number | undefined) => {
        if (!seconds) return 'Unknown';
        if (seconds < 60) return `${seconds}s`;
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}m ${secs}s`;
    };

    const getMediaPreview = (submission: Submission) => {
        if (submission.file_type === 'image') {
            return (
                <img
                    src={submission.file_url}
                    alt={submission.challenge_title}
                    className="w-full h-40 object-cover rounded-lg"
                />
            );
        } else if (submission.file_type === 'video') {
            return (
                <video
                    src={submission.file_url}
                    controls
                    className="w-full h-40 bg-black rounded-lg"
                />
            );
        } else if (submission.file_type === 'audio') {
            return (
                <audio
                    src={submission.file_url}
                    controls
                    className="w-full"
                />
            );
        }
        return null;
    };

    const renderStreakCalendar = () => {
        const today = new Date();
        const days = [];
        
        // Get last 42 days (6 weeks)
        for (let i = 41; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);
            const dateStr = date.toISOString().split('T')[0];
            days.push({
                date: dateStr,
                submitted: streakInfo.streakDays.includes(dateStr),
                label: date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
            });
        }

        return (
            <div className="grid grid-cols-7 gap-2">
                {days.map((day, index) => (
                    <div key={index} className="flex flex-col items-center">
                        {index % 7 === 0 && (
                            <p className="text-xs text-muted-foreground mb-1">
                                {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}
                            </p>
                        )}
                        <div
                            className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-semibold transition-all ${
                                day.submitted
                                    ? 'bg-accent text-accent-foreground'
                                    : 'bg-secondary text-muted-foreground'
                            } hover:scale-110`}
                            title={day.label}
                        >
                            {new Date(day.date).getDate()}
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    if (!userId) {
        return (
            <div className="container mx-auto py-12 text-center">
                <h1 className="text-2xl font-bold mb-4">No User Found</h1>
                <p className="text-muted-foreground mb-6">
                    You haven't submitted any challenges yet.
                </p>
                <Link href="/challenges">
                    <Button>Start a Challenge</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-background to-secondary/5">
            <div className="container mx-auto py-12 px-4">
                {/* Back button */}
                <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Home
                </Link>

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold mb-4">Your Challenge History</h1>
                    <p className="text-lg text-muted-foreground">
                        View all your submitted challenges and track your creative streak.
                    </p>
                    <div className="mt-4 p-3 bg-secondary rounded-lg">
                        <p className="text-sm">
                            <span className="font-semibold">Your User ID:</span>
                            <br />
                            <code className="text-xs bg-background rounded px-2 py-1 mt-1 inline-block">{userId}</code>
                        </p>
                    </div>
                </div>

                {/* Streak Section */}
                {submissions.length > 0 && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                        {/* Current Streak Card */}
                        <Card className="bg-gradient-to-br from-accent/10 to-accent/5 border-accent/30">
                            <CardContent className="pt-6">
                                <div className="flex items-center gap-4">
                                    <div className="text-5xl">🔥</div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">Current Streak</p>
                                        <p className="text-4xl font-bold text-accent">{streakInfo.currentStreak}</p>
                                        <p className="text-xs text-muted-foreground mt-1">days in a row</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Longest Streak Card */}
                        <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/30">
                            <CardContent className="pt-6">
                                <div className="flex items-center gap-4">
                                    <div className="text-5xl">⭐</div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">Longest Streak</p>
                                        <p className="text-4xl font-bold text-primary">{streakInfo.longestStreak}</p>
                                        <p className="text-xs text-muted-foreground mt-1">days</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Total Submissions Card */}
                        <Card className="bg-gradient-to-br from-secondary to-secondary/5 border-secondary/30">
                            <CardContent className="pt-6">
                                <div className="flex items-center gap-4">
                                    <div className="text-5xl">📊</div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">Total Submissions</p>
                                        <p className="text-4xl font-bold">{submissions.length}</p>
                                        <p className="text-xs text-muted-foreground mt-1">challenges completed</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}

                {/* Streak Calendar */}
                {submissions.length > 0 && (
                    <Card className="mb-8">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Calendar className="w-5 h-5" />
                                Activity Calendar (Last 6 Weeks)
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {renderStreakCalendar()}
                            <p className="text-xs text-muted-foreground mt-4 text-center">
                                🟨 = Submitted • 🔲 = No submission
                            </p>
                        </CardContent>
                    </Card>
                )}

                {/* Submissions Grid */}
                {loading ? (
                    <div className="text-center py-12">
                        <p className="text-muted-foreground">Loading your submissions...</p>
                    </div>
                ) : submissions.length === 0 ? (
                    <Card>
                        <CardContent className="py-12 text-center">
                            <p className="text-muted-foreground mb-6">
                                You haven't submitted any challenges yet. Start creating!
                            </p>
                            <Link href="/challenges">
                                <Button>Start a Challenge</Button>
                            </Link>
                        </CardContent>
                    </Card>
                ) : (
                    <div>
                        <h2 className="text-2xl font-bold mb-6">Recent Submissions</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {submissions.map((submission) => (
                                <Card key={submission.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                                    <CardHeader className="pb-2">
                                        <CardTitle className="text-base">{submission.challenge_title}</CardTitle>
                                        <p className="text-xs text-muted-foreground mt-2">
                                            {formatDate(submission.created_at)}
                                        </p>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        {/* Media Preview */}
                                        <div className="bg-secondary rounded-lg overflow-hidden">
                                            {getMediaPreview(submission)}
                                        </div>

                                        {/* File Info with Duration */}
                                        <div className="text-xs text-muted-foreground space-y-1">
                                            <p>
                                                <span className="font-semibold">Type:</span> {submission.file_type.charAt(0).toUpperCase() + submission.file_type.slice(1)}
                                            </p>
                                            {(submission.file_type === 'audio' || submission.file_type === 'video') && (
                                                <p>
                                                    <span className="font-semibold">Duration:</span> {formatDuration(submission.duration)}
                                                </p>
                                            )}
                                        </div>

                                        {/* Actions */}
                                        <div className="flex gap-2">
                                            <a
                                                href={submission.file_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex-1"
                                            >
                                                <Button variant="outline" size="sm" className="w-full gap-2">
                                                    <Download className="w-4 h-4" />
                                                    Download
                                                </Button>
                                            </a>
                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                onClick={() => handleDelete(submission.id)}
                                                disabled={deleting === submission.id}
                                                className="gap-2"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                                {deleting === submission.id ? 'Deleting...' : 'Delete'}
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                )}

                {/* Detailed Stats */}
                {submissions.length > 0 && (
                    <Card className="mt-8">
                        <CardHeader>
                            <CardTitle>Detailed Statistics</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="bg-secondary rounded-lg p-4 text-center">
                                    <p className="text-2xl font-bold text-primary">{submissions.length}</p>
                                    <p className="text-xs text-muted-foreground mt-1">Total Submissions</p>
                                </div>
                                <div className="bg-secondary rounded-lg p-4 text-center">
                                    <p className="text-2xl font-bold text-accent">
                                        {submissions.filter(s => s.file_type === 'video').length}
                                    </p>
                                    <p className="text-xs text-muted-foreground mt-1">Videos</p>
                                </div>
                                <div className="bg-secondary rounded-lg p-4 text-center">
                                    <p className="text-2xl font-bold text-secondary">
                                        {submissions.filter(s => s.file_type === 'image').length}
                                    </p>
                                    <p className="text-xs text-muted-foreground mt-1">Images</p>
                                </div>
                                <div className="bg-secondary rounded-lg p-4 text-center">
                                    <p className="text-2xl font-bold text-primary">
                                        {submissions.filter(s => s.file_type === 'audio').length}
                                    </p>
                                    <p className="text-xs text-muted-foreground mt-1">Audio</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
}