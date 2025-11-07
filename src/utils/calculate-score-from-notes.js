export function calculateScoreFromNotes(notes) {
    const sets = []
    let currentSet = [0, 0];

    for(let note of notes){
        if(note.note.match("A frame win"))
            currentSet[0]++
        if(note.note.match("B frame win"))
            currentSet[1]++
        if(note.note.match("set end")){
            const [A, B] = currentSet;
            const winner = A === B ? 0 : A > B ? 1 : 2;
            sets.push({A, B, winner})
            currentSet = [0, 0]
        }
    }
    // first set has not ended yet
    if(currentSet[0] !==0 || currentSet[1] !==0){
        const [A, B] = currentSet;
        const winner = 0;
        sets.push({A, B, winner})
    }
    return sets;
}