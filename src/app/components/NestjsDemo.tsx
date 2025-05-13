'use client';

import { useState } from 'react';

export default function NestjsDemo() {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<{ success: boolean; message?: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Function to call the Nest.js API
  const checkNestjsAuth = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Use the FULL URL to your Nest.js server here
      // The important part is including 'credentials: "include"' to send cookies
      const result = await fetch('https://disabled-crocodile-menni-9b161ce6.koyeb.app/api/test', {
        method: 'GET',
        credentials: 'include', // This is critical for sending cookies cross-domain
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      const data = await result.json();
      setResponse(data);
      
    } catch (err) {
      setError('Failed to call Nest.js API: ' + (err instanceof Error ? err.message : String(err)));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md mt-8">
      <h2 className="text-xl font-bold mb-4">Nest.js Cookie Auth Demo</h2>
      
      <div className="space-y-4">
        <p className="text-sm text-gray-600">
          First set the cookie using the component above, then click the button below to test with Nest.js.
        </p>
        
        <button
          onClick={checkNestjsAuth}
          disabled={isLoading}
          className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 disabled:opacity-50"
        >
          {isLoading ? 'Loading...' : 'Test Cookie with Nest.js'}
        </button>
        
        {error && (
          <div className="p-4 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}
        
        {response && (
          <div className="p-4 bg-gray-100 rounded">
            <h3 className="font-bold mb-2">Response from Nest.js:</h3>
            <pre className="whitespace-pre-wrap">{JSON.stringify(response, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
} 