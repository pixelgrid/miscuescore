import {Discipline} from './discipline-image.jsx'
export function IndividualMatches({ matches }) {
  return (
    <div className="individual-matches">
      {matches.map((match, index) => (
        <div key={index} className={`individual-match ${match.status}`}>
          <span className="pA">
            <Discipline discipline={match.discipline} />
            {match.playerA} 
          </span>
          <div className={`race-to winner-${match.winner}`}>
            <span className="scoreA">{match.scoreA}</span>
            <span className="rt">({match.raceTo})</span>
            <span className="scoreB">{match.scoreB}</span>
          </div>
          <span className="pB">
            {match.playerB}
          </span>
        </div>
      ))}
    </div>
  );
}