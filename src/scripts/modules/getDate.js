

function getDate (unixTimeEl) {
  const unixTime = unixTimeEl;
  const date = new Date(unixTime*1000);
  return date.toLocaleDateString("en-GB");

}

export default getDate;