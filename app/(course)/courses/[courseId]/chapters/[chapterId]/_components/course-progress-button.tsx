"use client";

import { Button } from "@/components/ui/button";
import { useConfettiStore } from "@/hooks/use-confetti-store";
import axios from "axios";
import { CheckCircle, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface CourseProgressButtonProps {
    courseId: string;
    chapterId: string;
    isCompleted?: boolean;
    nextChapterId?: string;
}

export const CourseProgressButton = ({
    courseId,
    chapterId,
    isCompleted,
    nextChapterId,
}: CourseProgressButtonProps) => {
    const router = useRouter();
    const confetti = useConfettiStore();
    const [isLoading, setIsLoading] = useState(false);

    const onClick = async () => {
        try{
            setIsLoading(true);
            
            await axios.put(`/api/courses/${courseId}/chapters/${chapterId}/progress`, {
                isCompleted: !isCompleted,
            })

            if(!isCompleted && !nextChapterId){
                confetti.onOpen();
                toast.success("Course completed");
            }

            if(!isCompleted && nextChapterId){
                router.push(`/courses/${courseId}/chapters/${nextChapterId}`);
            }

            toast.success(isCompleted ? "Chapter marked as not completed" : "Chapter marked as completed");
            router.refresh();
        }catch{
            toast.error("Something went wrong");
        } finally{
            setIsLoading(false);
        }
    }

    const Icon = isCompleted ? XCircle : CheckCircle;

    return (
        <Button
            onClick={onClick}
            disabled={isLoading}
            type="button"
            variant={isCompleted ? "outline" : "success"}
            className="w-full md:w-auto"
        >
            {isCompleted ? "Not completed" : "Mark as complete"}
            <Icon className="ml-2 w-4 h-4"/>
        </Button>
    )
}