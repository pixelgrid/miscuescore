import { DetailedMultisetScoreboard } from "./skins/multiset.jsx";
import { RailbirdsScoreboard } from "./skins/railbirds.jsx";

export const MultiSetScoreboard = ({ sets, playerA, playerB, raceTo }) => {
    const params = new URLSearchParams(document.location.search);
    const skin = params.get("skin") || "matchroom";
    const lastSet = sets.at(-1);
    const extraInfoA = lastSet ? `Ball Count: ${lastSet.A ?? 0}` : '';
    const extraInfoB = lastSet ? `Ball Count: ${lastSet.B ?? 0}` : '';

    switch(skin) {
        case "rb":
          return <RailbirdsScoreboard 
                    playerA={playerA} 
                    playerB={playerB} 
                    raceTo={raceTo} 
                    extraInfoA={extraInfoA} 
                    extraInfoB={extraInfoB}
                />;

        default:
          return <DetailedMultisetScoreboard 
                    sets={sets} 
                    playerA={playerA} 
                    playerB={playerB} 
                    raceTo={raceTo} 
                />
    }
};