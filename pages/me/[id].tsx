import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { ParsedUrlQuery } from "querystring";

interface Props {
  chat: Chat;
}

interface Params extends ParsedUrlQuery {
  id: string;
}

interface Chat {
  id: string;
  user_id: number;
  data: {
    [key: string]: any;
  };
  created_at: Date;
  updated_at: Date;
}

const ChatResults: NextPage<Props> = ({ chat }) => {
  return (
    <div>
      <Head>
        <title>Gretabot 2000 result</title>
        <meta name="description" content="Some meta" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Welcome ME</h1>
        <code><pre>{JSON.stringify(chat, null, 4)}</pre></code>
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as Params;
  const res = await fetch(`${process.env.API_HOST}/chats/${id}`);
  const json = await res.json();
  return { props: { chat: json } };
};

export default ChatResults;
