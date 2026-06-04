import { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  chooseCard,
  createShuffledCards,
  endTurn,
  finishGame,
  matchSelectedCards,
  startNewGame,
  type CardType,
} from '../features/game/gameSlice';

export type { CardType } from '../features/game/gameSlice';

export const useGameLogic = () => {
  const dispatch = useAppDispatch();

  const {
    cards,
    choiceOne,
    choiceTwo,
    currentPlayer,
    scores,
    players,
    gameOver,
  } = useAppSelector((state) => state.game);

  const shuffleCards = useCallback(() => {
    dispatch(startNewGame(createShuffledCards()));
  }, [dispatch]);

  const handleChoice = useCallback(
    (card: CardType) => {
      dispatch(chooseCard(card));
    },
    [dispatch]
  );

  useEffect(() => {
    if (!choiceOne || !choiceTwo) {
      return;
    }

    if (choiceOne.src === choiceTwo.src) {
      dispatch(matchSelectedCards());
      return;
    }

    const timeoutId = window.setTimeout(() => {
      dispatch(endTurn());
    }, 1000);

    return () => window.clearTimeout(timeoutId);
  }, [choiceOne, choiceTwo, dispatch]);

  useEffect(() => {
    if (!choiceOne || choiceTwo) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      dispatch(endTurn());
    }, 2000);

    return () => window.clearTimeout(timeoutId);
  }, [choiceOne, choiceTwo, dispatch]);

  useEffect(() => {
    if (!gameOver && cards.length > 0 && cards.every((card) => card.matched)) {
      dispatch(finishGame());
    }
  }, [cards, gameOver, dispatch]);

  return {
    cards,
    choiceOne,
    choiceTwo,
    currentPlayer,
    scores,
    players,
    gameOver,
    handleChoice,
    shuffleCards,
  };
};
