import { useState, useEffect } from 'react'
import ReactGA from "react-ga4";
import './App.css'
// import dummy_data from './data'
let DATA_COLLECTED = false;
const TrackGoogleAnalyticsEvent = (
    category,
    event_name,
    label,
    data
) => {
    console.log("GA event:", category, ":", event_name, ":", label);

    let event_params = {
        category,
        label,
        ...data
    };
    // Send GA4 Event
    ReactGA.event(event_name, event_params);
};
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

  useEffect(() => {
    ReactGA.initialize("G-XT75HB2TKV");
    ReactGA.send({ hitType: "pageview", page: document.location.pathname + document.location.search });
  }, []);
  if (!tableID) return <TableIDInput onSubmit={setTableID} />;
  if (!status || status === "WAITING")
    return <div className="nomatch">Next match will start shortly</div>;
  return (
    <div className="scorecontainer">
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
        stage
      });
    }

    fetchMetadata();
    setInterval(fetchMetadata, 10000);
  }, [tableID]);

  return metadata;
}

export default App
