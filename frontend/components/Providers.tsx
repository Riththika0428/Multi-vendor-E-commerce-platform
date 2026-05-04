"use client";

import { GoogleOAuthProvider } from '@react-oauth/google';

export function Providers({ children }: { children: React.ReactNode }) {
  // During development, replace 'placeholder-id' with your actual Google Client ID
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '1234567890-placeholder.apps.googleusercontent.com';
  
  return (
    <GoogleOAuthProvider clientId={clientId}>
      {children}
    </GoogleOAuthProvider>
  );
}
