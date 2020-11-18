
const getResource = async (url)=>{
  let res  = await fetch (url);
  if (!res.ok){
    throw  new Error (`Could not Fetch ${url}, status ${res.status}`);
  }
  return await res.json();
};

export default getResource;