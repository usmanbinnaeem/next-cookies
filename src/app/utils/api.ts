/**
 * Utility function to make authenticated API requests to your backend
 * The httpOnly cookie will be automatically included in the request
 */
export async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const fetchOptions: RequestInit = {
    ...options,
    // Include credentials to ensure cookies are sent with the request
    credentials: 'include',
    headers: {
      ...options.headers,
      'Content-Type': 'application/json',
    },
  };

  const response = await fetch(url, fetchOptions);
  
  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`);
  }
  
  return response.json();
} 