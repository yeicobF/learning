import { SignInButton, useUser } from "@clerk/nextjs";
import { type NextPage } from "next";
import { api } from "~/utils/api";

import dayjs from "dayjs";
import Image from "next/image";
import { LoadingPage, LoadingSpinner } from "~/components/loading";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { PageLayout } from "~/components/layout";
import { PostView } from "~/components/postview";


const CreatePostWizard = () => {
  const { user } = useUser();

  const [input, setInput] = useState<string>("");

  const ctx = api.useContext();

  const { mutate, isLoading: isPosting } = api.posts.create.useMutation({
    onSuccess: () => {
      setInput("");
      // Invalidar la caché de los posts.
      // - Con `void` indicamos que no nos importa si se trata de una promesa o
      //   no, sino que queremos que suceda en el backend nada más.
      void ctx.posts.getAll.invalidate();
    },
    onError: (e) => {
      const errorMessage = e.data?.zodError?.fieldErrors.content;

      // if (errorMessage && errorMessage[0]) {
      if (errorMessage?.[0]) {
        toast.error(errorMessage[0]);
        return;
      }

      toast.error("Failed to post! Please try again later.");
    },
  });

  console.log({ user });

  if (!user) return null;

  return (
    <form
      className="flex w-full gap-3"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <Image
        src={user.profileImageUrl}
        alt="Profile image"
        className="h-14 w-14 rounded-full"
        width={56}
        height={56}
      />
      <input
        placeholder="Type some emojis!"
        className="grow bg-transparent outline-none"
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        disabled={isPosting}
        onKeyDown={(e) => {
          if (e.key !== "Enter") return;
          if (input === "") return;
          e.preventDefault();

          mutate({ content: input });
        }}
      />
      {input !== "" && !isPosting && (
        <button onClick={() => mutate({ content: input })} type="submit">
          Post
        </button>
      )}

      {isPosting && (
        <div className="flex items-center justify-center">
          <LoadingSpinner size={20} />
        </div>
      )}
    </form>
  );
};

const Feed = () => {
  /**
   * TRPC nos deja crear funciones que se ejecutan en el servidor, que en este
    caso es Vercel. Nos permite obtener datos de la BD, por ejemplo. No nos
    conectamos directamente a la BD. Desplegamos esta forma de conectarnos a la
    BD, facilitando incluso la forma en la que nos conectamos para obtener esta
    información, a pesar de que se encuentre en otro servidor. 
  */
  const { data, isLoading: postsLoading } = api.posts.getAll.useQuery();

  // Return empty div if BOTH aren'tz loaded, since user tends to load faster.
  if (postsLoading) return <LoadingPage />;

  if (!data) return <div>Something went wrong!</div>;

  return (
    <div className="flex flex-col">
      {data.map((fullPost) => (
        <PostView {...fullPost} key={fullPost.post.id} />
      ))}
    </div>
  );
};

const Home: NextPage = () => {
  const { isLoaded: userLoaded, isSignedIn } = useUser();

  // Start fetching ASAP.
  // > Con React Query, solo se necesita obtener los datos. Mientras que los
  // datos sean los mismos, podemos utilizar la caché.
  api.posts.getAll.useQuery();

  // Return empty div if user isn't loaded.
  if (!userLoaded) return <div />;

  return (
    <>
      <PageLayout>
        <div className="flex border-b border-slate-400 p-4">
          {!isSignedIn && (
            <div className="flex justify-center">
              <SignInButton />
            </div>
          )}
          {isSignedIn && <CreatePostWizard />}
        </div>

        <Feed />
      </PageLayout>
    </>
  );
};

export default Home;
