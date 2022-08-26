import styles from "./navbar.module.scss";

import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Image
          width={50}
          height={50}
          src="/circulo400x400.jpeg"
          alt="Circulo logo"
        />
        <h1>Círculo Vicioso Club</h1>
      </div>
      <nav>
        <ul>
          <li>
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
          <li>
            <Link href="/wiki">
              <a>Wiki</a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
