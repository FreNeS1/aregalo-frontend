import styles from "../../styles/Home.module.css";
import { MetaHeader } from "../../components/MetaHeader";
import { TittleBar } from "../../components/TittleBar";
import { GetStaticPaths, GetStaticProps } from "next";
import { AregaloBackendClient, User } from "../../packages/aregalo-backend";

type WishListProps = {
  user: User;
};

export default function WishList({ user }: WishListProps) {
  return (
    <div className={styles.container}>
      <MetaHeader
        title={"Aregalo"}
        description={"The application to manage your presents"}
      />
      <TittleBar text={"Aregalo"} image={"gift.png"} user={user} />
      <p>{`HELLO THIS IS WISH LIST FOR USER ${user.alias}`}</p>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const client = new AregaloBackendClient("http://127.0.0.1:8757/aregalo");
  const users = await client.getUsers();
  const paths = users.map((user) => ({
    params: { user: user.name },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const client = new AregaloBackendClient("http://127.0.0.1:8757/aregalo");
  const name = params?.user;
  const user =
    typeof name == "string" ? await client.getUser(name as string) : undefined;

  if (user == undefined) {
    throw new Error("User does not exist");
  }

  return { props: { user } };
};
