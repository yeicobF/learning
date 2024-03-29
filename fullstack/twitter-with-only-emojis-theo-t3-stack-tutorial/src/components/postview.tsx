import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import { type RouterOutputs } from "~/utils/api";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

// Creamos un tipo, obteniendo un elemento del arreglo de Posts.
type PostWithUser = RouterOutputs["posts"]["getAll"][number];

export const PostView = (props: PostWithUser) => {
  const { post, author } = props;

  return (
    <div key={post.id} className="flex gap-3 border-b border-slate-400 p-4">
      <Image
        alt={`@${author.username}'s profile picture`}
        src={author.profileImageUrl}
        className="h-14 w-14 rounded-full"
        width={56}
        height={56}
      />
      <div className="flex flex-col">
        <div className="flex gap-1 text-slate-300">
          <Link href={`/@${author.username}`}>
            <span> {`@${author.username}`}</span>
          </Link>

          <Link href={`/post/${post.id}`}>
            <span
              className="font-thin"
              title={dayjs(post.createdAt).toString()}
            >{`· ${dayjs(post.createdAt).fromNow()}`}</span>
          </Link>
        </div>
        <span className="text-xl">{post.content}</span>
      </div>
    </div>
  );
};
