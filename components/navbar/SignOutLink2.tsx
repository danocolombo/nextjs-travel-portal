' use client';
import React from 'react';
import { SignOutButton } from '@clerk/nextjs';
import { useToast } from '@/components/ui/use-toast';
//---------------------------------------------------
// this is displayed in the navigation dropdown
//---------------------------------------------------
function SignOutLink() {
    const { toast } = useToast();
    const handleLogout = () => {
        toast({ description: 'You have been signed out.' });
    };
    return (
        <SignOutButton redirectUrl='/'>
            <button className='w-full text-left' onClick={handleLogout}>
                Logout
            </button>
        </SignOutButton>
    );
}
export default SignOutLink;
