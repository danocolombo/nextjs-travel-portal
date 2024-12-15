import * as Z from 'zod';
import { ZodSchema } from 'zod';

export const profileSchema = Z.object({
    firstName: Z.string().min(2, {
        message: 'First name must be at least 2 characters',
    }),
    lastName: Z.string().min(2, {
        message: 'Last name must be at least 2 characters',
    }),
    username: Z.string().min(2, {
        message: 'Username must be at least 2 characters',
    }),
});
