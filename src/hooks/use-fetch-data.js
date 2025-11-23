import { useState, useEffect } from "react";
import { TrackGoogleAnalyticsEvent } from "../utils/track-ga-event";
import { getPlayerTurn } from "../utils/get-player-turn";
import { calculateScoreFromNotes } from "../utils/calculate-score-from-notes";
import { calculateScoreFromSets } from "../utils/calculate-score-from-sets";

let DATA_COLLECTED = false;

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
      const breaking = getPlayerTurn(data.match.notes);
      const discipline = data.tournament.discipline;
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

      let setScores = [{ A: playerA.score, B: playerA.score, winner: 0 }];
      const sets = data.match.sets || [];
      const notes = data.match.notes || [];

      if(sets.length){
        setScores = calculateScoreFromSets(sets);
      } else if(notes.length){
        setScores = calculateScoreFromNotes(notes);
      }

      if (!DATA_COLLECTED){
        DATA_COLLECTED = true;
        TrackGoogleAnalyticsEvent(
          "data_fetched",
          "completed",
          window.location.pathname + window.location.search,
          {
            venue_name: data.venueName,
            venue_id: data.venueId,
            discipline,
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
        matchId,
        discipline,
        sets: setScores,
        bestOfSets: data.match.bestOfSets || 0
      });
    }

    fetchMetadata();
    setInterval(fetchMetadata, 10000);
  }, [tableID]);

  return metadata;
}