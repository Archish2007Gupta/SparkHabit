'use client'
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState, useRef, useEffect } from "react";
import supabase from "@/config/supabaseClient";
import Link from "next/link";
import { ArrowLeft, Upload, Mic, Video, StopCircle, Play, Trash2 } from "lucide-react";
import { useParams } from "next/navigation";

const challenges = [
    { id: 1, title: "Record a 1-Minute Video", type: "video", emoji: "🎥" },
    { id: 2, title: "Upload a Photo", type: "image", emoji: "📸" },
    { id: 3, title: "Record an Audio Clip", type: "audio", emoji: "🎤" },
    { id: 4, title: "Short Video Submission", type: "video", emoji: "📹" },
    { id: 5, title: "Photo Series", type: "image", emoji: "🖼️" },
    { id: 6, title: "Music/Sound Recording", type: "audio", emoji: "🎵" },
];

export default function ChallengeDetailPage() {
    const params = useParams();
    const challengeId = parseInt(params?.id as string);
    const challenge = challenges.find(c => c.id === challengeId);

    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [recordingAudio, setRecordingAudio] = useState(false);
    const [recordingVideo, setRecordingVideo] = useState(false);
    const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
    const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
    const [videoBlob, setVideoBlob] = useState<Blob | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const audioRef = useRef<HTMLAudioElement>(null);
    const streamRef = useRef<MediaStream | null>(null);

    // Generate unique user ID (stored in localStorage)
    const [userId, setUserId] = useState<string>("");
    useEffect(() => {
        let id = localStorage.getItem("userId");
        if (!id) {
            id = `user_${Math.random().toString(36).substring(2, 15)}`;
            localStorage.setItem("userId", id);
        }
        setUserId(id);
    }, []);

    // Handle file selection
    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
            setPreview(URL.createObjectURL(selectedFile));
            setAudioBlob(null);
            setVideoBlob(null);
        }
    };

    // Start audio recording
    const startAudioRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            streamRef.current = stream;
            const recorder = new MediaRecorder(stream);
            const chunks: Blob[] = [];

            recorder.ondataavailable = (e) => chunks.push(e.data);
            recorder.onstop = () => {
                const blob = new Blob(chunks, { type: "audio/webm" });
                setAudioBlob(blob);
                setFile(null);
                setVideoBlob(null);
                if (audioRef.current) {
                    audioRef.current.src = URL.createObjectURL(blob);
                }
            };

            recorder.start();
            setMediaRecorder(recorder);
            setRecordingAudio(true);
        } catch (error) {
            alert("Unable to access microphone. Please check permissions.");
        }
    };

    const stopAudioRecording = () => {
        if (mediaRecorder) {
            mediaRecorder.stop();
            streamRef.current?.getTracks().forEach(track => track.stop());
            setRecordingAudio(false);
        }
    };

    // Start video recording
    const startVideoRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            streamRef.current = stream;
            const recorder = new MediaRecorder(stream);
            const chunks: Blob[] = [];

            recorder.ondataavailable = (e) => chunks.push(e.data);
            recorder.onstop = () => {
                const blob = new Blob(chunks, { type: "video/webm" });
                setVideoBlob(blob);
                setFile(null);
                setAudioBlob(null);
                if (videoRef.current) {
                    videoRef.current.src = URL.createObjectURL(blob);
                }
            };

            recorder.start();
            setMediaRecorder(recorder);
            setRecordingVideo(true);

            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
        } catch (error) {
            alert("Unable to access camera. Please check permissions.");
        }
    };

    const stopVideoRecording = () => {
        if (mediaRecorder) {
            mediaRecorder.stop();
            streamRef.current?.getTracks().forEach(track => track.stop());
            setRecordingVideo(false);
        }
        if (videoRef.current) {
            videoRef.current.srcObject = null;
        }
    };

    // Upload file/blob to Supabase
    const handleUpload = async () => {
        if (!file && !audioBlob && !videoBlob) {
            alert("Please select or record a file.");
            return;
        }

        setUploading(true);
        try {
            const fileToUpload = file || audioBlob || videoBlob;
            if (!fileToUpload) throw new Error("No file to upload");

            const fileExt = file 
                ? file.name.split(".").pop() 
                : challenge?.type === "audio" 
                ? "webm" 
                : "webm";
            
            const fileName = `${userId}/${challenge?.title.replace(/\s+/g, '_')}_${Date.now()}.${fileExt}`;

            // Upload to Supabase Storage
            const { error: uploadError } = await supabase.storage
                .from('challenges')
                .upload(fileName, fileToUpload);

            if (uploadError) throw uploadError;

            // Get public URL
            const { data: urlData } = supabase.storage
                .from('challenges')
                .getPublicUrl(fileName);

            // Save to database
            const { error: insertError } = await supabase
                .from('submissions')
                .insert([{
                    user_id: userId,
                    challenge_id: challengeId,
                    challenge_title: challenge?.title,
                    file_url: urlData?.publicUrl,
                    file_type: challenge?.type,
                    created_at: new Date().toISOString(),
                }]);

            if (insertError) throw insertError;

            alert("✅ Challenge submitted successfully!");
            setFile(null);
            setAudioBlob(null);
            setVideoBlob(null);
            setPreview(null);
        } catch (error: any) {
            console.error("Upload error:", error);
            alert(`Error: ${error.message}`);
        } finally {
            setUploading(false);
        }
    };

    if (!challenge) {
        return (
            <div className="container mx-auto py-12 text-center">
                <h1 className="text-2xl font-bold">Challenge not found</h1>
                <Link href="/challenges">
                    <Button className="mt-4">Back to Challenges</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-background to-secondary/5">
            <div className="container mx-auto py-12 px-4">
                {/* Back button */}
                <div className="flex items-center justify-between mb-8">
                    <Link href="/challenges" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Challenges
                    </Link>
                    <Link href="/history">
                        <Button variant="outline">View History</Button>
                    </Link>
                </div>

                {/* Challenge Header */}
                <div className="mb-8">
                    <div className="text-6xl mb-4">{challenge.emoji}</div>
                    <h1 className="text-4xl font-bold mb-4">{challenge.title}</h1>
                    <p className="text-lg text-muted-foreground">
                        Submit your creative work below. No authentication needed—just create and share!
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Upload/Record Card */}
                    <Card className="h-fit">
                        <CardHeader>
                            <CardTitle>Submit Your Entry</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* File Upload */}
                            {challenge.type !== "audio" && challenge.type !== "video" && (
                                <div className="space-y-4">
                                    <label className="block">
                                        <div className="border-2 border-dashed border-muted-foreground rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-colors">
                                            <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                                            <p className="font-semibold">Click to upload or drag and drop</p>
                                            <p className="text-sm text-muted-foreground">{challenge.type === "image" ? "PNG, JPG, GIF" : "Any file"}</p>
                                        </div>
                                        <input
                                            type="file"
                                            accept={challenge.type === "image" ? "image/*" : "*"}
                                            onChange={handleFileSelect}
                                            className="hidden"
                                        />
                                    </label>
                                </div>
                            )}

                            {/* Audio Recording */}
                            {challenge.type === "audio" && (
                                <div className="space-y-4">
                                    {!audioBlob && !recordingAudio && (
                                        <Button
                                            onClick={startAudioRecording}
                                            className="w-full gap-2"
                                            size="lg"
                                        >
                                            <Mic className="w-5 h-5" />
                                            Start Recording
                                        </Button>
                                    )}

                                    {recordingAudio && (
                                        <Button
                                            onClick={stopAudioRecording}
                                            variant="destructive"
                                            className="w-full gap-2"
                                            size="lg"
                                        >
                                            <StopCircle className="w-5 h-5" />
                                            Stop Recording
                                        </Button>
                                    )}

                                    {audioBlob && (
                                        <div className="space-y-3 bg-secondary p-4 rounded-lg">
                                            <p className="font-semibold text-sm">Recording ready:</p>
                                            <audio
                                                ref={audioRef}
                                                controls
                                                className="w-full"
                                            />
                                            <Button
                                                onClick={stopAudioRecording}
                                                variant="outline"
                                                className="w-full gap-2"
                                                size="sm"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                                Clear Recording
                                            </Button>
                                        </div>
                                    )}

                                    <div className="text-sm text-muted-foreground text-center">
                                        Or upload an audio file:
                                    </div>
                                    <label className="block">
                                        <div className="border-2 border-dashed border-muted-foreground rounded-lg p-6 text-center cursor-pointer hover:border-primary transition-colors">
                                            <Upload className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
                                            <p className="text-sm">Upload audio file</p>
                                        </div>
                                        <input
                                            type="file"
                                            accept="audio/*"
                                            onChange={handleFileSelect}
                                            className="hidden"
                                        />
                                    </label>
                                </div>
                            )}

                            {/* Video Recording */}
                            {challenge.type === "video" && (
                                <div className="space-y-4">
                                    {!videoBlob && !recordingVideo && (
                                        <Button
                                            onClick={startVideoRecording}
                                            className="w-full gap-2"
                                            size="lg"
                                        >
                                            <Video className="w-5 h-5" />
                                            Start Recording
                                        </Button>
                                    )}

                                    {recordingVideo && (
                                        <>
                                            <video
                                                ref={videoRef}
                                                autoPlay
                                                className="w-full bg-black rounded-lg"
                                            />
                                            <Button
                                                onClick={stopVideoRecording}
                                                variant="destructive"
                                                className="w-full gap-2"
                                                size="lg"
                                            >
                                                <StopCircle className="w-5 h-5" />
                                                Stop Recording
                                            </Button>
                                        </>
                                    )}

                                    {videoBlob && (
                                        <div className="space-y-3 bg-secondary p-4 rounded-lg">
                                            <p className="font-semibold text-sm">Recording ready:</p>
                                            <video
                                                ref={videoRef}
                                                controls
                                                className="w-full bg-black rounded"
                                            />
                                            <Button
                                                onClick={() => {
                                                    setVideoBlob(null);
                                                    setPreview(null);
                                                }}
                                                variant="outline"
                                                className="w-full gap-2"
                                                size="sm"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                                Clear Recording
                                            </Button>
                                        </div>
                                    )}

                                    <div className="text-sm text-muted-foreground text-center">
                                        Or upload a video file:
                                    </div>
                                    <label className="block">
                                        <div className="border-2 border-dashed border-muted-foreground rounded-lg p-6 text-center cursor-pointer hover:border-primary transition-colors">
                                            <Upload className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
                                            <p className="text-sm">Upload video file</p>
                                        </div>
                                        <input
                                            type="file"
                                            accept="video/*"
                                            onChange={handleFileSelect}
                                            className="hidden"
                                        />
                                    </label>
                                </div>
                            )}

                            {/* Preview for images */}
                            {preview && challenge.type === "image" && (
                                <div className="space-y-3 bg-secondary p-4 rounded-lg">
                                    <p className="font-semibold text-sm">Preview:</p>
                                    <img src={preview} alt="Preview" className="w-full rounded max-h-64 object-cover" />
                                    <Button
                                        onClick={() => {
                                            setFile(null);
                                            setPreview(null);
                                        }}
                                        variant="outline"
                                        className="w-full gap-2"
                                        size="sm"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                        Clear Selection
                                    </Button>
                                </div>
                            )}

                            {/* Upload Button */}
                            <Button
                                onClick={handleUpload}
                                disabled={uploading || (!file && !audioBlob && !videoBlob)}
                                className="w-full gap-2"
                                size="lg"
                            >
                                {uploading ? "Uploading..." : "Submit Entry"}
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Instructions Card */}
                    <Card className="h-fit">
                        <CardHeader>
                            <CardTitle>How It Works</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-3">
                                <div className="flex gap-3">
                                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold flex-shrink-0">
                                        1
                                    </div>
                                    <div>
                                        <p className="font-semibold">Record or Upload</p>
                                        <p className="text-sm text-muted-foreground">
                                            Use your camera/microphone or upload an existing file
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold flex-shrink-0">
                                        2
                                    </div>
                                    <div>
                                        <p className="font-semibold">Preview Your Work</p>
                                        <p className="text-sm text-muted-foreground">
                                            Check that everything looks/sounds right
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold flex-shrink-0">
                                        3
                                    </div>
                                    <div>
                                        <p className="font-semibold">Submit</p>
                                        <p className="text-sm text-muted-foreground">
                                            Click submit and you're done! No login required.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-accent/10 border border-accent/30 rounded-lg p-4">
                                <p className="text-sm font-semibold text-accent mb-2">💡 Pro Tip:</p>
                                <p className="text-sm text-muted-foreground">
                                    Make sure your browser has permission to access your camera and microphone.
                                </p>
                            </div>

                            <div className="bg-secondary rounded-lg p-4">
                                <p className="text-sm">
                                    <span className="font-semibold">Your ID:</span>
                                    <br />
                                    <code className="text-xs bg-background rounded px-2 py-1 mt-2 inline-block break-all">
                                        {userId}
                                    </code>
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}