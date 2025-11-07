export function calculateScoreFromSets(sets){
    const scores = [];

    for (const set of sets) {
        const A = set.scoreA || 0;
        const B = set.scoreB || 0;
        const winner = A === B ? 0 : A > B ? 1 : 2;
        scores.push({ A, B, winner });
    } 
    return scores;
}