import { SubmitButton } from '@/components/form/Buttons';
import FormContainer from '@/components/form/FormContainer';
import FormInput from '@/components/form/FormInput';
import {
    createProfileAction,
    updateProfileAction,
    fetchProfile,
} from '@/utils/actions';

async function ProfilePage() {
    const profile = await fetchProfile();
    return (
        <section>
            <h1 className='text-2xl font-semibold mb-8 capitalize'>
                edit profile
            </h1>
            <div className='border p-8 rounded-md'>
                <FormContainer action={updateProfileAction}>
                    <div className='grid md:grid-cols-2 gap-4'>
                        <FormInput
                            label='First Name'
                            name='firstName'
                            type='text'
                            defaultValue={profile.firstName}
                        />
                        <FormInput
                            label='Last Name'
                            name='lastName'
                            type='text'
                            defaultValue={profile.lastName}
                        />
                        <FormInput
                            label='Username'
                            name='username'
                            type='text'
                            defaultValue={profile.username}
                        />
                    </div>

                    <SubmitButton text='Update Profile' className='mt-8' />
                </FormContainer>
            </div>
        </section>
    );
}
export default ProfilePage;
