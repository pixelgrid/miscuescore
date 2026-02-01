import { DetailedMultisetScoreboard } from "./skins/multiset.jsx";
import { RailbirdsScoreboard } from "./skins/railbirds.jsx";
import { getMultisetExtraInfo } from "../utils/get-multiset-extra-info.js";

export const MultiSetScoreboard = ({ sets, playerA, playerB, raceTo, discipline }) => {
    const params = new URLSearchParams(document.location.search);
    const skin = params.get("skin") || "matchroom";
    
    const [extraInfoA, extraInfoB] = getMultisetExtraInfo(sets, discipline);

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