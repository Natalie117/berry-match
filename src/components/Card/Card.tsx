import cover from '../../assets/cover.png';
import styles from './Card.module.css';

type CardType = {
  src: string;
  matched: boolean;
  id: number;
};

type CardProps = {
  card: CardType;
  handleChoice: (card: CardType) => void;
  flipped: boolean;
};

export default function Card({ card, handleChoice, flipped }: CardProps) {
  const handleClick = () => {
    if (!flipped) {
      handleChoice(card);
    }
  };

  return (
    <div className={styles.card}>
      <div className={flipped ? styles.flipped : ''}>
        {/* передня сторона */}
        <img className={styles.front} src={card.src} alt="card front" />

        {/* задня сторона */}
        <img
          className={styles.back}
          src={cover}
          onClick={handleClick}
          alt="card back"
        />
      </div>
    </div>
  );
}
