export function calculatePottedBalls(notes) {
    const potted = new Set();
    notes.forEach(note => {
        if(note.note.match("frame start")){
            potted.clear();
        }
        const match = note.note.match("pot");
        if (match) {
            const parts = note.note.split("pot").at(-1).trim().split(/\s+/);
            for (const part of parts) {
              potted.add(part);
            };
        }
    });
    return potted;
}