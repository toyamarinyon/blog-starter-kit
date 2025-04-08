import Link from "next/link";
import { generateSlug } from "@/lib/slugify";

type Props = {
  name: string;
  picture: string;
};

const Avatar = ({ name, picture }: Props) => {
  const authorSlug = generateSlug(name);
  
  return (
    <Link href={`/authors/${authorSlug}`} className="flex items-center group">
      <img src={picture} className="w-12 h-12 rounded-full mr-4" alt={name} />
      <div className="text-xl font-bold group-hover:text-blue-600 transition-colors">
        {name}
      </div>
    </Link>
  );
};

export default Avatar;
