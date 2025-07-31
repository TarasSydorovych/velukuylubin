// import css from "./header.module.css";
// import Link from "next/link";

// const Navigation = () => {
//   return (
//     <nav className={css.navigations}>
//       <ul className={css.navList}>
//         <li className={css.liOnl}>
//           <Link className={css.liOnl} href="/">
//             Головна
//           </Link>
//         </li>
//         <li className={css.liOnl}>
//           <Link className={css.liOnl} href="/akcii">
//             Акції
//           </Link>
//         </li>
//         <li className={css.liOnl}>
//           <Link className={css.liOnl} href="/menu">
//             Меню
//           </Link>
//         </li>
//         <li className={css.liOnl}>
//           <Link className={css.liOnl} href="/blog">
//             Блог
//           </Link>
//         </li>
//         <li className={css.liOnl}>
//           <Link className={css.liOnl} href="/contacts">
//             Контакти
//           </Link>
//         </li>
//       </ul>
//     </nav>
//   );
// };

// export default Navigation;
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import css from "./header.module.css";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

const Navigation = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Визначаємо, мобільна ширина чи ні
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1000);
    };

    handleResize(); // перший запуск
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Стандартні посилання
  const navLinks = (
    <>
      <li className={css.liInPhoneMenu}>
        <Link href="/" onClick={() => setMenuOpen(false)}>
          Головна
        </Link>
      </li>
      {/* <li className={css.liInPhoneMenu}>
        <Link href="/akcii" onClick={() => setMenuOpen(false)}>
          Акції
        </Link>
      </li> */}
      <li className={css.liInPhoneMenu}>
        <Link href="/menu" onClick={() => setMenuOpen(false)}>
          Меню
        </Link>
      </li>
      <li className={css.liInPhoneMenu}>
        <Link href="/blog" onClick={() => setMenuOpen(false)}>
          Блог
        </Link>
      </li>
      <li className={css.liInPhoneMenu}>
        <Link href="/contacts" onClick={() => setMenuOpen(false)}>
          Контакти
        </Link>
      </li>
    </>
  );

  return (
    <>
      {/* Десктопна навігація */}
      {!isMobile && (
        <nav className={css.navigations}>
          <ul className={css.navList}>
            <li className={css.liOnl}>
              <Link className={css.liOnl} href="/">
                Головна
              </Link>
            </li>
            {/* <li className={css.liOnl}>
              <Link className={css.liOnl} href="/akcii">
                Акції
              </Link>
            </li> */}
            <li className={css.liOnl}>
              <Link className={css.liOnl} href="/menu">
                Меню
              </Link>
            </li>
            <li className={css.liOnl}>
              <Link className={css.liOnl} href="/blog">
                Блог
              </Link>
            </li>
            <li className={css.liOnl}>
              <Link className={css.liOnl} href="/contacts">
                Контакти
              </Link>
            </li>
          </ul>
        </nav>
      )}

      {/* Мобільна навігація */}
      {isMobile && (
        <nav className={css.mobileNav}>
          {!menuOpen && (
            <AiOutlineMenu
              className={css.burgerIcon}
              onClick={() => setMenuOpen(true)}
            />
          )}

          {menuOpen && (
            <div className={css.mobileOverlay}>
              <AiOutlineClose
                className={css.closeIcon}
                onClick={() => setMenuOpen(false)}
              />
              <ul className={css.mobileList}>{navLinks}</ul>
            </div>
          )}
        </nav>
      )}
    </>
  );
};

export default Navigation;
