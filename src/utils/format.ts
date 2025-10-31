export function formatNumberWithDecimal(str: any, length = 8) {
  if (str) {
    //just 8 decimals when number
    if (typeof str === "number") {
      str = Math.floor(str * 1.0e8) / 1.0e8;
    } else {
      //remove text
      str = str.replace(/[^\d.]/g, ""); //clear text
    }
    str += "";
    const x = str.split(".");
    let x1 = x[0];
    const x2 = x[1];
    const x3 = x.length > 1 ? "." + x2.slice(0, length) : "";
    if (!x1) x1 = "0";
    const rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
      x1 = x1.replace(rgx, "$1,$2");
    }
    let result = (x1 + x3).replace(/^0+(?!\.|$)/, "").replace(/^\./, "");
    return result;
  } else {
    return 0;
  }
}
