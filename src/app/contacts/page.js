import css from "../../components/contacts/contacts.module.css";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/standartComponents/header";
import Footer from "@/components/standartComponents/footer";
import { AiFillTikTok } from "react-icons/ai";
import { FaInstagramSquare } from "react-icons/fa";
export default function Contacts() {
  return (
    <div className={css.cartWrap}>
      <Header />
      <div className={css.promContact}>
        <p className={css.ourLocation}>Наші локації</p>
        <div className={css.wrapWithText}>
          <div className={css.wrapOneCart}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2579.3858081909975!2d23.743606077180814!3d49.722363671462304!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x473ae2cf91bbf75b%3A0xff6f8084f9911c78!2z0LLRg9C70LjRhtGPINCb0YzQstGW0LLRgdGM0LrQsCwgMTg0LCDQktC10LvQuNC60LjQuSDQm9GO0LHRltC90YwsINCb0YzQstGW0LLRgdGM0LrQsCDQvtCx0LvQsNGB0YLRjCwgODE1NTU!5e0!3m2!1suk!2sua!4v1753465430203!5m2!1suk!2sua"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
            <div className={css.wrpaTextL}></div>
          </div>{" "}
          <div className={css.wrpaTextL}>
            <p className={css.adressName}>
              Адреса: Львівська обл., Великий Любінь, вул. Львівська, 184
            </p>
            <a href="tel:0960590274" className={css.adressNamePhome}>
              0960590274
            </a>
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
        </div>
        <div className={css.wrapWithText}>
          <div className={css.wrapOneCart}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1605.0455323361678!2d23.9042287819441!3d49.82514233813684!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x473ae0cfdc066305%3A0xdc17bc7b42ef56!2zVHljaHlueSAyLCDQstGD0LsuINCi0LjRh9C40L3QuCwgMiwgUy5aeW1uYSBWb2RhLCDQm9GM0LLRltCy0YHRjNC60LAg0L7QsdC70LDRgdGC0YwsIDgxMTEw!5e0!3m2!1suk!2sua!4v1753465487419!5m2!1suk!2sua"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>{" "}
          </div>{" "}
          <div className={css.wrpaTextL}>
            {" "}
            <p className={css.adressName}>
              Адреса: Львівська обл., Зимна Вода, вул. П. Тичини, 2
            </p>
            <a href="tel:0632741474" className={css.adressNamePhome}>
              0632741474
            </a>
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
        </div>
      </div>
      <Footer />
    </div>
  );
}
