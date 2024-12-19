'use server';
import { redirect } from 'next/navigation';
import { auth, clerkClient, currentUser } from '@clerk/nextjs/server';
import { validateWithZodSchema } from './schemas';
import db from './db';
import { revalidatePath } from 'next/cache';

import {
    // imageSchema,
    profileSchema,
    // propertySchema,
    // validateWithZodSchema,
    // createReviewSchema,
} from './schemas';

const renderError = (error: unknown): { message: string } => {
    console.log(error);
    return {
        message: error instanceof Error ? error.message : 'An error occurred',
    };
};
//helper function to get the current user
const getAuthUser = async () => {
    const user = await currentUser();
    if (!user) {
        throw new Error('You must be logged in to access this route');
    }
    if (!user.privateMetadata.hasProfile) redirect('/profile/create');
    return user;
};

export const createProfileAction = async (
    prevState: any,
    formData: FormData
) => {
    try {
        const user = await currentUser();

        if (!user) throw new Error('Please login to create a profile');

        const rawData = Object.fromEntries(formData);
        const validatedFields = validateWithZodSchema(profileSchema, rawData);
        await db.profile.create({
            data: {
                clerkId: user.id,
                email: user.emailAddresses[0].emailAddress,
                profileImage: user.imageUrl ?? '',
                ...validatedFields,
            },
        });
        await clerkClient.users.updateUserMetadata(user.id, {
            privateMetadata: {
                hasProfile: true,
                status: 'INITIATED',
            },
        });
    } catch (error) {
        // return {
        //     message:
        //         error instanceof Error
        //             ? error.message
        //             : 'failure in createProfileAction',
        // };
        return renderError(error);
    }
    redirect('/');
};
export const fetchProfileImage = async () => {
    const user = await currentUser();
    if (!user) return null;

    const profile = await db.profile.findUnique({
        where: {
            clerkId: user.id,
        },
        select: {
            profileImage: true,
        },
    });

    return profile?.profileImage;
};
export const fetchProfile = async () => {
    //this checks if the user is logged in
    const user = await getAuthUser();
    // now get the user from the database
    const profile = await db.profile.findUnique({
        where: {
            clerkId: user.id,
        },
    });
    if (!profile) redirect('/profile/create');
    return profile;
};
export const updateProfileAction = async (
    prevState: any,
    formData: FormData
): Promise<{ message: string }> => {
    const user = await getAuthUser();

    try {
        const rawData = Object.fromEntries(formData);
        const validatedFields = validateWithZodSchema(profileSchema, rawData);

        await db.profile.update({
            where: {
                clerkId: user.id,
            },
            data: validatedFields,
        });

        revalidatePath('/profile');
        return { message: 'Profile updated successfully' };
    } catch (error) {
        return renderError(error);
    }
};

export const updateProfileImageAction = async (
    prevState: any,
    formData: FormData
): Promise<{ message: string }> => {
    return { message: 'Profile image updated successfully' };
};
//     const user = await getAuthUser();
//     try {
//         const image = formData.get('image') as File;
//         const validatedFields = validateWithZodSchema(imageSchema, { image });
//         const fullPath = await uploadImage(validatedFields.image);

//         await db.profile.update({
//             where: {
//                 clerkId: user.id,
//             },
//             data: {
//                 profileImage: fullPath,
//             },
//         });
//         revalidatePath('/profile');
//         return { message: 'Profile image updated successfully' };
//     } catch (error) {
//         return renderError(error);
//     }
// };