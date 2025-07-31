import css from "./main.module.css";
import Image from "next/image";
import sonvectort from "../../img/sonvectort.png";
import twoBigF from "../../img/twoBigFLong.png";
import imagerollOne from "../../img/imagerollOne.png";
import maki from "../../img/maki.png";
import greenRoll from "../../img/greenRoll.png";
import rolleRed from "../../img/rolleRed.png";
import rollpalka from "../../img/rollpalka.png";
import vectorone from "../../img/vectorone.png";
import vectortwo from "../../img/vectortwo.png";
import vectorthre from "../../img/vectorthre.png";
import vectorfour from "../../img/vectorfour.png";
import ectorfive from "../../img/ectorfive.png";
import vectorsix from "../../img/vectorsix.png";
import vectorseven from "../../img/vectorseven.png";
import vectoreight from "../../img/vectoreight.png";
import vectornine from "../../img/vectornine.png";
import twoBigArg from "../../img/twoBigArg.png";
import Link from "next/link";
const FirstBlock = () => {
  return (
    <section className={css.wrapFirstBlock}>
      <Image
        src={sonvectort}
        alt="Суші Великий Любіню"
        className={css.sonvectort}
        priority
      />
      <Image
        src={twoBigF}
        alt="Суші Великий Любіню"
        className={css.twoBigF}
        priority
      />{" "}
      {/* <Image
        src={twoBigArg}
        alt="Суші Великий Любіню"
        className={css.twoBigArg}
        priority
      />{" "} */}
      <Image
        src={imagerollOne}
        alt="Суші Великий Любіню"
        className={css.imagerollOne}
        priority
      />
      <Image
        src={maki}
        alt="Суші Великий Любіню"
        className={css.maki}
        priority
      />
      <Image
        src={greenRoll}
        alt="Суші Великий Любіню"
        className={css.greenRoll}
        priority
      />
      <Image
        src={rolleRed}
        alt="Суші Великий Любіню"
        className={css.rolleRed}
        priority
      />
      <Image
        src={rollpalka}
        alt="Суші Великий Любіню"
        className={css.rollpalka}
        priority
      />
      <Image
        src={vectorone}
        alt="Суші Великий Любіню"
        className={css.vectorone}
        priority
      />
      <Image
        src={vectortwo}
        alt="Суші Великий Любіню"
        className={css.vectortwo}
        priority
      />
      <Image
        src={vectorthre}
        alt="Суші Великий Любіню"
        className={css.vectorthre}
        priority
      />
      <Image
        src={vectorfour}
        alt="Суші Великий Любіню"
        className={css.vectorfour}
        priority
      />
      <Image
        src={ectorfive}
        alt="Суші Великий Любіню"
        className={css.ectorfive}
        priority
      />
      <Image
        src={vectorsix}
        alt="Суші Великий Любіню"
        className={css.vectorsix}
        priority
      />
      <Image
        src={vectorseven}
        alt="Суші Великий Любіню"
        className={css.vectorseven}
        priority
      />
      <Image
        src={vectoreight}
        alt="Суші Великий Любіню"
        className={css.vectoreight}
        priority
      />
      <Image
        src={vectornine}
        alt="Суші Великий Любіню"
        className={css.vectornine}
        priority
      />
      <div className={css.wrapSmalBlock}>
        <h1 className={css.h1Main}>
          Доставка суші у Великий Любінь.
          <br />
          <span className={css.h1SpanMain}>
            Ніяких компромісів — тільки топові інгредієнти та швидка доставка!
          </span>
        </h1>
        <Link href={`/menu`} className={css.zamovutu}>
          ЗАМОВИТИ
        </Link>
        <p className={css.weInContact}>МИ НА ЗВʼЯЗКУ:</p>
        <div className={css.graficWorks}>
          <p className={css.hoursWork}>Пн-Сб з 10:00 до 21:00</p>
          <p className={css.hoursWork}>Неділя з 10:00 до 20:00</p>
        </div>
      </div>
    </section>
  );
};
export default FirstBlock;
