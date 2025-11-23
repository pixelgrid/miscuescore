export function getPlayerTurn(notes) {
  for (let i = notes.length - 1; i >= 0; i--) {
    let note = notes[i];
    if (note.note.includes("A breaking") || note.note.includes("A inning start")) {
      return "A";
    }
    if (note.note.includes("B breaking") || note.note.includes("B inning start")) {
      return "B";
    }
  }

  return null;
}