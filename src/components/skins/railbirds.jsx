
export function RailbirdsScoreboard({ playerA, playerB, raceTo }) {
      return  (<div className="scorecontainer railbirds">
      <div className="scoreboard">
        <div className={`player playerA`}>
                <div className="name">{playerA.name}</div>
                <div className="extras">Runouts: {playerA.runouts || 0}</div>
        </div>
        <div className="score scoreA">{playerA.score}</div>
        <div className="raceto">Race<span className="raceno">({raceTo})</span></div>
        <div className="score scoreB">{playerB.score}</div>
        <div className={`player playerB`}>
                <div className="name">{playerB.name}</div>
                <div className="extras">Runouts: {playerB.runouts || 0}</div>
        </div>
      </div>
    </div>)
}