import { getChapter } from "@/actions/get-chapter";
import { Banner } from "@/components/banner";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { VideoPlayer } from "./_components/video.player";
import { CourseEnrollButton } from "./_components/course-enroll-button";
import { Separator } from "@/components/ui/separator";
import { Preview } from "@/components/preview";
import { File } from "lucide-react";
import { Attachment } from "@prisma/client";
import { CourseProgressButton } from "./_components/course-progress-button";

const ChapterIdPage = async (
    { params }: 
    {
        params: { courseId: string, chapterId: string };
    }
) => {

    const { userId } = auth();

    if(!userId){
        return redirect("/");
    }

    const {
        chapter,
        course,
        userProgress,
        muxData,
        attachments,
        nextChapter,
        purchase,
    } = await getChapter({
        userId,
        chapterId: params.chapterId,
        courseId: params.courseId,
    })

    console.log("Purchase " + purchase);
    console.log("Next Chapter " + nextChapter);

    if(!chapter || !course){
        // console.log("Chapter or course not found");
        return redirect("/");
    }

    const isLocked = !chapter.isFree && !purchase;
    const completeOnEnd = !!purchase && !userProgress?.isCompleted;

    return (
        <div>
            {userProgress?.isCompleted && (
                <Banner 
                    variant="success"
                    label="Chapter Completed"
                />
            )}
            {isLocked && (
                <Banner 
                    variant="warning"
                    label="Chapter Locked. Please purchase the course to unlock."
                />
            )}
            <div className="flex flex-col max-w-4xl mx-auto pb-20">
                <div className="p-4">
                    <VideoPlayer 
                        chapterId={params.chapterId}
                        title={chapter.title}
                        courseId={params.courseId}
                        nextChapterId={nextChapter?.id}
                        playbackId={muxData?.playbackId!}
                        completeOnEnd={completeOnEnd}
                        isLocked={isLocked}
                    />
                </div>
                <div>
                    <div className="p-4 flex flex-col md:flex-row items-center justify-between">
                        <h2 className="text-2xl font-semibold mb-2">
                            {chapter.title}
                        </h2>
                        {
                            purchase ? (
                                <CourseProgressButton
                                    courseId={params.courseId}
                                    chapterId={params.chapterId}
                                    isCompleted={!!userProgress?.isCompleted}
                                    nextChapterId={nextChapter?.id}
                                />
                            ) : (
                                <CourseEnrollButton
                                    courseId={params.courseId}
                                    price={course.price!}
                                />
                            )
                        }
                    </div>
                    <Separator />
                    <div>
                        <Preview value={chapter.description!} />
                    </div>
                    {
                        !!attachments.length && (
                            <>
                                <Separator />
                                <div className="p-4">
                                    {attachments.map((attachment:Attachment) => (
                                        <a
                                            key={attachment.id}
                                            href={attachment.url}
                                            target="_blank"
                                            className="flex items-center p-3 w-full bg-sky-200 border text-sky-700 rounded-md hover:underline"
                                        >
                                            <File/>
                                            <p className="line-clamp-1">
                                                {attachment.name}
                                            </p>
                                        </a>
                                    ))}
                                </div>
                            </>
                        )
                    }
                </div>
            </div>
        </div>
    );
}
 
export default ChapterIdPage;