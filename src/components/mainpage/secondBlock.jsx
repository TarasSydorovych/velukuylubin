import css from "./main.module.css";
import newrKKD from "../../img/newrKKD.png";
import Image from "next/image";
import runSush from "../../img/runSush.png";
import newForTwoBlock from "../../img/newForTwoBlock.png";
import packegSushi from "../../img/packegSushi.png";
import discountJD from "../../img/discountJD.png";
import twoFortwo from "../../img/twoFortwo.png";
import birset from "../../img/birset.png";
import oneAoo from "../../img/oneAoo.png";
import twoIds from "../../img/twoIds.png";
import threlfkdj from "../../img/threlfkdj.png";
import fourkjfd from "../../img/fourkjfd.png";
import fiveJS from "../../img/fiveJS.png";
import sixKJD from "../../img/sixKJD.png";
import sevenKJD from "../../img/sevenKJD.png";
import eightKJd from "../../img/eightKJd.png";
import ninejkfd from "../../img/ninejkfd.png";
import Link from "next/link";
const SecondBlock = () => {
  return (
    <section className={css.wrapSecondBlock}>
      <p className={css.pGetDiscount}>
        Лови вигоду разом із нашими пропозиціями!
      </p>
      <div className={css.discountWrapL}>
        <div className={css.wrapOneDisc}>
          <p className={css.pInFirstBlocko}>Безкоштовна доставка</p>
          <Image
            src={runSush}
            alt="Суші Великий Любіню"
            className={css.runSush}
            priority
          />{" "}
          <Image
            src={newrKKD}
            alt="Суші Великий Любіню"
            className={css.newrKKD}
            priority
          />
          <Link href={`/menu`} className={css.buttonZamov}>
            ЗАМОВИТИ
          </Link>
        </div>
        <div className={css.wrapOneDisc}>
          <p className={css.pInFirstBlocko}>Акції</p>
          <Image
            src={packegSushi}
            alt="Суші Великий Любіню"
            className={css.runSush}
            priority
          />{" "}
          <Image
            src={newForTwoBlock}
            alt="Суші Великий Любіню"
            className={css.newForTwoBlock}
            priority
          />
          <Image
            src={discountJD}
            alt="Суші Великий Любіню"
            className={css.discountJD}
            priority
          />
          <Image
            src={twoFortwo}
            alt="Суші Великий Любіню"
            className={css.twoFortwo}
            priority
          />
          <Image
            src={birset}
            alt="Суші Великий Любіню"
            className={css.birset}
            priority
          />
          <div className={css.buttonZamov}>ТИЦЬ СЮДИ</div>
        </div>
      </div>
      <Image
        src={oneAoo}
        alt="Суші Великий Любіню"
        className={css.oneAoo}
        priority
      />
      <Image
        src={twoIds}
        alt="Суші Великий Любіню"
        className={css.twoIds}
        priority
      />
      <Image
        src={threlfkdj}
        alt="Суші Великий Любіню"
        className={css.threlfkdj}
        priority
      />
      <Image
        src={fourkjfd}
        alt="Суші Великий Любіню"
        className={css.fourkjfd}
        priority
      />
      <Image
        src={fiveJS}
        alt="Суші Великий Любіню"
        className={css.fiveJS}
        priority
      />
      <Image
        src={sixKJD}
        alt="Суші Великий Любіню"
        className={css.sixKJD}
        priority
      />
      <Image
        src={sevenKJD}
        alt="Суші Великий Любіню"
        className={css.sevenKJD}
        priority
      />
      <Image
        src={eightKJd}
        alt="Суші Великий Любіню"
        className={css.eightKJd}
        priority
      />
      <Image
        src={ninejkfd}
        alt="Суші Великий Любіню"
        className={css.ninejkfd}
        priority
      />
    </section>
  );
};
export default SecondBlock;
