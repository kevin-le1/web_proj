import Link from 'next/link';

export default function About() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-gray-700">
        <Link href="/dashboard" passHref>
          <span className="px-6 py-3 text-lg font-semibold text-white bg-black rounded-full shadow-lg hover:bg-white hover:text-black hover:outline-1 transition-colors cursor-pointer">
            Dashboard
          </span>
        </Link>
    </main>
  );
}
