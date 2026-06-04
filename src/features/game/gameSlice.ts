import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import img1 from '../../assets/cards/1.png';
import img2 from '../../assets/cards/2.png';
import img3 from '../../assets/cards/3.png';
import img4 from '../../assets/cards/4.png';
import img5 from '../../assets/cards/5.png';
import img6 from '../../assets/cards/6.png';

export type CardType = {
  src: string;
  matched: boolean;
  id: number;
};

export type Players = {
  player1: string;
  player2: string;
};

type Scores = {
  player1: number;
  player2: number;
};

type GameState = {
  cards: CardType[];
  choiceOne: CardType | null;
  choiceTwo: CardType | null;
  currentPlayer: 1 | 2;
  scores: Scores;
  players: Players;
  gameOver: boolean;
};

const cardImages = [img1, img2, img3, img4, img5, img6];

export const createShuffledCards = (): CardType[] =>
  [...cardImages, ...cardImages]
    .sort(() => Math.random() - 0.5)
    .map((src, index) => ({
      src,
      matched: false,
      id: index,
    }));

const initialState: GameState = {
  cards: [],
  choiceOne: null,
  choiceTwo: null,
  currentPlayer: 1,
  scores: {
    player1: 0,
    player2: 0,
  },
  players: {
    player1: 'Player 1',
    player2: 'Player 2',
  },
  gameOver: false,
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setPlayers(state, action: PayloadAction<Players>) {
      state.players = action.payload;
    },

    startNewGame(state, action: PayloadAction<CardType[]>) {
      state.cards = action.payload;
      state.choiceOne = null;
      state.choiceTwo = null;
      state.currentPlayer = 1;
      state.scores = { player1: 0, player2: 0 };
      state.gameOver = false;
    },

    chooseCard(state, action: PayloadAction<CardType>) {
      if (state.choiceTwo || state.gameOver || action.payload.matched) {
        return;
      }

      if (state.choiceOne?.id === action.payload.id) {
        return;
      }

      if (!state.choiceOne) {
        state.choiceOne = action.payload;
      } else {
        state.choiceTwo = action.payload;
      }
    },

    matchSelectedCards(state) {
      if (!state.choiceOne || !state.choiceTwo) {
        return;
      }

      const matchedSrc = state.choiceOne.src;

      state.cards.forEach((card) => {
        if (card.src === matchedSrc) {
          card.matched = true;
        }
      });

      if (state.currentPlayer === 1) {
        state.scores.player1 += 1;
      } else {
        state.scores.player2 += 1;
      }

      state.choiceOne = null;
      state.choiceTwo = null;
    },

    endTurn(state) {
      state.choiceOne = null;
      state.choiceTwo = null;
      state.currentPlayer = state.currentPlayer === 1 ? 2 : 1;
    },

    finishGame(state) {
      state.gameOver = true;
    },
  },
});

export const {
  setPlayers,
  startNewGame,
  chooseCard,
  matchSelectedCards,
  endTurn,
  finishGame,
} = gameSlice.actions;

export default gameSlice.reducer;