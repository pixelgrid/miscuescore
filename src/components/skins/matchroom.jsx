import PottedBallsIndicator from '../potted-balls-indicator.jsx';

export function MatchroomScoreboard({ playerA, playerB, raceTo, showPottedBalls }) {
      return  <div className="scorecontainer">
      <div className="scoreboard">
      <div className={`player playerA ${playerA.break ? "break" : ""}`}>
        <div className="flag center">
          <img src={playerA.flag} />
        </div>
        <div className="name center">
          {playerA.name}
          {playerA.handicap ? (<span className="handicap">({playerA.handicap})</span> ) : null}
          {playerA.runouts ? (
            <span className="runouts">R{playerA.runouts}</span>
          ) : null}
        </div>
        <div className="score">{playerA.score}</div>
      </div>
      <div className="raceto center">Race to {raceTo}</div>
      <div className={`player playerB ${playerB.break ? "break" : ""}`}>
        <div className="score">{playerB.score}</div>
        <div className="name center">
          {playerB.name}
          {playerB.handicap ? (<span className="handicap">({playerB.handicap})</span> ) : null}
          {playerB.runouts ? (
            <span className="runouts">R{playerB.runouts}</span>
          ) : null}
        </div>
        <div className="flag center">
          <img src={playerB.flag} />
        </div>
      </div>
      </div>
      {showPottedBalls && <PottedBallsIndicator />}
    </div>
}