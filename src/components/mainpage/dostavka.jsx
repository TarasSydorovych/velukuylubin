import css from "./main.module.css";
const Dostavka = () => {
  return (
    <div className={css.dostavka}>
      <p className={css.planDostP}>Планові безкоштовні доставки</p>
      <p className={css.pidPds}>
        Суші їдуть до вас! Перевірте графік для свого міста та замовляйте з
        комфортом.
      </p>
      <div className={css.wrapDostavkaBlocks}>
        <div className={css.oneBlockDostavka}>
          <p className={css.topInOneProd}>
            Городок <br />
            <span className={css.spantopInOneProd}>
              Через Черляни, назад через Мавковичі.
            </span>
          </p>
          <p className={css.thedata}>
            Пн: 15:45 / 19:30–45 / 21:15–30;
            <br /> Вт: 13:00/ 17:00/ 19:30–45/ 21:15–30;
            <br /> Ср: 13:00/ 15:45/ 18:00/ 20:50–21:15;
            <br /> Чт: 13:00/ 15:45/ 19:30–45/ 21:15–30;
            <br /> Пт: 13:00/ 15:45/ 19:30–45/ 21:15–30;
            <br /> Сб: 15:45 / 19:30–45 / 21:15–30;
            <br /> Нд: 13:00 / 15:45 / 18:45 / 20:15; Доставка у села +30 хв.
          </p>
        </div>
        <div className={css.oneBlockDostavka}>
          <p className={css.topInOneProd}>
            Рудки <br />
            <span className={css.spantopInOneProd}>
              Проїздом через Градівка, Коропуж, Завидовичі.
            </span>
          </p>
          <p className={css.thedata}>
            Пн: 15:00 / 19:00 / 20:50; <br /> Вт: 19:00 / 20:50; <br /> Ср:
            15:00 / 19:00; <br /> Чт: 19:00 / 20:50; <br /> Пт: 15:00 / 19:00;
            <br />
            Сб: 15:00 / 19:00 / 20:50; <br /> Нд: 15:00 / 18:00 / 20:00.
          </p>
        </div>
        <div className={css.oneBlockDostavka}>
          <p className={css.topInOneProd}>
            Комарно <br />
            <span className={css.spantopInOneProd}>Проїздом через села.</span>
          </p>
          <p className={css.thedata}>
            Пн: 16:30–17:00 / 20:15; <br />
            Вт: 14:00 / 20:15–30; <br /> Ср: 13:45 / 17:00 / 20:15–30; <br />{" "}
            Чт: 14:00 / 20:15–30; <br /> Пт: 17:00 / 20:15–30; <br /> Сб: 17:00
            / 20:15–20:30; <br /> Нд: 14:00 / 19:30.
          </p>
        </div>
      </div>
    </div>
  );
};
export default Dostavka;
