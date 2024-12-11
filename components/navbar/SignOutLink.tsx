import React from 'react';
import { SignOutButton } from '@clerk/nextjs';
function SignOutLink() {
    const handleLogout = () => {
        alert('You have been signed out.');
    }   
    return (
        <SignOutButton redirectUrl='/'>
            
                Logout
            
        </SignOutButton>
    );
}

export default SignOutLink;
