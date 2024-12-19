'use client';
import React from 'react';
import { SignOutButton } from '@clerk/nextjs';
import { useToast } from '@/hooks/use-toast';
function SignOutLink() {
    const { toast } = useToast();
    const handleLogout = () => {
        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
        });
        toast({
            title: 'Successfully logged out',
            description: formattedDate,
        });
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
