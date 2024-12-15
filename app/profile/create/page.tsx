import React from 'react';
import FormContainer from '@/components/form/FormContainer';
import FormInput from '@/components/form/FormInput';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { SubmitButton } from '@/components/form/Buttons';
const createProfileAction = async (prevState: any, formData: FormData) => {
    'use server';
    const firstName = formData.get('firstName') as string;
    console.log('FIRST NAME:', firstName);
    return { message: 'Profile created' };
};

function CreateProfilePage() {
    return (
        <section>
            <h1 className='text-2xl font-semibold mb-8 capitalize'>new user</h1>
            <div className='border p-8 rounded-md'>
                <FormContainer action={createProfileAction}>
                    <div className='grid md:grid-cols-2 gap-4'>
                        <FormInput
                            label='First Name'
                            name='firstName'
                            type='text'
                        />
                        <FormInput
                            label='Last Name'
                            name='lastName'
                            type='text'
                        />
                        <FormInput
                            label='Username'
                            name='username'
                            type='text'
                        />
                    </div>

                    <SubmitButton text='Create Profile' className='mt-8' />
                </FormContainer>
            </div>
        </section>
    );
}
export default CreateProfilePage;
