
import React, { useEffect, useRef } from 'react';
import Peer from 'peerjs';

import one from '../assets/balls/overview/one.png';
import two from '../assets/balls/overview/two.png';
import three from '../assets/balls/overview/three.png';
import four from '../assets/balls/overview/four.png';
import five from '../assets/balls/overview/five.png';
import six from '../assets/balls/overview/six.png';
import seven from '../assets/balls/overview/seven.png';
import eight from '../assets/balls/overview/eight.png';
import nine from '../assets/balls/overview/nine.png';
import ten from '../assets/balls/overview/ten.png';


/*

settings page code
const peer = new Peer();

peer.on('open', function(){
  console.log("opened");
  const conn = peer.connect('61403791-1234')
  conn.on("open", function(){
    document.querySelector(".selectors").addEventListener("change", (e) => {
      const potted = [...document.querySelectorAll("input:checked")].map(i => i.value);
      console.log('sending')
    conn.send({type: 'update', pottedBalls: potted})
    });
  });
  
  document.querySelector("button").addEventListener("click", e => {
    [...document.querySelectorAll("input:checked")].forEach(i => i.checked = false)
    conn.send({type: 'reset'})
  })
});


*/
export default function PottedBallsIndicator() {
  const [pottedBalls, setPottedBalls] = React.useState(new Set());
  const peerRef = useRef(null);

  useEffect(() => {
    const params = new URLSearchParams(document.location.search);
    const peer = new Peer(`${params.get("tableID")}-${params.get("pass")}`);
    peerRef.current = peer;

    peer.on('connection', function(conn) {
      conn.on('open', function() {
        conn.on('data', function(data) {
          // Handle incoming data
          if (data.type === 'update') {
            setPottedBalls(new Set(data.pottedBalls));
          }
          if(data.type === 'reset') {
            setPottedBalls(new Set());
          }
        });
      });
    });

    return () => {
      if (peerRef.current) {
        peerRef.current.destroy();
      }
    };
  }, []);
  return (
    <div className="potted-balls-indicator">
        <img className={pottedBalls.has("one") ? "potted" : ""} src={one} alt="1" />
        <img className={pottedBalls.has("two") ? "potted" : ""} src={two} alt="2" />
        <img className={pottedBalls.has("three") ? "potted" : ""} src={three} alt="3" />
        <img className={pottedBalls.has("four") ? "potted" : ""} src={four} alt="4" />
        <img className={pottedBalls.has("five") ? "potted" : ""} src={five} alt="5" />
        <img className={pottedBalls.has("six") ? "potted" : ""} src={six} alt="6" />
        <img className={pottedBalls.has("seven") ? "potted" : ""} src={seven} alt="7" />
        <img className={pottedBalls.has("eight") ? "potted" : ""} src={eight} alt="8" />
        <img className={pottedBalls.has("nine") ? "potted" : ""} src={nine} alt="9" />
    </div>
  );
}