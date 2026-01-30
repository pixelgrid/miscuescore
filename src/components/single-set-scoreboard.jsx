import React from 'react';
import {MatchroomScoreboard} from './skins/matchroom.jsx';
import {RailbirdsScoreboard} from './skins/railbirds.jsx';

export function SingleSetScoreboard({ playerA, playerB, raceTo}) {
    const params = new URLSearchParams(document.location.search);
    const showPottedBalls = !!params.has("pb");
    const skin = params.get("skin") || "matchroom";

    switch(skin) {
        case "rb":
          return <RailbirdsScoreboard playerA={playerA} playerB={playerB} raceTo={raceTo}/>

        default:
          return <MatchroomScoreboard playerA={playerA} playerB={playerB} raceTo={raceTo} showPottedBalls={showPottedBalls} />
    }
}