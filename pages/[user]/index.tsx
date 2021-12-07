import { GetServerSideProps } from "next";
import {
  AregaloBackendClient,
  User,
  WishPresent,
} from "../../packages/aregalo-backend";
import { WishListComponent } from "../../components/PresentListComponent";
import styles from "../../styles/General.module.css";
import { MetaHeader } from "../../components/MetaHeader";
import { TittleBar } from "../../components/TittleBar";
import { ErrorComponent } from "../../components/Error";
import { Container, Row } from "react-bootstrap";
import {
  UserProfile,
  UserProfileSize,
  UserProfileType,
} from "../../components/UserProfile";
import Link from "next/link";

type WishListProps = {
  user: User;
  presents: WishPresent[];
  users: User[];
  error: string | undefined;
};

const UserGiftListLink = (gifter: User, wisher: User) => (
  <div
    key={wisher.name}
    className={`col-auto ${styles["user-button"]} text-center`}
  >
    <div className="d-inline-block border border-2 rounded-3 border-light bg-light">
      <Link href={`/${gifter.name}/${wisher.name}`}>
        <UserProfile
          user={wisher}
          type={UserProfileType.Down}
          size={UserProfileSize.Icon}
          border={true}
        />
      </Link>
    </div>
  </div>
);

export default function WishList({
  user,
  presents,
  users,
  error,
}: WishListProps) {
  return (
    <div className={styles.container}>
      <MetaHeader
        title={"Aregalo"}
        description={"The application to manage your presents"}
      />
      <TittleBar
        text={"Aregalo"}
        image={"gift.png"}
        user={error === undefined ? user : undefined}
      />
      {error != undefined ? (
        <ErrorComponent error={error} />
      ) : (
        <div>
          <br />
          <WishListComponent wisher={user} initialPresents={presents} />
          <br />
          <Container>
            <hr />
          </Container>
          <br />
          <Container>
            <Row className="justify-content-start align-items-center">
              <div className="col-auto mx-2">
                <h5 className="h5">Ver lista de regalos de: </h5>
              </div>
              {users
                .filter((u) => u.name !== user.name)
                .map((u) => UserGiftListLink(user, u))}
            </Row>
          </Container>
        </div>
      )}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const client = new AregaloBackendClient("http://127.0.0.1:8757/aregalo");
  const name = params?.user;

  try {
    const user =
      typeof name == "string"
        ? await client.getUser(name as string)
        : undefined;
    const presents =
      typeof name == "string"
        ? await client.getPresentWishList(name as string)
        : undefined;
    const users = await client.getUsers();

    if (user == undefined || presents == undefined) {
      const error = "User or present list could not be retrieved";
      return { props: { user: {}, presents: [], users: [], error } };
    }

    return { props: { user, presents, users } };
  } catch (e) {
    return { props: { user: {}, presents: [], users: [], error: e } };
  }
};
