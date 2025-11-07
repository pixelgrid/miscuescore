export function calculateScoreFromNotes(notes) {
    const sets = []
    let currentSet = [0, 0];
    let setRunning = false;

    for(let note of notes){
        if(note.note.match("set start")){
            setRunning = true;
        }
        if(note.note.match("A frame win"))
            currentSet[0]++
        if(note.note.match("B frame win"))
            currentSet[1]++
        if(note.note.match("set end")){
            const [A, B] = currentSet;
            const winner = A === B ? 0 : A > B ? 1 : 2;
            sets.push({A, B, winner})
            setRunning = false;
            currentSet = [0, 0]
        }
    }

    if(setRunning){
        sets.push({A: currentSet[0], B: currentSet[1], winner: 0})
    }
    return sets;
}