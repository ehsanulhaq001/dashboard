export function makeTempData(arr, xKey = "DeviceID", sortKey = "time_stmp") {
  arr.sort((a, b) => timeDateSorter(a, b, sortKey));
  let dataLabels = [];
  let temp = [];
  console.log("TempDataFetched: ", arr.length);
  for (let i = 0; i < arr.length; i++) {
    dataLabels.push(arr[i][xKey]);
    temp.push(
      Math.abs(arr[i].Temperature_degC) > 100 ? 0 : arr[i].Temperature_degC
    );
  }
  return { dataLabels, temp };
}

export function makeAccData(arr, xKey = "DeviceID", sortKey = "time_stmp") {
  arr.sort((a, b) => timeDateSorter(a, b, sortKey));
  let dataLabels = [];
  let dataX = [];
  let dataY = [];
  let dataZ = [];
  let abs = [];
  console.log("AccDataFetched: ", arr.length);
  for (let i = 0; i < arr.length; i++) {
    dataLabels.push(arr[i][xKey]);
    dataX.push(arr[i].X_axis);
    dataY.push(arr[i].Y_axis);
    dataZ.push(arr[i].Z_axis);
    let x = Math.pow(
      Math.pow(arr[i].X_axis, 2) +
        Math.pow(arr[i].Y_axis, 2) +
        Math.pow(arr[i].Z_axis, 2),
      0.5
    );
    abs.push(x);
  }
  return { dataLabels, dataX, dataY, dataZ, abs };
}

function toDate(a) {
  a = a.substring(3, 6) + a.substring(0, 3) + a.substring(6);
  return new Date(a);
}

function timeDateSorter(_a, _b, key) {
  let a = _a[key];
  let b = _b[key];

  let p = toDate(a);
  let q = toDate(b);
  if (p < q) return -1;
  else if (p > q) return 1;
  return 0;
}