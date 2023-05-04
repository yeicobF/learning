import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { api } from "~/utils/api";
import { PageLayout } from "~/components/layout";
import { PostView } from "~/components/postview";
import { generateSSGHelper } from "~/server/helpers/ssgHelper";


const SinglePostPage: NextPage<{ id: string }> = ({ id }) => {
  const { data, isLoading } = api.posts.getById.useQuery({
    id,
  });

  console.log({ data, isLoading, id });

  if (!data) return <div>404</div>;

  return (
    <>
      <Head>
        <title>{`${data.post.content} - ${data.author.username}`}</title>
      </Head>
      <PageLayout>
        <PostView {...data} />
      </PageLayout>
    </>
  );
};

// La forma más sencilla de tipar los parámetros es tipando la función (variable
//  en este caso) directamente.
//
// Al obtener los datos 'ahead of time', no habrá un loading state, ya que al
// cargar la página en el cliente, los datos ya estarán disponibles.
export const getStaticProps: GetStaticProps = async (context) => {
  const ssgHelpers = generateSSGHelper();

  const id = context.params?.id;

  if (typeof id !== "string") throw new Error("No id");

  // Prefetch nos permite obtener los datos "ahead of time" para después
  // 'hidrate them' mediante `server side props`.
  await ssgHelpers.posts.getById.prefetch({ id });

  return {
    props: {
      // Aquí tendremos que `dehydrate` los datos que queremos enviar al
      // cliente. Toma todos los datos que hemos obtenido, los pone en una forma
      // que puede ser parseada por `getServerSideProps` y `getStaticProps` de
      // Next.js (serializar), y en `_app` hidratamos los datos con
      // `react-query` al estar encapsulado en `TRPC`.
      trpcState: ssgHelpers.dehydrate(),
      id,
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

export default SinglePostPage;
