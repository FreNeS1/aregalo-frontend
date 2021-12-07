import styles from "./PresentGift.module.css";
import { GiftPresent, User } from "../../packages/aregalo-backend";
import Image from "next/image";
import { UserProfile, UserProfileSize, UserProfileType } from "../UserProfile";

interface PresentWishProps {
  present: GiftPresent;
  gifter: string;
  addGifter: (present: GiftPresent) => Promise<void>;
  removeGifter: (present: GiftPresent) => Promise<void>;
  userData: Map<string, User>;
}

export function PresentGift({
  present,
  gifter,
  addGifter,
  removeGifter,
  userData,
}: PresentWishProps) {
  const isGifter = present.assignedTo.includes(gifter);
  return (
    <div
      className={`${styles["gift-item"]} bg-light border border-black border-1 rounded-2`}
    >
      <div className="row align-items-center" key={`${present.id}-title`}>
        <div className="col-5 h4">{present.title}</div>
        <div className="col-2 h6 text-center">
          {present.price != undefined ? `${present.price / 100} €` : ""}
        </div>
        <div className="col-2 h6 text-center">
          {present.link != undefined ? <a href={present.link}>enlace</a> : ""}
        </div>
        <div className="col-2 text-center">
          <div className="d-inline-flex flex-wrap">
            {present.assignedTo.map((user) => {
              if (!userData.has(user)) {
                console.error(`Missing user data for user ${user}`);
              } else {
                return (
                  <UserProfile
                    key={`${present.id}-assigned-${user}`}
                    user={userData.get(user)!}
                    type={UserProfileType.Down}
                    size={UserProfileSize.Icon}
                    border={true}
                  />
                );
              }
            })}
          </div>
        </div>
        <div className="col-1 text-center">
          <Image
            className={styles.clickable}
            src={isGifter ? "/img/minus.png" : "/img/plus.png"}
            width={22}
            height={22}
            onClick={() => {
              if (isGifter) {
                removeGifter(present).catch((e) => console.error(e));
              } else {
                addGifter(present).catch((e) => console.error(e));
              }
            }}
          />
        </div>
      </div>
      <div className="row" key={`${present.id}-description`}>
        <div className="col">{present.description}</div>
      </div>
    </div>
  );
}
