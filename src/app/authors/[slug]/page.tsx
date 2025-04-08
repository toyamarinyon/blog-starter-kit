import { getAuthorBySlug, getPostsByAuthor } from '@/lib/api/authors';
import AuthorHeader from '@/components/AuthorHeader';
import AuthorPostList from '@/components/AuthorPostList';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

interface AuthorPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: AuthorPageProps): Promise<Metadata> {
  const author = await getAuthorBySlug(params.slug);
  
  if (!author) {
    return {
      title: 'Author Not Found',
    };
  }

  return {
    title: `${author.name} | Blog Author`,
    description: author.bio || `Posts by ${author.name}`,
  };
}

export default async function AuthorPage({ params }: AuthorPageProps) {
  const author = await getAuthorBySlug(params.slug);
  
  if (!author) {
    notFound();
  }

  const posts = await getPostsByAuthor(params.slug);

  return (
    <div className="container mx-auto px-4 py-8">
      <AuthorHeader author={author} />
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Posts by {author.name}</h2>
        <AuthorPostList posts={posts} />
      </div>
    </div>
  );
} 