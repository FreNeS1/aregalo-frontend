import styles from "../../styles/General.module.css";
import { MetaHeader } from "../../components/MetaHeader";
import { TittleBar } from "../../components/TittleBar";
import { GetServerSideProps } from "next";
import {
  AregaloBackendClient,
  GiftPresent,
  User,
} from "../../packages/aregalo-backend";
import { ErrorComponent } from "../../components/Error";
import { GiftListComponent } from "../../components/GiftListWidget";

type GiftListProps = {
  wisher: User;
  gifter: User;
  presents: GiftPresent[];
  userData: [string, User][];
  error: string | undefined;
};

export default function GiftList({
  wisher,
  gifter,
  presents,
  userData,
  error,
}: GiftListProps) {
  return (
    <div className={styles.container}>
      <MetaHeader
        title={"Aregalo"}
        description={"The application to manage your presents"}
      />
      <TittleBar
        text={"Aregalo"}
        image={"gift.png"}
        user={error === undefined ? gifter : undefined}
      />
      {error != undefined ? (
        <ErrorComponent error={error} />
      ) : (
        <GiftListComponent
          wisher={wisher}
          gifter={gifter}
          initialPresents={presents}
          userData={new Map(userData)}
        />
      )}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const client = new AregaloBackendClient("http://127.0.0.1:8757/aregalo");
  const wisherName = params?.wisher;
  const gifterName = params?.user;

  try {
    const wisher =
      typeof wisherName == "string"
        ? await client.getUser(wisherName as string)
        : undefined;
    const gifter =
      typeof gifterName == "string"
        ? await client.getUser(gifterName as string)
        : undefined;
    const presents =
      typeof wisherName == "string" && typeof gifterName == "string"
        ? await client.getGiftPresentList(
            wisherName as string,
            gifterName as string
          )
        : undefined;
    const users = await client.getUsers();
    const userData = users.map((user) => [user.name, user] as [string, User]);
    if (wisher == undefined || gifter == undefined || presents == undefined) {
      const error = "User or present list could not be retrieved";
      return {
        props: { wisher: {}, gifter: {}, presents: [], userData: {}, error },
      };
    }

    return { props: { wisher, gifter, presents, userData } };
  } catch (e) {
    return {
      props: { wisher: {}, gifter: {}, presents: [], userData: {}, error: e },
    };
  }
};
