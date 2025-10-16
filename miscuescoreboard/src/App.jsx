import { useState, useEffect } from 'react'
import './App.css'
import dummy_data from './data'

function TableIDInput({ onSubmit }) {
  const [value, setValue] = useState("");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(value);
      }}
    >
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Enter table ID"
      />
    </form>
  );
}

function App() {
  let params = new URLSearchParams(document.location.search);
  const [tableID, setTableID] = useState(params.get("tableID"));
  const { playerA, playerB, raceTo, status } = useFetchData(tableID);

  if (!tableID) return <TableIDInput onSubmit={setTableID} />;
  if (!status || status === "WAITING")
    return <div class="nomatch">Next match will start shortly</div>;
  return (
    <div class="scorecontainer">
      <div class={`playerA ${playerA.break ? "break" : ""}`}>
        <div class="flag center">
          <img src={playerA.flag} />
        </div>
        <div class="name center">
          {playerA.name}
          {playerA.runouts ? (
            <span class="runouts">R{playerA.runouts}</span>
          ) : null}
        </div>
        <div class="score">{playerA.score}</div>
      </div>
      <div class="raceto center">Race to {raceTo}</div>
      <div class={`playerB ${playerB.break ? "break" : ""}`}>
        <div class="score">{playerB.score}</div>
        <div class="name center">
          {playerB.name}
          {playerB.runouts ? (
            <span class="runouts">R{playerB.runouts}</span>
          ) : null}
        </div>
        <div class="flag center">
          <img src={playerB.flag} />
        </div>
      </div>
    </div>
  );
}

function getBreakingPlayer(notes) {
  for (let i = notes.length - 1; i >= 0; i--) {
    let note = notes[i];
    if (note.note.includes("A breaking")) {
      return "A";
    }
    if (note.note.includes("B breaking")) {
      return "B";
    }
  }

  return null;
}

function useFetchData(tableID) {
  const [metadata, setMetadata] = useState({});
  useEffect(() => {
    async function fetchMetadata() {
      if (!tableID) return;
      const data = await fetch(
        `https://api.codetabs.com/v1/proxy?quest=https://cuescore.com/ajax/scoreboard/overlay-v2.php?tableId=${tableID}`
      ).then((res) => res.json());

      // const data = DATA;

      const status = data.status;
      if (!status || status === "WAITING") return setMetadata({ status });
      const tournamentName = data.tournament.name;
      const raceTo = data.match.raceTo;
      const stage = data.match.roundName;
      const breaking = getBreakingPlayer(data.match.notes);
      const playerA = {
        name: data.match.playerA.name,
        flag: data.match.playerA.country.image,
        score: data.match.scoreA,
        runouts: Number(data.match.runoutsA),
        break: breaking === "A" ? true : false
      };
      const playerB = {
        name: data.match.playerB.name,
        flag: data.match.playerB.country.image,
        score: data.match.scoreB,
        runouts: Number(data.match.runoutsB),
        break: breaking === "B" ? true : false
      };

      setMetadata({
        status,
        tournamentName,
        raceTo,
        playerA,
        playerB,
        stage
      });
    }

    fetchMetadata();
    setInterval(fetchMetadata, 10000);
  }, [tableID]);

  return metadata;
}

export default App
