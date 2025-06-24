import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="relative z-10 p-6 border-b border-orange-100">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <Link href="/" className="text-xl font-bold text-orange-500">
            ✈️ TripPlanner
          </Link>
          <div className="hidden md:flex space-x-8">
            <Link href="/about" className="text-orange-500 font-medium">
              About Us
            </Link>
            <Link href="/hotels" className="text-muted-foreground hover:text-orange-500 transition-colors font-medium">
              Hotels & Stays
            </Link>
            <Link href="/contact" className="text-muted-foreground hover:text-orange-500 transition-colors font-medium">
              Contact
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-orange-500 mb-6">
            Revolutionizing Travel Planning
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            We're making personalized travel accessible to everyone through the power of AI
          </p>
        </div>
      </section>

      {/* Problem & Solution */}
      <section className="py-16 px-6 bg-orange-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">The Problem We're Solving</h2>
              <p className="text-gray-600 mb-4">
                Planning a trip today is frustrating and time-consuming. Travelers are forced to juggle multiple platforms—searching for destinations on one site, booking hotels on another, researching activities elsewhere, and trying to piece it all together manually.
              </p>
              <p className="text-gray-600 mb-4">
                This fragmented approach leads to:
              </p>
              <ul className="text-gray-600 space-y-2">
                <li>• Hours spent switching between platforms</li>
                <li>• Missed opportunities for budget optimization</li>
                <li>• Lack of personalized recommendations</li>
                <li>• No real-time assistance during planning</li>
              </ul>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="text-center">
                <div className="text-6xl mb-4">🎯</div>
                <h3 className="text-2xl font-bold text-orange-500 mb-4">Our Mission</h3>
                <p className="text-gray-600">
                  To create a seamless, intelligent travel planning experience that puts the joy back into discovering new places.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Solution */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">How TripPlanner Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-8 rounded-2xl">
              <div className="text-4xl mb-4">🤖</div>
              <h3 className="text-xl font-bold text-orange-600 mb-4">AI-Powered Intelligence</h3>
              <p className="text-gray-600">
                Our advanced AI analyzes your preferences, budget, and travel style to create personalized itineraries that match your unique needs.
              </p>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-8 rounded-2xl">
              <div className="text-4xl mb-4">🗺️</div>
              <h3 className="text-xl font-bold text-orange-600 mb-4">Dynamic Trip Calendar</h3>
              <p className="text-gray-600">
                Watch your itinerary come to life in real-time with our streaming calendar that updates as our AI finds the perfect activities and experiences.
              </p>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-8 rounded-2xl">
              <div className="text-4xl mb-4">🏨</div>
              <h3 className="text-xl font-bold text-orange-600 mb-4">Smart Accommodation</h3>
              <p className="text-gray-600">
                Hotels and stays are recommended based on your itinerary, ensuring you're always in the right place at the right time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">What Makes Us Different</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-bold text-orange-500 mb-3">Interactive Maps & Routes</h3>
              <p className="text-gray-600">
                Visualize your journey with interactive maps that show optimized travel routes between activities, powered by nearby places API.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-bold text-orange-500 mb-3">Real-Time Assistant</h3>
              <p className="text-gray-600">
                Get instant recommendations for restaurants, attractions, and hidden gems that complement your planned activities.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-bold text-orange-500 mb-3">Budget Optimization</h3>
              <p className="text-gray-600">
                Our AI finds the best deals and suggests alternatives that fit your budget without compromising on experience.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-bold text-orange-500 mb-3">One-Stop Planning</h3>
              <p className="text-gray-600">
                From activities to accommodations, everything you need is in one place—no more juggling multiple apps and websites.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 bg-orange-500 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Experience the Future of Travel Planning?</h2>
          <p className="text-xl text-orange-100 mb-8">
            Join thousands of travelers who've discovered the joy of effortless trip planning
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth">
              <button className="px-8 py-4 bg-white text-orange-500 font-semibold rounded-xl hover:bg-orange-50 transition-colors min-w-[200px]">
                Start Planning Now
              </button>
            </Link>
            <Link href="/contact">
              <button className="px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-orange-500 font-semibold rounded-xl transition-colors min-w-[200px]">
                Get in Touch
              </button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}