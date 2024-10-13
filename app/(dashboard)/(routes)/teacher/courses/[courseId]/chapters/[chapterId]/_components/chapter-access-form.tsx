"use client"
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormDescription, FormField, FormItem } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Chapter } from "@prisma/client";
import axios from "axios";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

interface ChapterAccessFormProps{
    initialData: Chapter;
    courseId: string;
    chapterId: string;
};

const formSchema = z.object({
    isFree: z.boolean().default(false),
})


export const ChapterAccessForm = ({
    initialData,
    courseId,
    chapterId
}: ChapterAccessFormProps) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            isFree: !!initialData.isFree //(!!) converts to boolean
        },
    });
    const [isEditing, setIsEditing] = useState(false);
    const router = useRouter();

    const toggleEdit = () => {
        setIsEditing((cur) => !cur);
    }

    const { isSubmitting, isValid } = form.formState

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try{
            await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}`, values);
            toast.success("Chapter updated");
            toggleEdit();
            router.refresh();
        }
        catch{
            toast.error("something went wrong!")
        }
    }

    return (
        <div className="mt-6 border bg-slate-100 rounded-md p-4">
            <div className="font-medium flex items-center justify-between">
                Chapter Access
                <Button onClick={toggleEdit} variant="ghost">
                    {!isEditing ? 
                        (<Pencil className="h-4 mr-2 w-4">
                            Edit Access
                        </Pencil>) : (<>Cancel</>)
                    }
                </Button>
            </div>
            {!isEditing && (
                <p className={cn(
                    "text-sm mt-2",
                    !initialData.isFree && "text-slate-500 italic"
                )}>
                    {initialData.isFree ? 
                    <>
                        This chapter is free.
                    </> : 
                    <>
                        This chapter is paid.
                    </>}
                </p>
            )}
            {
                isEditing && (
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-4 mt-4"
                        >
                            <FormField
                                control={form.control}
                                name="isFree"
                                render={({field}) => (
                                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rouded-md border p-4">
                                        <FormControl>
                                            <Checkbox
                                                checked={field.value}
                                                onCheckedChange={field.onChange} 
                                            />
                                        </FormControl>
                                        <div className="space-y-1 leading-none">
                                            <FormDescription>
                                                Make this chapter free
                                            </FormDescription>
                                        </div>
                                    </FormItem>
                                        
                                )}
                            >

                            </FormField>

                            <div className="flex items-center gap-x-2">
                                <Button 
                                    disabled={!isValid || isSubmitting}
                                    type="submit"
                                >
                                    Save
                                </Button>
                            </div>

                        </form>
                    </Form>
                )
            }

        </div>
    );
}