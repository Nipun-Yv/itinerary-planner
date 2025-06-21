import Link from 'next/link';
import { ArrowLeft, Home } from 'lucide-react';

export default function NotFound(): JSX.Element {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-6">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-orange-400 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="relative z-10 text-center space-y-8 max-w-md">
        {/* 404 Icon */}
        <div className="text-8xl mb-4">🏨</div>
        
        {/* Error Message */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-orange-500">Hotel Not Found</h1>
          <p className="text-xl text-muted-foreground">
            Sorry, we couldn't find the hotel you're looking for. It might have been removed or the ID is incorrect.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/hotels">
            <button className="flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105">
              <ArrowLeft className="w-4 h-4" />
              Back to Hotels
            </button>
          </Link>
          
          <Link href="/">
            <button className="flex items-center gap-2 px-6 py-3 border-2 border-orange-500 text-orange-500 hover:bg-orange-50 font-semibold rounded-xl transition-all duration-300">
              <Home className="w-4 h-4" />
              Go Home
            </button>
          </Link>
        </div>

        {/* Additional Help */}
        <div className="pt-8 border-t border-orange-200">
          <p className="text-sm text-muted-foreground">
            Need help? <Link href="/contact" className="text-orange-500 hover:text-orange-600 underline">Contact our support team</Link>
          </p>
        </div>
      </div>
    </main>
  );
}