import Image from "next/image";
import { User } from "../../packages/aregalo-backend";

interface TittleBarProps {
  image: string;
  text: string;
  user?: User;
}

const UserProfile = (user: User) => {
  return (
    <a href={`/${user.name}`} className="d-flex align-items-center">
      <span className="mx-3 fs-4 text-dark text-decoration-none">
        {user.alias}
      </span>
      <Image src={`/img/${user.image}`} width="64" height="64" />
    </a>
  );
};

export function TittleBar({ text, image, user }: TittleBarProps) {
  return (
    <header className="py-3 mb-4 border-bottom">
      <div className="container d-flex justify-content-between">
        <a href="/" className="d-flex align-items-center">
          <Image src={`/img/${image}`} width="64" height="64" />
          <span className="mx-3 fs-3 text-dark text-decoration-none">
            {text}
          </span>
        </a>
        {user != undefined && UserProfile(user)}
      </div>
    </header>
  );
}
