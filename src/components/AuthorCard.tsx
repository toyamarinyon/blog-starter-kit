import Image from 'next/image';
import Link from 'next/link';
import { type Author } from '@/interfaces/author';

interface AuthorCardProps {
  author: Author;
}

export default function AuthorCard({ author }: AuthorCardProps) {
  return (
    <Link href={`/authors/${author.slug}`} className="group">
      <div className="flex items-center space-x-4 p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
        <div className="relative w-16 h-16 rounded-full overflow-hidden">
          <Image
            src={author.picture}
            alt={author.name}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
            {author.name}
          </h3>
          {author.bio && (
            <p className="text-sm text-gray-600 line-clamp-2 mt-1">
              {author.bio}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
} 