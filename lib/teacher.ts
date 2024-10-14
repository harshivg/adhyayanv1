export const isTeacher = (userId?: string | null) => {
    if(userId === process.env.NEXT_PUBLIC_TEACHER_ID) return true;

    //also adding dev here
    
    const devIds = process.env.NEXT_PUBLIC_DEV_IDS ? JSON.parse(process.env.NEXT_PUBLIC_DEV_IDS) : [];
    
    if(devIds.includes(userId)) return true;
        
    return false;
}
    
    
// NEXT_PUBLIC_DEV_IDS='["user_2n6WmFEUoSy2UEVoldc7eCKNpGu", "user_2nPvubvDW6jetjQFfSgfPXcwNmR", "user_2mqPPmky7ipFCH1IAaUHgPR0kzG"]'