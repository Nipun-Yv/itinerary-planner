import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen relative overflow-hidden bg-background">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-orange-400 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-orange-300 rounded-full blur-3xl animate-pulse"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 p-6">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <Link href="/" className="text-xl font-bold text-orange-500">
            ✈️ TripPlanner
          </Link>
          <div className="hidden md:flex space-x-8">
            <Link href="/about" className="text-muted-foreground hover:text-orange-500 transition-colors font-medium">
              About Us
            </Link>
            <Link href="/hotels" className="text-muted-foreground hover:text-orange-500 transition-colors font-medium">
              Hotels & Stays
            </Link>
            <Link href="/contact" className="text-muted-foreground hover:text-orange-500 transition-colors font-medium">
              Contact
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <button className="md:hidden text-orange-500">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[80vh] px-6">
        <div className="text-center space-y-8 max-w-4xl">
          {/* Main heading */}
          <div className="space-y-4">
            <h1 className="text-6xl md:text-8xl font-bold text-orange-500 animate-pulse">
              Plan Your
            </h1>
            <h1 className="text-6xl md:text-8xl font-bold text-orange-500 animate-pulse">
              Perfect Trip
            </h1>
          </div>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Skip the hassle of multiple platforms. Our AI creates personalized itineraries, finds perfect stays, and maps your journey—all in one place.
          </p>

          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <span className="px-4 py-2 bg-orange-50 text-orange-600 rounded-full border border-orange-200">
              🤖 AI-Powered Planning
            </span>
            <span className="px-4 py-2 bg-orange-50 text-orange-600 rounded-full border border-orange-200">
              🗺️ Dynamic Itineraries
            </span>
            <span className="px-4 py-2 bg-orange-50 text-orange-600 rounded-full border border-orange-200">
              💰 Budget Optimization
            </span>
            <span className="px-4 py-2 bg-orange-50 text-orange-600 rounded-full border border-orange-200">
              🏨 Smart Hotel Matching
            </span>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/auth">
              <button className="group relative px-8 py-4 bg-orange-500 hover:bg-orange-400 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-orange-500/25 min-w-[200px]">
                Start Planning Now
                <span className="ml-2">→</span>
              </button>
            </Link>
            
            <Link href="/about">
              <button className="px-8 py-4 border-2 border-orange-500 text-orange-500 hover:bg-orange-50 font-semibold rounded-xl transition-all duration-300 min-w-[200px]">
                Learn More
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Floating decorative elements */}
      <div className="absolute bottom-10 left-10 text-orange-500/30 animate-bounce">
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </div>

      <div className="absolute top-1/3 right-10 text-orange-400/20 animate-spin">
        <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      </div>
    </main>
  );
}