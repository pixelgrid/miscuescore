export function calculateScoreFromSets(sets){
    const sets = [];

    for (const set of sets) {
        const A = set.scoreA || 0;
        const B = set.scoreB || 0;
        const winner = A === B ? 0 : A > B ? 1 : 2;
        sets.push({ A, B, winner });
    } 
    return sets;
}