import Link from 'next/link';
import Image from 'next/image';
import { type Post } from '@/interfaces/post';

interface AuthorPostListProps {
  posts: Post[];
}

export default function AuthorPostList({ posts }: AuthorPostListProps) {
  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">No posts found.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <Link
          key={post.slug}
          href={`/posts/${post.slug}`}
          className="group"
        >
          <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
            <div className="relative h-48">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                {post.title}
              </h3>
              <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                {post.excerpt}
              </p>
              <div className="mt-4 flex items-center">
                <div className="relative w-8 h-8 rounded-full overflow-hidden">
                  <Image
                    src={post.author.picture}
                    alt={post.author.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <span className="ml-2 text-sm text-gray-600">
                  {post.author.name}
                </span>
                <span className="ml-auto text-sm text-gray-500">
                  {new Date(post.date).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
} 