import styles from "./PresentWish.module.css";
import { WishPresent } from "../../packages/aregalo-backend";
import Image from "next/image";
import { Dispatch } from "react";

interface PresentWishProps {
  present: WishPresent;
  updatePresent: (present: WishPresent) => Promise<void>;
  setEditPresent: Dispatch<WishPresent>;
  setModalShow: Dispatch<boolean>;
  setModalUpdate: Dispatch<boolean>;
}

const favouritePresentToggle = (
  present: WishPresent,
  updatePresent: (present: WishPresent) => Promise<void>
) => {
  present.favourite = !present.favourite;
  updatePresent(present).catch((e) => console.error(e));
};

export function PresentWish({
  present,
  updatePresent,
  setEditPresent,
  setModalShow,
  setModalUpdate,
}: PresentWishProps) {
  return (
    <div
      className={`${styles["present-item"]} bg-light border border-black border-1 rounded-2`}
    >
      <div className="row align-items-center" key={`${present.id}-title`}>
        <div className="col-6 h4">{present.title}</div>
        <div className="col-2 h6 text-center">
          {present.price != undefined ? `${present.price / 100} €` : ""}
        </div>
        <div className="col-2 h6 text-center">
          {present.link != undefined ? <a href={present.link}>enlace</a> : ""}
        </div>
        <div className="col-1 text-center">
          <Image
            className={styles.clickable}
            src={
              present.favourite ? "/img/star_fill.png" : "/img/star_empty.png"
            }
            width={22}
            height={22}
            onClick={() => favouritePresentToggle(present, updatePresent)}
          />
        </div>
        <div className="col-1 text-center">
          <Image
            className={styles.clickable}
            src={`/img/edit.png`}
            width={22}
            height={22}
            onClick={() => {
              setEditPresent(present);
              setModalUpdate(true);
              setModalShow(true);
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
