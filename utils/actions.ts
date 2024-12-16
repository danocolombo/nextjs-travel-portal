'use server';
import { redirect } from 'next/navigation';
import { auth, clerkClient, currentUser } from '@clerk/nextjs/server';
import { validateWithZodSchema } from './schemas';
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

export const createProfileAction = async (
    prevState: any,
    formData: FormData
) => {
    try {
        const user = await currentUser();
        if (!user) throw new Error('Please login to create a profile');

        const rawData = Object.fromEntries(formData);
        // const validatedFields = validateWithZodSchema(profileSchema, rawData);
        const validatedFields = profileSchema.parse(rawData);
        console.log(validatedFields);
        return { message: 'Profile created successfully' };
        // await db.profile.create({
        //     data: {
        //         clerkId: user.id,
        //         email: user.emailAddresses[0].emailAddress,
        //         profileImage: user.imageUrl ?? '',
        //         ...validatedFields,
        //     },
        // });
        // await clerkClient.users.updateUserMetadata(user.id, {
        //     privateMetadata: {
        //         hasProfile: true,
        //     },
        // });
    } catch (error) {
        console.log(error);
        return { message: 'failure in createProfileAction' };
        // return renderError(error);
    }
    redirect('/');
};