import VMAP from "../vmap";

export const fetchAdUrl = (url) => new Promise((resolve, reject) => {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.send();
  xhr.onreadystatechange = () => {
    try {
      if (xhr.readyState === xhr.DONE) {
        if (xhr.status === 200) {
            if(xhr.responseXML.documentElement.tagName.toLowerCase().includes("vmap")){
                const vmap = new VMAP(xhr.responseXML);
                resolve({adType: "vmap", vmap: vmap});
            }
            resolve({xml :xhr.responseXML, adType: "vast"});
        }
      }
    } catch (error) {
      reject(error);
    }
  };
  return [xhr, "xhr"]
});
