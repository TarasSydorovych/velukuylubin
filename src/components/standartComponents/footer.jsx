import css from "./header.module.css";
import Image from "next/image";
import logoVelukui from "../../img/logoVelukuii.png";
import Link from "next/link";
import { AiFillTikTok } from "react-icons/ai";
import { FaInstagramSquare } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className={css.footerWrap}>
      {" "}
      <Image
        src={logoVelukui}
        alt="Суші Великий Любіню"
        className={css.logoInFooter}
        priority
      />
      <div className={css.wrapNumber}>
        <p className={css.teleA}>Телефон:</p>
        <a href="tel:0960590274" className={css.linkPhoneIn}>
          +380960590274
        </a>
      </div>
      <div className={css.wrapNumber}>
        <p className={css.teleA}>Ми на звʼязку:</p>
        <p className={css.pInFooterI}>
          Пн-Сб з 10:00 до 21:00
          <br /> Неділя з 10:00 до 20:00
        </p>
      </div>
      <div className={css.wrapNumber}>
        <p className={css.teleA}>Адреси:</p>
        <p className={css.pInFooterISmall}>
          1.Вулиця Львівська 184, Зимна вода, Львівська Область
          <br /> 2.Вулиця Львівська 184, селище Великий Любінь, Львівська
          Область
        </p>
      </div>
      <div className={css.wrapNumber}>
        <p className={css.teleA}>Підпишись:</p>
        <p className={css.pInFooterISmall}>
          <a
            href="https://www.tiktok.com/@sushi_velukuilubin"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="TikTok"
          >
            <AiFillTikTok className={css.iFillTikTok} />
          </a>
          <a
            href="https://www.instagram.com/sushi_velukuilybin/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <FaInstagramSquare className={css.aInstagramSquare} />
          </a>
        </p>
      </div>
    </footer>
  );
};
export default Footer;
