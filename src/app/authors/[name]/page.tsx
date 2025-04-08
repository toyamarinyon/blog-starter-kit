import { getAllPosts } from "@/lib/api";
import { Post } from "@/interfaces/post";
import Container from "@/app/_components/container";
import Avatar from "@/app/_components/avatar";
import { PostPreview } from "@/app/_components/post-preview";
import { notFound } from "next/navigation";

type Props = {
  params: {
    name: string;
  };
};

export default function AuthorPage({ params }: Props) {
  const posts = getAllPosts();
  const authorPosts = posts.filter((post) => post.author.name === params.name);

  if (authorPosts.length === 0) {
    notFound();
  }

  const author = authorPosts[0].author;

  return (
    <Container>
      <div className="max-w-2xl mx-auto">
        <div className="mb-8 md:mb-16">
          <div className="flex items-center space-x-4 mb-8">
            <Avatar name={author.name} picture={author.picture} />
            <div>
              <h1 className="text-4xl font-bold tracking-tighter leading-tight md:pr-8">
                {author.name}
              </h1>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-16 lg:gap-x-32 gap-y-20 md:gap-y-32 mb-32">
          {authorPosts.map((post) => (
            <PostPreview
              key={post.slug}
              title={post.title}
              coverImage={post.coverImage}
              date={post.date}
              author={post.author}
              slug={post.slug}
              excerpt={post.excerpt}
            />
          ))}
        </div>
      </div>
    </Container>
  );
} 