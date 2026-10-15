import Image from "next/image";
import me from "@media/design-book/id-photo.jpg";
import cap from "@media/design-book/grad-cap.png";
import camera from "@media/design-book/camera-frame.png";
import friends from "@media/design-book/photo-friends.jpg";
import { RansomTitle, Sparkle, Tape } from "./Decor";
import styles from "./DesignBook.module.css";

/** Gold rosette for the degree's honours, drawn in the book's ink. */
function Seal() {
  const petals = Array.from({ length: 16 }, (_, i) => {
    const a = (i / 16) * Math.PI * 2;
    return `${50 + Math.cos(a) * 40},${50 + Math.sin(a) * 40}`;
  });
  return (
    <svg viewBox="0 0 100 130" className={styles.img}>
      <path d="M34 74 22 124l14-9 9 13 10-52z" fill="#7a200a" stroke="#2B211C" strokeWidth="2" strokeLinejoin="round" />
      <path d="M66 74l12 50-14-9-9 13-10-52z" fill="#e8663d" stroke="#2B211C" strokeWidth="2" strokeLinejoin="round" />
      {petals.map((p, i) => {
        const [x, y] = p.split(",").map(Number);
        return <circle key={i} cx={x} cy={y} r="11" fill="#f2b544" stroke="#2B211C" strokeWidth="2" />;
      })}
      <circle cx="50" cy="50" r="38" fill="#f2b544" />
      <circle cx="50" cy="50" r="31" fill="#FFE45C" stroke="#2B211C" strokeWidth="2" strokeDasharray="3 3" />
      <text x="50" y="44" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="#2B211C" fontFamily="Georgia, serif">
        MENTION
      </text>
      <text x="50" y="58" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="#7a200a" fontFamily="Georgia, serif">
        TRÈS BIEN
      </text>
      <text x="50" y="72" textAnchor="middle" fontSize="9" fill="#2B211C">
        ★
      </text>
    </svg>
  );
}

export function PageSchool() {
  return (
    <div aria-hidden="true">
      <RansomTitle text="Class of 2026" className={styles.abs} style={{ left: "4cqw", top: "3cqw" }} />

      {/* ID card */}
      <div className={`${styles.abs} ${styles.idCard} ${styles.slap}`}>
        <div className={styles.idHead}>
          <span>ID</span> Faculté des Sciences de Tunis
        </div>
        <div className={styles.idBody}>
          <div className={styles.idPhoto}>
            <Image src={me} alt="" sizes="(min-width: 900px) 90px, 12vw" className={styles.img} />
          </div>
          <dl className={styles.idFields}>
            <dt>Name</dt>
            <dd>Manel Ayari</dd>
            <dt>Degree</dt>
            <dd>Licence en Informatique · GLSI</dd>
            <dt>Class of</dt>
            <dd>2026</dd>
          </dl>
        </div>
        <div className={styles.idFoot}>
          <span className={styles.idBarcode} />
          <span className={styles.idSign}>Manel</span>
        </div>
      </div>
      <div className={`${styles.abs} ${styles.idCap} ${styles.sticker} ${styles.pop}`}>
        <Image src={cap} alt="" sizes="(min-width: 900px) 140px, 16vw" className={styles.img} />
      </div>
      <div className={`${styles.abs} ${styles.seal} ${styles.sticker} ${styles.slap}`}>
        <Seal />
      </div>

      {/* Camera with a photo from the day */}
      <div className={`${styles.abs} ${styles.camera} ${styles.sticker} ${styles.pop}`}>
        <div className={styles.cameraShot}>
          <Image src={friends} alt="" sizes="(min-width: 900px) 240px, 28vw" className={styles.develop} />
        </div>
        <Image src={camera} alt="" sizes="(min-width: 900px) 440px, 50vw" className={styles.img} />
      </div>
      <Tape kind="hearts" x={70} y={17} r={-8} d={1.1} />
      <p className={`${styles.abs} ${styles.hand} ${styles.schoolCaption}`}>
        <span className={styles.write} style={{ display: "inline-block", ["--d" as string]: "2.6s" }}>
          we made it ♡
        </span>
      </p>
      <Sparkle x={47} y={70} d={2.2} size={4} color="#FFE45C" />
    </div>
  );
}
