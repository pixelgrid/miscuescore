import {useState, useEffect} from 'react';

export function useIndividualMatchData(shouldFetch, tournamentId, matchId){
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const fetchHtml = async (tournamentId, matchId) => {
        const encoded = encodeURIComponent(`https://cuescore.com/ajax/match/matchDetails.php?tournamentId=${tournamentId}&id=${matchId}`)
        const res = await fetch(`https://api.codetabs.com/v1/proxy?quest=${encoded}`);
        const html = await res.text();
        const parser = new DOMParser();
        const htmlTree = parser.parseFromString(html, 'text/html');
        setMatches(extractDataFromHTML(htmlTree))
    }
    if(shouldFetch){
      fetchHtml(tournamentId, matchId);
    }
  }, [shouldFetch, tournamentId, matchId]);
  return matches;
}


export function extractDataFromHTML(htmlTree){
  const allRows = htmlTree.querySelectorAll("tr");
  const games = [];

  // in chunks of 2. first row game metadata, second game score and players.
  for(let i = 0; i < allRows.length; i += 2){
    const metadataRow = allRows[i];
    const gameRow = allRows[i + 1];

    const discipline = gameRow.dataset.discipline;
    const raceTo = metadataRow.querySelector("span.raceTo").textContent;
    const running = metadataRow.classList.contains("playing");
    const finished = metadataRow.classList.contains("finished");
    const waiting = metadataRow.classList.contains("waiting");

    const status = waiting ? 'waiting' : running ? 'running' : finished ? 'finished' : '';
    const playerA = gameRow.querySelector(".playerA .name").textContent;
    const playerB = gameRow.querySelector(".playerB .name").textContent;
    const scoreA = gameRow.querySelector(".scoreA input").value;
    const scoreB = gameRow.querySelector(".scoreB input").value;
    const playerAWinner = gameRow.querySelector(".scoreA").classList.contains("winner");
    const playerBWinner = gameRow.querySelector(".scoreB").classList.contains("winner");
    const runoutsA = gameRow.querySelector(".playerA .runouts").textContent;
    const runoutsB = gameRow.querySelector(".playerB .runouts").textContent;
    const winner = playerAWinner ? 1 : playerBWinner ? 2 : 0;
    games.push({discipline, raceTo, status, playerA, playerB, scoreA, scoreB, runoutsA, runoutsB, winner})
  }
  return games;
}