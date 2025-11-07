export const MultiSetScoreboard = ({ sets, playerA, playerB, raceTo }) => {
    return <div className="multi-set-scoreboard">
        <div className="player-row" style={{gridTemplateColumns: `1fr repeat(${sets.length}, 30px)`}}>
            <div className="player-info">
                <div className="flag center">
                  <img src={playerA.flag} />
                </div>
                <div className="player-name">{playerA.name}</div>
            </div>
            {sets.map((set, index) => (
                <div key={index} className={`set-col ${index === sets.length -1 ? 'active-set' : ''}`}>
                        <span className={`set-score ${set.winner === 1 ? 'winner' : ''}`}>{set.A}</span>
                </div>
            ))}
        </div>
        <div className="player-row" style={{gridTemplateColumns: `1fr repeat(${sets.length}, 30px)`}}>
            <div className="player-info">
                <div className="flag center">
                  <img src={playerB.flag} />
                </div>
                <div className="player-name">{playerB.name}</div>
            </div>
            {sets.map((set, index) => (
                <div key={index} className={`set-col ${index === sets.length -1 ? 'active-set' : ''}`}>
                        <span className={`set-score ${set.winner === 2 ? 'winner' : ''}`}>{set.B}</span>
                </div>
            ))}
        </div>
    </div>
};