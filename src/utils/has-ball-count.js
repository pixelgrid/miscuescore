export function hasBallCount(discipline) {
    return ['bankpool', 'onepocket'].includes(discipline.toLowerCase());
}