import {
  AregaloBackendClient,
  User,
  WishCreatePresent,
  WishPresent,
} from "../../packages/aregalo-backend";
import { Dispatch, useState } from "react";
import { PresentWishList } from "./PresentWishList";
import { PresentModal } from "./PresentModal";
import { PresentAddButton } from "./PresentAddButton";

interface WishListComponentProps {
  wisher: User;
  initialPresents: WishPresent[];
}

const addPresentFactory = (
  wisher: User,
  setPresents: Dispatch<WishPresent[]>
): ((present: WishCreatePresent) => Promise<void>) => {
  return async (present: WishCreatePresent) => {
    try {
      const client = new AregaloBackendClient("http://127.0.0.1:8757/aregalo");
      const presents = await client.createPresent(wisher.name, present);
      setPresents(presents);
    } catch (e) {
      console.error(e);
    }
  };
};

const updatePresentFactory = (
  wisher: User,
  setPresents: Dispatch<WishPresent[]>
): ((present: WishPresent) => Promise<void>) => {
  return async (present: WishPresent) => {
    try {
      const client = new AregaloBackendClient("http://127.0.0.1:8757/aregalo");
      const presents = await client.updatePresent(wisher.name, present);
      setPresents(presents);
    } catch (e) {
      console.error(e);
    }
  };
};

const deletePresentFactory = (
  wisher: User,
  setPresents: Dispatch<WishPresent[]>
): ((present: WishPresent) => Promise<void>) => {
  return async (present: WishPresent) => {
    try {
      const client = new AregaloBackendClient("http://127.0.0.1:8757/aregalo");
      const presents = await client.deletePresent(wisher.name, present);
      setPresents(presents);
    } catch (e) {
      console.error(e);
    }
  };
};

export function WishListComponent({
  wisher,
  initialPresents,
}: WishListComponentProps) {
  const [userPresents, setPresents] = useState<WishPresent[]>(initialPresents);
  const [editPresent, setEditPresent] = useState<WishPresent>(
    new WishPresent(0, "", "", false)
  );
  const [modalShow, setModalShow] = useState<boolean>(false);
  const [modalUpdate, setModalUpdate] = useState<boolean>(false);

  return (
    <div>
      <PresentModal
        displayPresent={editPresent}
        modalShow={modalShow}
        setModalShow={setModalShow}
        updateFlag={modalUpdate}
        createPresent={addPresentFactory(wisher, setPresents)}
        updatePresent={updatePresentFactory(wisher, setPresents)}
        deletePresent={deletePresentFactory(wisher, setPresents)}
      />
      <PresentWishList
        presents={userPresents}
        updatePresent={updatePresentFactory(wisher, setPresents)}
        setEditPresent={setEditPresent}
        setModalShow={setModalShow}
        setModalUpdate={setModalUpdate}
      />
      <PresentAddButton
        setEditPresent={setEditPresent}
        setModalShow={setModalShow}
        setModalUpdate={setModalUpdate}
      />
    </div>
  );
}
