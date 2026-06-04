import Card from '../Card';
import type { CardType } from '../../hooks/useGameLogic';
import './Board.css';

type BoardProps = {
  cards: CardType[];
  handleChoice: (card: CardType) => void;
  choiceOne: CardType | null;
  choiceTwo: CardType | null;
};

export default function Board({
  cards,
  handleChoice,
  choiceOne,
  choiceTwo,
}: BoardProps) {
  return (
    <div className="board">
      {cards.map((card) => (
        <Card
          key={card.id}
          card={card}
          handleChoice={handleChoice}
          flipped={
            card === choiceOne ||
            card === choiceTwo ||
            card.matched
          }
        />
      ))}
    </div>
  );
}