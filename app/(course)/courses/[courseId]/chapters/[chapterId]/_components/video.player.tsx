"use client"
import { useConfettiStore } from "@/hooks/use-confetti-store";
import { cn } from "@/lib/utils";
import MuxPlayer from "@mux/mux-player-react"
import axios from "axios";
import { Loader2, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface VideoPlayerProps {
    chapterId: string;
    courseId: string;
    title: string;
    playbackId: string;
    nextChapterId?: string;
    completeOnEnd: boolean;
    isLocked: boolean;
}

export const VideoPlayer = ({
    chapterId,
    courseId,
    title,
    playbackId,
    nextChapterId,
    completeOnEnd,
    isLocked,
}: VideoPlayerProps) => {
    const [isReady, setIsReady] = useState(false);
    const router = useRouter();
    const confetti = useConfettiStore();

    const onEnded = async () => {
        try{
            if(completeOnEnd){
                await axios.put(`/api/courses/${courseId}/chapters/${chapterId}/progress`, {
                    isCompleted: true,
                })

                if(!nextChapterId){
                    confetti.onOpen();
                }

                toast.success("Progress updated");

                if(nextChapterId){
                    router.push(`/courses/${courseId}/chapters/${nextChapterId}`);
                }

                router.refresh();
            }
        } catch{
            toast.error("Something went wrong");
        }
    }

    return (
        <div className="relative aspect-video">
            {!isReady && !isLocked && (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
                    <Loader2 className="h-8 w-8 animate-spin text-secondary"/>
                </div>
            )}
            {
                isLocked && (
                    <div className="absolute inset-0 flex items-center justify-center bg-slate-800 flex-col gap-y-2 text-secondary bg-opacity-70">
                        <Lock className="h-8 w-8"/>
                        <p className="text-sm">
                            This chapter is locked. Please purchase the course to unlock.
                        </p>
                    </div>
                )
            }
            {
                !isLocked && (
                    <MuxPlayer
                        title={title}
                        className={cn(
                            !isReady && "hidden",
                        )}
                        onCanPlay={() => setIsReady(true)}
                        onEnded={onEnded}
                        playbackId={playbackId}
                        autoPlay
                    />
                )
            }
            
        </div>
    );
}