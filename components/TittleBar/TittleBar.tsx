import Image from "next/image";
import Link from "next/link";
import { UserProfile, UserProfileSize, UserProfileType } from "../UserProfile";
import { User } from "../../packages/aregalo-backend";

interface TittleBarProps {
  image: string;
  text: string;
  user?: User;
  userProfileTextType?: UserProfileType;
}

export function TittleBar({ text, image, user }: TittleBarProps) {
  return (
    <header className="py-3 mb-4 border-bottom">
      <div className="container-xl d-flex justify-content-between">
        <Link href="/">
          <div className="d-flex align-items-center">
            <Image src={`/img/${image}`} width="64" height="64" />
            <span className="mx-3 fs-3 text-dark text-decoration-none">
              {text}
            </span>
          </div>
        </Link>
        {user != undefined && (
          <Link href={`/${user.name}`}>
            {UserProfile({
              user: user,
              type: UserProfileType.Left,
              size: UserProfileSize.Small,
              border: false,
            })}
          </Link>
        )}
      </div>
    </header>
  );
}
