import styles from "./UserProfile.module.css";
import { User } from "../../packages/aregalo-backend";
import Image from "next/image";

export enum UserProfileType {
  None,
  Left,
  Down,
  Right,
}

export enum UserProfileSize {
  Icon,
  Small,
  Big,
}

interface UserProfileProps {
  user: User;
  type?: UserProfileType;
  size?: UserProfileSize;
  border?: boolean;
}

const UserText = (name: string, textSize: number) => (
  <span className={`fs-${textSize} text-dark text-decoration-none`}>
    {name.toUpperCase()}
  </span>
);

export function UserProfile({
  user,
  type = UserProfileType.None,
  size = UserProfileSize.Small,
  border = true,
}: UserProfileProps) {
  const borderClass = border
    ? "bg-light border border-black border-1 rounded-2"
    : "";
  let imageSize = 0;
  let textSize = 0;
  let cardSize = "";
  switch (size) {
    case UserProfileSize.Icon:
      cardSize = "icon";
      imageSize = 32;
      textSize = 7;
      break;
    case UserProfileSize.Small:
      cardSize = "small";
      imageSize = 64;
      textSize = 5;
      break;
    case UserProfileSize.Big:
      cardSize = "big";
      imageSize = 86;
      textSize = 3;
      break;
  }

  if (type === UserProfileType.Down) {
    return (
      <div
        className={`container ${
          styles[`user-profile-vertical-${cardSize}`]
        } ${borderClass}`}
      >
        <div className="row-cols-auto">
          <div className="col">
            <Image
              src={`/img/${user.image}`}
              width={imageSize}
              height={imageSize}
            />{" "}
          </div>
        </div>
        <div className="row-cols-auto">
          <div className="col">{UserText(user.alias, textSize)}</div>
        </div>
      </div>
    );
  } else if (type === UserProfileType.Left || type == UserProfileType.Right) {
    return (
      <div
        className={`container ${
          styles[`user-profile-horizontal-${cardSize}`]
        } ${borderClass}`}
      >
        <div className="row align-items-center justify-content-center">
          {type === UserProfileType.Left && (
            <div className="col-auto"> {UserText(user.alias, textSize)} </div>
          )}
          <div className="col-auto">
            <Image
              src={`/img/${user.image}`}
              width={imageSize}
              height={imageSize}
            />
          </div>
          {type === UserProfileType.Right && (
            <div className="col-auto"> {UserText(user.alias, textSize)} </div>
          )}
        </div>
      </div>
    );
  } else {
    return (
      <div
        className={`container ${
          styles[`user-profile-no-text-${cardSize}`]
        } ${borderClass}`}
      >
        <div className="row align-items-center justify-content-center">
          <div className="col-auto">
            <Image
              src={`/img/${user.image}`}
              width={imageSize}
              height={imageSize}
            />
          </div>
        </div>
      </div>
    );
  }
}
