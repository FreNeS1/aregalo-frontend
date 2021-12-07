import styles from "../styles/General.module.css";
import { TittleBar } from "../components/TittleBar";
import { MetaHeader } from "../components/MetaHeader";
import {
  UserProfile,
  UserProfileSize,
  UserProfileType,
} from "../components/UserProfile";
import { GetStaticProps } from "next";
import { AregaloBackendClient, User } from "../packages/aregalo-backend";
import { Col, Container, Row } from "react-bootstrap";
import { ErrorComponent } from "../components/Error";
import Link from "next/link";

interface ProfileSelectProps {
  error: string | undefined;
  users: User[];
}

const UserLink = (user: User) => (
  <Col key={user.name} className={`${styles["user-button"]} text-center`}>
    <div className="d-inline-block border border-2 rounded-3 border-light bg-light">
      <Link href={`/${user.name}`}>
        <UserProfile
          user={user}
          type={UserProfileType.Down}
          size={UserProfileSize.Big}
          border={true}
        />
      </Link>
    </div>
  </Col>
);

export default function ProfileSelect({ users, error }: ProfileSelectProps) {
  return (
    <div>
      <MetaHeader
        title={"Aregalo"}
        description={"The application to manage your presents"}
      />
      <TittleBar text={"Aregalo"} image={"gift.png"} />
      {error != undefined ? (
        <ErrorComponent error={error} />
      ) : (
        <Container className={styles.userSelect}>
          <Row className="text-center">
            <h2 className="h2">Quién eres?</h2>
          </Row>
          <Row>
            <br />
          </Row>
          <Row>{users.map((user) => UserLink(user))}</Row>
        </Container>
      )}
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const client = new AregaloBackendClient("http://127.0.0.1:8757/aregalo");
  try {
    const users = await client.getUsers();
    return { props: { users } };
  } catch (e) {
    return { props: { users: [], error: e } };
  }
};
