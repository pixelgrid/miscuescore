export function isMultisetTournament(tournament) {
    return ['bankpool', 'multiball', 'onepocket'].includes(discipline.toLowerCase());
}