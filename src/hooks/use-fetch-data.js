import { useState, useEffect } from "react";
import { TrackGoogleAnalyticsEvent } from "../utils/track-ga-event";
let DATA_COLLECTED = false;
import { getBreakingPlayer } from "../utils/get-breacking-player";
export function useFetchData(tableID) {
  const [metadata, setMetadata] = useState({});
  useEffect(() => {
    async function fetchMetadata() {
      if (!tableID) return;
      const data = await fetch(
        `https://api.codetabs.com/v1/proxy?quest=https://cuescore.com/ajax/scoreboard/overlay-v2.php?tableId=${tableID}`
      ).then((res) => res.json());

      const status = data.status;
      if (!status || status === "WAITING") return setMetadata({ status });
      const tournamentName = data.tournament.name;
      const tournamentId = data.tournament.tournamentId;
      const matchId = data.match.matchId;
      const raceTo = data.match.raceTo;
      const stage = data.match.roundName;
      const breaking = getBreakingPlayer(data.match.notes);
      const playerA = {
        name: data.match.playerA.name,
        flag: data.match.playerA.country.image,
        score: data.match.scoreA,
        runouts: Number(data.match.runoutsA),
        break: breaking === "A" ? true : false,
        handicap: data.match.handicapA
      };
      const playerB = {
        name: data.match.playerB.name,
        flag: data.match.playerB.country.image,
        score: data.match.scoreB,
        runouts: Number(data.match.runoutsB),
        break: breaking === "B" ? true : false,
        handicap: data.match.handicapB
      };

      if (!DATA_COLLECTED){
        DATA_COLLECTED = true;
        TrackGoogleAnalyticsEvent(
          "data_fetched",
          "completed",
          window.location.pathname + window.location.search,
          {
            venue_name: data.venueName,
            venue_id: data.venueId,
            discipline: data.tournament.discipline,
            tournament_id: data.tournament.tournamentId
          }
        );
      }
      

      setMetadata({
        status,
        tournamentName,
        raceTo,
        playerA,
        playerB,
        stage,
        tournamentId,
        matchId
      });
    }

    fetchMetadata();
    setInterval(fetchMetadata, 10000);
  }, [tableID]);

  return metadata;
}