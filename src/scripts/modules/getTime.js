
function getTime(time) {
  const dt = new Date(time * 1000);
  const hr = dt.getHours();
  const m = "0" + dt.getMinutes();
  return hr + ':' + m.substr(-2);
}

export default getTime;