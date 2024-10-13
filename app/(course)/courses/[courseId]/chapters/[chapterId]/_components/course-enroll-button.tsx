"use client"

import { Button } from "@/components/ui/button"
import { formatPrice } from "@/lib/format"
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

interface CourseEnrollButtonProps {
    price: number;
    courseId: string;
}

export const CourseEnrollButton = ({
    price,
    courseId,
}: CourseEnrollButtonProps) => {
    const [isLoading, setIsLoading] = useState(false);

    const onClick = async () => {
        try{
            setIsLoading(true);
            // Add course purchase api call here and redirect call

            const response = await axios.post(`/api/courses/${courseId}/checkout`);

            window.location.assign(response.data.url);
        } catch{
            toast.error("Something went wrong");
        }
        finally{
            setIsLoading(false);
        }
    }

    return (
        <Button 
            size="sm" 
            className="w-full md:w-auto"
            onClick={onClick}
            disabled={isLoading}
        >
            Enroll for {formatPrice(price)}
        </Button>
    )
}