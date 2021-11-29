import styles from "../styles/ProfileSelect.module.css";
import { TittleBar } from "../components/TittleBar";
import { MetaHeader } from "../components/MetaHeader";
import {
  UserProfile,
  UserProfileSize,
  UserProfileType,
} from "../components/UserProfile";
import { GetStaticProps } from "next";
import { AregaloBackendClient, User } from "../packages/aregalo-backend";

interface ProfileSelectProps {
  users: User[];
}

const UserLink = (user: User) => (
  <div className="col text-center">
    <div className="d-inline-block border border-2 rounded-3 border-light bg-light">
      <a href={`/${user.name}`}>
        <UserProfile
          user={user}
          type={UserProfileType.Down}
          size={UserProfileSize.Big}
          border={true}
        />
      </a>
    </div>
  </div>
);

export default function ProfileSelect({ users }: ProfileSelectProps) {
  return (
    <div>
      <MetaHeader
        title={"Aregalo"}
        description={"The application to manage your presents"}
      />
      <TittleBar text={"Aregalo"} image={"gift.png"} />
      <div className={`container text-center ${styles.title}`}>
        <h1>¿Quién eres?</h1>
      </div>
      <br />
      <div className={`container  ${styles.userSelect}`}>
        <div className="row">{users.map((user) => UserLink(user))}</div>
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const client = new AregaloBackendClient("http://127.0.0.1:8757/aregalo");
  const users = await client.getUsers();
  return { props: { users } };
};
