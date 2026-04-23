// GIRLS : 1–23 and 54–60
// BOYS  : 24–53 and 61–96
 
export const getGenderForSeat = (seatNumber) => {
  const n = Number(seatNumber);
  if ((n >= 1 && n <= 23) || (n >= 54 && n <= 60)) return "GIRLS";
  if ((n >= 24 && n <= 53) || (n >= 61 && n <= 96)) return "BOYS";
  return null;
};