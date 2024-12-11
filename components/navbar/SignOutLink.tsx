'use client';
import React from 'react';
import { SignOutButton } from '@clerk/nextjs';
import { useToast } from '@/components/ui/use-toast';
function SignOutLink() {
    const { toast } = useToast();
    const handleLogout = () => {
        toast({
            title: "Scheduled: Catch up",
            description: "Friday, February 10, 2023 at 5:57 PM",
          })
    }   
    return (
        <SignOutButton redirectUrl='/'>
            <button className='w-full text-left' onClick={handleLogout}>Logout</button>
                
            
        </SignOutButton>
    );
}

export default SignOutLink;
