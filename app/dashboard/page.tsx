import { requireAuth } from '@/lib/auth';

export default async function Dashboard() {
  await requireAuth();
  
  const currentTime = new Date().toLocaleTimeString('en-US', { 
    hour: 'numeric', 
    minute: '2-digit',
    hour12: true 
  });
  
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  const getGreeting = () => {
  const hour = new Date().getHours();
  
  if (hour < 12) {
    return "Good morning! 🌅";
  } else if (hour < 17) {
    return "Good afternoon! ☀️";
  } else if (hour < 21) {
    return "Good evening! 🌆";
  } else {
    return "Good night! 🌙";
  }
};

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50 to-rose-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        
      <header className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-5xl font-bold text-slate-800 mb-2">
              {getGreeting()}
            </h1>
            <p className="text-slate-600 text-lg">{currentDate}</p>
          </div>
          <div className="mt-4 md:mt-0">
            <div className="bg-white/70 backdrop-blur-lg rounded-2xl px-4 py-2 border border-orange-200/50">
              <span className="text-slate-700 font-medium">{currentTime}</span>
            </div>
          </div>
        </div>
      </header>



        {/* Inspiration Section */}
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 border border-orange-200/50">
          <h3 className="text-xl font-bold text-slate-800 mb-6">Ready to Begin?</h3>
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-rose-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </div>
            <p className="text-slate-600 text-lg mb-6">
              Every great adventure starts with a single step. What's your next destination?
            </p>
            <a
              href="/plan"
              className="inline-flex items-center bg-gradient-to-r from-orange-500 to-rose-500 text-white font-semibold px-8 py-3 rounded-xl hover:from-orange-600 hover:to-rose-600 transition-all duration-300 group"
            >
              Begin Your Journey
              <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}