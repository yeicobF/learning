import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { api } from "~/utils/api";

const ProfileFeed = (props: { userId: string }) => {
  const { data, isLoading } = api.posts.getPostsByUserId.useQuery({
    userId: props.userId,
  });

  if (isLoading) return <LoadingPage />;

  if (!data || data.length === 0) return <div>User has not posted</div>;

  return (
    <div className="flex flex-col">
      {data.map((fullPost) => (
        <PostView {...fullPost} key={fullPost.post.id} />
      ))}
    </div>
  );
};

const ProfilePage: NextPage<{ username: string }> = ({ username }) => {
  const { data, isLoading } = api.profile.getUserByUsername.useQuery({
    username,
  });

  console.log({ data, isLoading, username });

  if (!data) return <div>404</div>;

  return (
    <>
      <Head>
        <title>{data.username}</title>
      </Head>
      <PageLayout>
        <div className="relative h-36  bg-slate-600">
          <Image
            src={data.profileImageUrl}
            alt={`${data.username ?? ""}'s profile pic`}
            width={128}
            height={128}
            className="absolute bottom-0 left-0 -mb-[64px] ml-4 rounded-full border-4 border-black bg-black"
          />
        </div>
        <div className="h-[64px]"></div>
        <div className="p-4 text-2xl font-bold">
          {`@${data.username ?? ""}`}
        </div>
        <div className="w-full border-b border-slate-400" />
        <ProfileFeed userId={data.id} />
      </PageLayout>
    </>
  );
};

import { createServerSideHelpers } from "@trpc/react-query/server";
import { appRouter } from "~/server/api/root";
import { prisma } from "~/server/db";
import SuperJSON from "superjson";
import { PageLayout } from "~/components/layout";
import Image from "next/image";
import { LoadingPage } from "~/components/loading";
import { PostView } from "~/components/postview";

// La forma más sencilla de tipar los parámetros es tipando la función (variable
//  en este caso) directamente.
//
// Al obtener los datos 'ahead of time', no habrá un loading state, ya que al
// cargar la página en el cliente, los datos ya estarán disponibles.
export const getStaticProps: GetStaticProps = async (context) => {
  const ssgHelpers = createServerSideHelpers({
    router: appRouter,
    ctx: {
      prisma,
      userId: null,
    },
    transformer: SuperJSON, // optional - adds superjson serialization
  });

  const slug = context.params?.slug;

  if (typeof slug !== "string") throw new Error("No slug");

  const username = slug.replace("@", "");

  // Prefetch nos permite obtener los datos "ahead of time" para después
  // 'hidrate them' mediante `server side props`.
  await ssgHelpers.profile.getUserByUsername.prefetch({ username });

  return {
    props: {
      // Aquí tendremos que `dehydrate` los datos que queremos enviar al
      // cliente. Toma todos los datos que hemos obtenido, los pone en una forma
      // que puede ser parseada por `getServerSideProps` y `getStaticProps` de
      // Next.js (serializar), y en `_app` hidratamos los datos con
      // `react-query` al estar encapsulado en `TRPC`.
      trpcState: ssgHelpers.dehydrate(),
      username,
    },
  };
};

// Si utilizamos `getStaticProps`, tenemos que devolver los `paths`, aunque
// podemos indicar que no los queremos generar 'ahead of time' para generarlos
// 'on load'.
export const getStaticPaths = () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export default ProfilePage;
