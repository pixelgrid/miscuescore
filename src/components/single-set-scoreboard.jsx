import { useIndividualMatchData } from '../hooks/fetch-individual-matches';
import { IndividualMatches } from './individual-matches.jsx';
import { isLeagueMatch } from '../utils/is-league-match.js';

export function SingleSetScoreboard({ playerA, playerB, raceTo, set, tournamentId, matchId}) {
    let params = new URLSearchParams(document.location.search);
    const shouldFetchIndividualMatches = params.get("o") && isLeagueMatch(tournamentId);
    const individualMatchData = useIndividualMatchData(shouldFetchIndividualMatches, tournamentId, matchId).filter(m => m.status !== 'waiting');

    return  <div className="scorecontainer">
      {shouldFetchIndividualMatches && <IndividualMatches matches={individualMatchData} />}
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
}