import {
  AregaloBackendClient,
  GiftPresent,
  User,
} from "../../packages/aregalo-backend";
import { Dispatch, useState } from "react";
import { PresentGiftList } from "./PresentGiftList";

interface GiftListComponentProps {
  wisher: User;
  gifter: User;
  initialPresents: GiftPresent[];
  userData: Map<string, User>;
}

const addGifterFactory = (
  wisher: User,
  gifter: User,
  setPresents: Dispatch<GiftPresent[]>
): ((present: GiftPresent) => Promise<void>) => {
  return async (present: GiftPresent) => {
    try {
      const client = new AregaloBackendClient("http://127.0.0.1:8757/aregalo");
      const presents = await client.assignGifterToPresent(
        wisher.name,
        gifter.name,
        present
      );
      setPresents(presents);
    } catch (e) {
      console.error(e);
    }
  };
};

const removeGifterFactory = (
  wisher: User,
  gifter: User,
  setPresents: Dispatch<GiftPresent[]>
): ((present: GiftPresent) => Promise<void>) => {
  return async (present: GiftPresent) => {
    try {
      const client = new AregaloBackendClient("http://127.0.0.1:8757/aregalo");
      const presents = await client.removeGifterFromPresent(
        wisher.name,
        gifter.name,
        present
      );
      setPresents(presents);
    } catch (e) {
      console.error(e);
    }
  };
};

export function GiftListComponent({
  wisher,
  gifter,
  initialPresents,
  userData,
}: GiftListComponentProps) {
  const [userPresents, setPresents] = useState<GiftPresent[]>(initialPresents);
  return (
    <div>
      <PresentGiftList
        presents={userPresents}
        gifter={gifter.name}
        addGifter={addGifterFactory(wisher, gifter, setPresents)}
        removeGifter={removeGifterFactory(wisher, gifter, setPresents)}
        userData={userData}
      />
    </div>
  );
}
