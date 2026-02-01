import { hasBallCount } from "./has-ball-count.js";

export const getMultisetExtraInfo = (sets, discipline) => {
    const prefix = hasBallCount(discipline) ? 'Ball Count:' : 'Games:';
    const lastSet = sets.at(-1);
    if (!lastSet) return ['', ''];
    return [`${prefix} ${lastSet.A ?? 0}`, `${prefix} ${lastSet.B ?? 0}`];
}