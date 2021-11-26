import styles from "../styles/Home.module.css";
import { TittleBar } from "../components/TittleBar";
import { MetaHeader } from "../components/MetaHeader";

export default function ProfileSelect() {
  return (
    <div className={styles.container}>
      <MetaHeader
        title={"Aregalo"}
        description={"The application to manage your presents"}
      />
      <TittleBar text={"Aregalo"} image={"gift.png"} />
      <p>HELLO THIS IS PROFILE SELECT PAGE</p>
    </div>
  );
}
