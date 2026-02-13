export function formatNaira(amount) {
  if (amount === null || amount === undefined || isNaN(amount)) {
    return "0.00";
  }

  return Number(amount).toLocaleString("en-NG", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}