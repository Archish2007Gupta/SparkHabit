
'use client'
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Zap } from "lucide-react";

const challenges = [
    {
        id: 1,
        title: "Record a 1-Minute Video",
        description: "Capture your creative moment on video. Record yourself doing something artistic or fun.",
        type: "video",
        duration: "1 minute",
        emoji: "🎥",
    },
    {
        id: 2,
        title: "Upload a Photo",
        description: "Share a snapshot that inspires you. Show us what catches your eye.",
        type: "image",
        duration: "unlimited",
        emoji: "📸",
    },
    {
        id: 3,
        title: "Record an Audio Clip",
        description: "Record your voice singing, speaking, or creating sound. 30-second minimum.",
        type: "audio",
        duration: "30 seconds",
        emoji: "🎤",
    },
    {
        id: 4,
        title: "Short Video Submission",
        description: "Quick 15-second video showcasing your creativity.",
        type: "video",
        duration: "15 seconds",
        emoji: "📹",
    },
    {
        id: 5,
        title: "Photo Series",
        description: "Upload 3-5 related photos telling a story.",
        type: "image",
        duration: "multiple",
        emoji: "🖼️",
    },
    {
        id: 6,
        title: "Music/Sound Recording",
        description: "Record yourself playing an instrument or creating a beat.",
        type: "audio",
        duration: "1 minute",
        emoji: "🎵",
    },
];

export default function ChallengesPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-background to-secondary/5">
            <div className="container mx-auto py-12 px-4">
                {/* Header */}
                <div className="mb-12">
                    <div className="flex items-center gap-2 mb-4">
                        <Zap className="w-6 h-6 text-accent" />
                        <span className="text-sm font-semibold text-accent uppercase tracking-wider">
                            Daily Creative Challenges
                        </span>
                    </div>
                    <h1 className="text-5xl font-bold mb-4">Choose Your Challenge</h1>
                    <p className="text-xl text-muted-foreground max-w-2xl">
                        Pick a challenge that excites you. Record or upload your entry, and build your creative habit one day at a time.
                    </p>
                </div>

                {/* Challenges Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {challenges.map((challenge) => (
                        <Card
                            key={challenge.id}
                            className="group hover:shadow-lg transition-all duration-300 overflow-hidden"
                        >
                            <CardHeader className="pb-3">
                                <div className="text-5xl mb-3">{challenge.emoji}</div>
                                <CardTitle className="text-xl">{challenge.title}</CardTitle>
                                <div className="text-sm text-muted-foreground mt-2">
                                    ⏱️ {challenge.duration}
                                </div>
                            </CardHeader>
                            <CardContent className="flex flex-col space-y-4">
                                <p className="text-sm text-muted-foreground">
                                    {challenge.description}
                                </p>
                                <Link href={`/challenges/${challenge.id}`} className="w-full mt-auto">
                                    <Button
                                        className="w-full rounded-full font-semibold"
                                        size="lg"
                                    >
                                        Start Challenge
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
