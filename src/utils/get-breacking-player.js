export function getBreakingPlayer(notes) {
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