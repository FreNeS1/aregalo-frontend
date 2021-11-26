import Head from "next/head";

interface MetaHeaderProps {
  title: string;
  description: string;
}

export function MetaHeader({ title, description }: MetaHeaderProps) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
}
