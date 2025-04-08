import Link from "next/link";

const Header = () => {
  return (
    <header className="mb-20 mt-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl md:text-4xl font-bold tracking-tight md:tracking-tighter leading-tight">
          <Link href="/" className="hover:underline">
            Blog
          </Link>
          .
        </h2>
        <nav className="flex space-x-4">
          <Link
            href="/authors"
            className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
          >
            Authors
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
