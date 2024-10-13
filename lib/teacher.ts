export const isTeacher = (userId?: string | null) => {
    if(userId === process.env.NEXT_PUBLIC_TEACHER_ID) return true;

    //also adding dev here

    const devIds = process.env.NEXT_PUBLIC_DEV_IDS?.split(',') || [];
    for(const dev of devIds){
        if(userId === dev) return true;
    }

    return false;
}

// NEXT_PUBLIC_DEV_IDS=user_2n6WmFEUoSy2UEVoldc7eCKNpGu
