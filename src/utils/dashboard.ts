export const getMonthForChart = () => {
  const monthNow = new Date().getMonth();
  var monthName = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "Mei",
    "Jun",
    "Jul",
    "Agu",
    "Sep",
    "Okt",
    "Nov",
    "Des",
  ];
  var month = [];
  for (var i = 0; i <= 5; i++) {
    month.unshift(monthName[(monthNow + (12 - i)) % 12]);
  }

  return month;
};

export function abbreviateNumber(value: number) {
  var result: string = "";
  if (value >= 1000) {
    var suffixes = ["", "rb", "jt", "m", "t"];
    var suffixNum = Math.floor(("" + value).length / 3);
    var shortValue: any = "";
    for (var precision = 2; precision >= 1; precision--) {
      shortValue = parseFloat(
        (suffixNum != 0
          ? value / Math.pow(1000, suffixNum)
          : value
        ).toPrecision(precision)
      );
      var dotLessShortValue = (shortValue + "").replace(/[^a-zA-Z 0-9]+/g, "");
      if (dotLessShortValue.length <= 2) {
        break;
      }
    }
    if (shortValue % 1 != 0) shortValue = shortValue.toFixed(1);
    result = shortValue + suffixes[suffixNum];
  }

  if (result === "") result = "0";

  return result;
}
