import css from "./header.module.css";
import headerframe from "../../img/headerframe.png";
import Image from "next/image";
import logoVelukui from "../../img/logoVelukuii.png";
import Navigation from "./navigation";
import cartNfm from "../../img/cartNfm.png";
import WrapCart from "./WrapCart";
import Link from "next/link";

const Header = () => {
  return (
    <header className={css.headerWrap}>
      <Image
        src={headerframe}
        alt="Header Frame"
        className={css.headerImage}
        priority
      />
      <Link href={`/`}>
        <Image
          src={logoVelukui}
          alt="Суші Великий Любіню"
          className={css.logo}
          priority
        />
      </Link>
      <Navigation />
      <WrapCart />
    </header>
  );
};
export default Header;
