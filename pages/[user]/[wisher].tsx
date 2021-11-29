import styles from "../../styles/ProfileSelect.module.css";
import { MetaHeader } from "../../components/MetaHeader";
import { TittleBar } from "../../components/TittleBar";
import { GetStaticPaths, GetStaticProps } from "next";
import { AregaloBackendClient, User } from "../../packages/aregalo-backend";

type GiftListProps = {
  user: User;
  wisher: User;
};

export default function GiftList({ user, wisher }: GiftListProps) {
  return (
    <div className={styles.container}>
      <MetaHeader
        title={"Aregalo"}
        description={"The application to manage your presents"}
      />
      <TittleBar text={"Aregalo"} image={"gift.png"} user={user} />
      <p>{`HELLO THIS IS WISH LIST FOR USER ${wisher.alias} VIEWED BY ${user.alias}`}</p>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const client = new AregaloBackendClient("http://127.0.0.1:8757/aregalo");
  const users = await client.getUsers();
  const paths = users.flatMap((user) =>
    users
      .filter((u) => u != user)
      .map((wisher) => ({ params: { user: user.name, wisher: wisher.name } }))
  );

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const client = new AregaloBackendClient("http://127.0.0.1:8757/aregalo");
  const userName = params?.user;
  const wisherName = params?.wisher;
  const user =
    typeof userName == "string"
      ? await client.getUser(userName as string)
      : undefined;
  const wisher =
    typeof wisherName == "string"
      ? await client.getUser(wisherName as string)
      : undefined;

  if (user == undefined) {
    throw new Error("User does not exist");
  }

  return { props: { user, wisher } };
};
