export const today = new Date()
today.setUTCFullYear(today.getFullYear());
today.setUTCHours(0);
today.setUTCMinutes(0);
today.setUTCSeconds(0);
export const todaysDate = new Date(today.getTime());
export const lastWeeksDate = new Date(today.getTime()-604800000);
