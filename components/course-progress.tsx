import { cn } from "@/lib/utils";
import { Progress } from "./ui/progress";

interface CourseProgressProps {
    value: number;
    variant?: "success" | "default";
    size?: "sm" | "default";
}

const colorByVariant = {
    success: "text-emerald-700",
    default: "text-sky-700",
}

const sizeByVariant = {
    sm: "text-xs",
    default: "text-sm",
}

export const CourseProgress = ({
    value,
    variant,
    size,
}: CourseProgressProps) => {
    return (
        <div>
            <Progress
                className="h-2"
                value={value}
                variant={variant}
            />
            <p className={cn(
                "font-medium mt-2 text-sky-700",
                colorByVariant[variant || "default"],
                sizeByVariant[size || "default"]
            )}>
                {Math.round(value)}% Complete
            </p>
        </div>
    )
}