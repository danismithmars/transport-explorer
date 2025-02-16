import styles from "./style.module.scss";
import SearchBar from "../SearchBar";
import Notification from "../Alerts";
import Logo from "../../assets/logo.svg";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img src={Logo} alt="Corsearch" />
      </div>
      <h1 className={styles.title}>HSL Transport Dashboard(Test)</h1>
      <div className={styles.right}>
        <SearchBar />
        <Notification />
      </div>
    </header>
  );
};

export default Header;
