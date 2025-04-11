import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-4xl text-center">
        <h1 className="text-4xl font-bold mb-6">Welcome to My App</h1>
        <p className="text-xl mb-8">A simple application with tRPC and TanStack Router</p>
        
        <div className="flex justify-center space-x-4">
          <Link 
            to="/posts" 
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium"
          >
            View Posts
          </Link>
          <Link 
            to="/settings" 
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-lg font-medium"
          >
            Settings
          </Link>
        </div>
      </div>
    </div>
  );
}