import { useEffect } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
} from 'react-router-dom';
import { useForm } from 'react-hook-form';

import Header from './components/Header/Header';
import Board from './components/Board/Board';
import { useGameLogic } from './hooks/useGameLogic';
import { useAppDispatch } from './app/hooks';
import { setPlayers } from './features/game/gameSlice';

import './styles/App.css';

type PlayerFormData = {
  player1: string;
  player2: string;
};

function HomePage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<PlayerFormData>({
    defaultValues: {
      player1: '',
      player2: '',
    },
  });

  const startGame = (data: PlayerFormData) => {
    dispatch(
      setPlayers({
        player1: data.player1.trim(),
        player2: data.player2.trim(),
      })
    );

    navigate('/game');
  };

  return (
    <div className="app-container">
      <section className="game-header home-card">
        <h1>Berry Match</h1>
        <p className="status">A bright memory game for two players</p>

        <form className="players-form" onSubmit={handleSubmit(startGame)}>
          <div className="form-field">
            <label htmlFor="player1">First player</label>

            <input
              id="player1"
              type="text"
              placeholder="Enter first name"
              {...register('player1', {
                required: 'Enter the first player name',
                validate: (value) =>
                  value.trim().length >= 2 ||
                  'Name must contain at least 2 characters',
              })}
            />

            {errors.player1 && (
              <p className="field-error">{errors.player1.message}</p>
            )}
          </div>

          <div className="form-field">
            <label htmlFor="player2">Second player</label>

            <input
              id="player2"
              type="text"
              placeholder="Enter second name"
              {...register('player2', {
                required: 'Enter the second player name',
                validate: {
                  correctLength: (value) =>
                    value.trim().length >= 2 ||
                    'Name must contain at least 2 characters',
                  differentName: (value) =>
                    value.trim().toLowerCase() !==
                      getValues('player1').trim().toLowerCase() ||
                    'Players must have different names',
                },
              })}
            />

            {errors.player2 && (
              <p className="field-error">{errors.player2.message}</p>
            )}
          </div>

          <div className="score-board home-buttons">
            <button className="new-game-btn" type="submit">
              Start Game
            </button>

            <Link className="new-game-btn rules-link" to="/rules">
              Rules
            </Link>
          </div>
        </form>
      </section>
    </div>
  );
}

function RulesPage() {
  return (
    <div className="app-container">
      <section className="game-header">
        <h1>Rules</h1>

        <p className="status">
          Players open two cards per turn. If the cards match, the player gets
          one point. If they do not match, the turn goes to the next player.
        </p>

        <p className="status">The player with the highest score wins.</p>

        <Link className="new-game-btn rules-link" to="/">
          Back Home
        </Link>
      </section>
    </div>
  );
}

function GamePage() {
  const {
    cards,
    choiceOne,
    choiceTwo,
    currentPlayer,
    scores,
    players,
    gameOver,
    handleChoice,
    shuffleCards,
  } = useGameLogic();

  useEffect(() => {
    shuffleCards();
  }, [shuffleCards]);

  return (
    <div className="app-container">
      <Header
        currentPlayer={currentPlayer}
        scores={scores}
        players={players}
        gameOver={gameOver}
        onNewGame={shuffleCards}
      />

      <Board
        cards={cards}
        handleChoice={handleChoice}
        choiceOne={choiceOne}
        choiceTwo={choiceTwo}
      />

      <Link className="new-game-btn home-link" to="/">
        Home
      </Link>
    </div>
  );
}

function NotFoundPage() {
  return (
    <div className="app-container">
      <section className="game-header">
        <h1>404</h1>
        <p className="status">Page not found</p>

        <Link className="new-game-btn rules-link" to="/">
          Back Home
        </Link>
      </section>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={HomePage} />
        <Route path="/game" element={<GamePage />} />
        <Route path="/rules" element={<RulesPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
