import { type Author } from '@/interfaces/author';
import { type Post } from '@/interfaces/post';
import { generateSlug } from '../slugify';

// Cache for storing processed author data
let authorsCache: Author[] | null = null;

export async function getAllAuthors(): Promise<Author[]> {
  if (authorsCache) {
    return authorsCache;
  }

  const fs = require('fs');
  const path = require('path');
  const matter = require('gray-matter');

  const postsDirectory = path.join(process.cwd(), '_posts');
  const fileNames = fs.readdirSync(postsDirectory);

  const authorsMap = new Map<string, Author>();

  for (const fileName of fileNames) {
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(fileContents);
    
    if (data.author) {
      const authorName = data.author.name;
      const slug = generateSlug(authorName);
      
      if (!authorsMap.has(slug)) {
        authorsMap.set(slug, {
          name: authorName,
          picture: data.author.picture,
          slug,
          bio: data.author.bio,
          socialLinks: data.author.socialLinks
        });
      }
    }
  }

  authorsCache = Array.from(authorsMap.values());
  return authorsCache;
}

export async function getAuthorBySlug(slug: string): Promise<Author | null> {
  const authors = await getAllAuthors();
  return authors.find(author => author.slug === slug) || null;
}

export async function getPostsByAuthor(slug: string): Promise<Post[]> {
  const fs = require('fs');
  const path = require('path');
  const matter = require('gray-matter');

  const postsDirectory = path.join(process.cwd(), '_posts');
  const fileNames = fs.readdirSync(postsDirectory);

  const posts: Post[] = [];

  for (const fileName of fileNames) {
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    
    if (data.author && generateSlug(data.author.name) === slug) {
      posts.push({
        slug: fileName.replace(/\.md$/, ''),
        title: data.title,
        date: data.date,
        coverImage: data.coverImage,
        author: {
          name: data.author.name,
          picture: data.author.picture,
          slug: generateSlug(data.author.name),
          bio: data.author.bio,
          socialLinks: data.author.socialLinks
        },
        excerpt: data.excerpt,
        ogImage: data.ogImage,
        content
      });
    }
  }

  // Sort posts by date, newest first
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
} 