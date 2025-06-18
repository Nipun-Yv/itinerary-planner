import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold text-orange-500 animate-fade-in">Welcome to Trip Planner</h1>
        <p className="text-lg text-muted-foreground">Plan your journey with ease and excitement!</p>
        <Link href="/auth">
          <button className="bg-orange-500 hover:bg-orange-400 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-200">
            Get Started
          </button>
        </Link>
      </div>
    </main>
  );
}
