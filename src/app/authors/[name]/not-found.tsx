import Link from "next/link";
import Container from "@/app/_components/container";

export default function NotFound() {
  return (
    <Container>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold tracking-tighter leading-tight md:pr-8 mb-8">
          Author not found
        </h1>
        <p className="text-lg mb-8">
          The author you are looking for does not exist or has no posts.
        </p>
        <Link
          href="/"
          className="text-blue-600 hover:text-blue-800 hover:underline"
        >
          Return to home
        </Link>
      </div>
    </Container>
  );
} 