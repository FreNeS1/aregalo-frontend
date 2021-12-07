import { WishPresent } from "../../packages/aregalo-backend";
import { PresentWish } from "./PresentWish";
import { Dispatch } from "react";

interface PresentWishProps {
  presents: WishPresent[];
  updatePresent: (present: WishPresent) => Promise<void>;
  setEditPresent: Dispatch<WishPresent>;
  setModalShow: Dispatch<boolean>;
  setModalUpdate: Dispatch<boolean>;
}

export function PresentWishList({
  presents,
  updatePresent,
  setEditPresent,
  setModalShow,
  setModalUpdate,
}: PresentWishProps) {
  return (
    <div className="container">
      {presents.map((present) => (
        <PresentWish
          key={present.id}
          present={present}
          updatePresent={updatePresent}
          setEditPresent={setEditPresent}
          setModalShow={setModalShow}
          setModalUpdate={setModalUpdate}
        />
      ))}
    </div>
  );
}
