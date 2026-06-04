import type { Players } from '../../features/game/gameSlice';

type Scores = {
  player1: number;
  player2: number;
};

type HeaderProps = {
  currentPlayer: number;
  scores: Scores;
  players: Players;
  gameOver: boolean;
  onNewGame: () => void;
};

export default function Header({
  currentPlayer,
  scores,
  players,
  gameOver,
  onNewGame,
}: HeaderProps) {
  const currentPlayerName =
    currentPlayer === 1 ? players.player1 : players.player2;

  let statusMessage = `${currentPlayerName}'s Turn`;

  if (gameOver) {
    if (scores.player1 > scores.player2) {
      statusMessage = `🏆 ${players.player1} Wins!`;
    } else if (scores.player2 > scores.player1) {
      statusMessage = `🏆 ${players.player2} Wins!`;
    } else {
      statusMessage = "🤝 It's a Draw!";
    }
  }

  return (
    <header className="game-header">
      <div className="header-row">
        <div
          className={
            currentPlayer === 1 ? 'score side-score active' : 'score side-score'
          }
        >
          <span>{players.player1}</span>
          <strong>{scores.player1}</strong>
        </div>

        <div className="header-center">
          <h1>Berry Match</h1>

          <button className="new-game-btn" onClick={onNewGame}>
            New Game
          </button>

          <h2 className={gameOver ? 'status winner' : 'status'}>
            {statusMessage}
          </h2>
        </div>

        <div
          className={
            currentPlayer === 2 ? 'score side-score active' : 'score side-score'
          }
        >
          <span>{players.player2}</span>
          <strong>{scores.player2}</strong>
        </div>
      </div>
    </header>
  );
}
