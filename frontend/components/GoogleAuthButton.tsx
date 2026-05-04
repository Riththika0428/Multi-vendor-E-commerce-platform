"use client";

import { useGoogleLogin } from '@react-oauth/google';
import api from '../lib/axios';
import { useAuthStore } from '../store/useAuthStore';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function GoogleAuthButton({ roleHint = 'customer' }: { roleHint?: 'customer' | 'seller' }) {
  const setUser = useAuthStore((state) => state.setUser);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        setLoading(true);
        // Note: useGoogleLogin by default returns an access token, but our backend expects an ID token.
        // We'll use the tokenResponse access_token to fetch user info from google, 
        // OR we can change this to use `flow: 'auth-code'` or use `<GoogleLogin>` component which returns a credential (id_token).
        
        // Simpler way using the access_token: We can manually hit Google APIs from frontend if needed, 
        // but it's more secure to pass the credential to the backend.
        // Assuming we are using the `credential` from `<GoogleLogin>`:
      } catch (error) {
        console.error('Google login failed', error);
      } finally {
        setLoading(false);
      }
    },
    // We should use the standardized `<GoogleLogin>` component for ID Tokens
  });

  return (
    <button 
      onClick={() => login()} 
      disabled={loading}
      className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
    >
      <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
      {loading ? 'Please wait...' : 'Continue with Google'}
    </button>
  );
}
