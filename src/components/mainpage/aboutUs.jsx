import css from "./main.module.css";
import bestShiInLubin from "../../img/bestShiInLubin.png";
import Image from "next/image";
const AboutUs = () => {
  return (
    <div className={css.wrapAboutUs}>
      <p className={css.aboutTitle}>ПРО НАС</p>
      <p className={css.descriptionAbout}>
        Ми — сімейна пара, яка одного дня вирішила не чекати і створити те, у що
        по-справжньому вірить. Без інвесторів, без великих коштів, без досвіду в
        ресторанному бізнесі. Тільки ми, наша кухня, кілька якісних інгредієнтів
        і велика любов до суші. Перші замовлення ми готували вдома, самі
        пакували й доставляли. Кожен рол — як для себе. Люди відчули цю щирість.
        Ми почали зростати. Вклали зароблене у професійне обладнання, створили
        команду, відкрили першу точку доставки. Потім — ще одну. І ми не
        зупиняємось!
      </p>
      <div className={css.wrapTwoDistl}>
        <Image
          className={css.imageForAbout}
          src={bestShiInLubin}
          alt="Доставка суші Великий Любінь"
        />
        <div className={css.wrapDopIn}>
          <p className={css.uorPerevagu}>Наші переваги:</p>
          <p className={css.dorText}>
            Завжди свіжі продукти <br />
            Чесні порції — багато риби, мінімум рису <br />
            Індивідуальний підхід.
          </p>
        </div>
      </div>
    </div>
  );
};
export default AboutUs;
