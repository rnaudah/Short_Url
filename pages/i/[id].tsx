import type { NextPage } from "next";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import client from "../../lib/client";

const Url_Push: NextPage = () => {
  return null;
};

export const getServerSideProps: GetServerSideProps = async (Context) => {
  const id = Context.query.id;
  const link = await client.link.findFirst({
    where: {
      id: id as string,
    },
  });
  if (link?.id) {
    return {
      redirect: {
        permanent: false,
        destination: link.link,
      },
      props: {},
    };
  } else {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
      props: {},
    };
  }
};

export default Url_Push;
