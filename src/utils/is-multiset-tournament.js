export function isMultisetTournament(discipline, bestOfSets) {
    return ['bankpool', 'multiball', 'onepocket'].includes(discipline.toLowerCase()) && bestOfSets > 1;
}