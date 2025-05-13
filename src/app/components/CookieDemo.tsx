'use client';

import { useState } from 'react';
import { fetchWithAuth } from '../utils/api';

// Define an interface for API responses
interface ApiResponse {
  success?: boolean;
  message?: string;
  [key: string]: unknown; // Use unknown instead of any
}

export default function CookieDemo() {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<ApiResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Function to set the HTTP-only cookie
  const setCookie = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Make a request to our API route that sets the cookie
      const result = await fetch('/api/set-cookie', {
        method: 'GET',
        credentials: 'include', // Important: include credentials to store the cookie
      });
      
      const data = await result.json();
      setResponse(data);
      
    } catch (err) {
      setError('Failed to set cookie: ' + (err instanceof Error ? err.message : String(err)));
    } finally {
      setIsLoading(false);
    }
  };

  // Function to make an authenticated request using the cookie
  const makeAuthenticatedRequest = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // This will automatically include the HTTP-only cookie
      const data = await fetchWithAuth('/api/example-protected-route');
      setResponse(data);
      
    } catch (err) {
      setError('Failed to make authenticated request: ' + (err instanceof Error ? err.message : String(err)));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4">HTTP-Only Cookie Demo</h2>
      
      <div className="space-y-4">
        <button
          onClick={setCookie}
          disabled={isLoading}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {isLoading ? 'Loading...' : 'Set HTTP-Only Cookie'}
        </button>
        
        <button
          onClick={makeAuthenticatedRequest}
          disabled={isLoading}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
        >
          {isLoading ? 'Loading...' : 'Make Authenticated Request'}
        </button>
        
        {error && (
          <div className="p-4 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}
        
        {response && (
          <div className="p-4 bg-gray-100 rounded">
            <h3 className="font-bold mb-2">Response:</h3>
            <pre className="whitespace-pre-wrap">{JSON.stringify(response, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
} 