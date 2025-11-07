import { useState, useEffect } from 'react'
import ReactGA from "react-ga4";
import './App.css'
// import dummy_data from './data'

import { SingleSetScoreboard } from './components/single-set-scoreboard';
import { useFetchData } from './hooks/use-fetch-data';
import { TableIDInput } from './components/table-id-input';

function App() {
  let params = new URLSearchParams(document.location.search);
  const [tableID, setTableID] = useState(params.get("tableID"));
  const { playerA, playerB, raceTo, status, tournamentId, matchId } = useFetchData(tableID);

  useEffect(() => {
    ReactGA.initialize("G-XT75HB2TKV");
    ReactGA.send({ hitType: "pageview", page: document.location.pathname + document.location.search });
  }, []);

  if (!tableID) return <TableIDInput onSubmit={setTableID} />;
  if (!status || status === "WAITING")
    return <div className="nomatch">Next match will start shortly</div>;
  return (
   <SingleSetScoreboard playerA={playerA} playerB={playerB} raceTo={raceTo} tournamentId={tournamentId} matchId={matchId}/>
  );
}

export default App
