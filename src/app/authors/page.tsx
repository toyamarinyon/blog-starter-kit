import { getAllAuthors } from '@/lib/api/authors';
import AuthorCard from '@/components/AuthorCard';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Authors | Blog',
  description: 'Meet the authors behind our blog posts',
};

export default async function AuthorsPage() {
  const authors = await getAllAuthors();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Authors</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {authors.map((author) => (
          <AuthorCard key={author.slug} author={author} />
        ))}
      </div>
    </div>
  );
} 