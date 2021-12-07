import { GiftPresent, User } from "../../packages/aregalo-backend";
import { PresentGift } from "./PresentGift";

interface PresentWishProps {
  presents: GiftPresent[];
  gifter: string;
  addGifter: (present: GiftPresent) => Promise<void>;
  removeGifter: (present: GiftPresent) => Promise<void>;
  userData: Map<string, User>;
}

export function PresentGiftList({
  presents,
  gifter,
  addGifter,
  removeGifter,
  userData,
}: PresentWishProps) {
  return (
    <div className="container">
      {presents.map((present) => (
        <PresentGift
          key={present.id}
          gifter={gifter}
          present={present}
          addGifter={addGifter}
          removeGifter={removeGifter}
          userData={userData}
        />
      ))}
    </div>
  );
}
