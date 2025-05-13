import CookieDemo from './components/CookieDemo';
import NestjsDemo from './components/NestjsDemo';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Cross-Domain Cookie Authentication</h1>
      <p className="mb-8 text-center max-w-2xl">
        This example demonstrates how to set and use HTTP-only cookies that can be sent to both Next.js and Nest.js servers.
        HTTP-only cookies can&apos;t be accessed by JavaScript in the browser, making them more secure for storing sensitive information.
      </p>
      
      <CookieDemo />
      <NestjsDemo />
    </main>
  );
}
