import Image from "next/image";
import laptopSticker from "../../public/media/home/sticker-laptop.png";
import phoneSticker from "../../public/media/home/sticker-phone.png";
import styles from "./HeroDesk.module.css";

function Sparkles({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 100" aria-hidden="true" focusable="false">
      <path className={styles.twinkleA} d="M16 14l1.7 4.4 4.5 1.7-4.5 1.7L16 26l-1.7-4.2-4.5-1.7 4.5-1.7Z" />
      <path className={styles.twinkleB} d="M86 22l1.2 3.1 3.2 1.2-3.2 1.2L86 30.6 84.8 27.5 81.6 26.3l3.2-1.2Z" />
      <path className={styles.twinkleC} d="M78 72l2.1 5.4 5.5 2.1-5.5 2.1L78 87.1 75.9 81.6 70.4 79.5l5.5-2.1Z" />
      <path className={styles.twinkleD} d="M10 62l1 2.6 2.7 1-2.7 1L10 69.2 9 66.6 6.3 65.6l2.7-1Z" />
    </svg>
  );
}

/**
 * 2D vinyl stickers of a laptop and a phone. They float like a little desk,
 * lift on hover, and jump to the matching work folders.
 */
export function HeroDesk() {
  return (
    <div className={styles.desk}>
      <div className={styles.ground} aria-hidden="true" />

      <a className={`${styles.sticker} ${styles.laptop}`} href="#lafricaine">
        <span className={styles.bob}>
          <span className={styles.face}>
            <Image
              src={laptopSticker}
              alt=""
              sizes="(max-width: 767px) 70vw, 420px"
              priority
              className={styles.art}
            />
            <Sparkles className={styles.sparkles} />
          </span>
        </span>
        <span className="visually-hidden">See my website projects</span>
      </a>

      <a className={`${styles.sticker} ${styles.phone}`} href="#glutenia">
        <span className={`${styles.bob} ${styles.bobPhone}`}>
          <span className={styles.face}>
            <Image
              src={phoneSticker}
              alt=""
              sizes="(max-width: 767px) 42vw, 240px"
              priority
              className={styles.art}
            />
            <Sparkles className={styles.sparkles} />
          </span>
        </span>
        <span className="visually-hidden">See the Glutenia mobile app</span>
      </a>
    </div>
  );
}
