export function PostUser(type, userData){
  // https://galvanize-cors-proxy.herokuapp.com/
  let baseURL = 'https://entendre.herokuapp.com/';
  return new Promise((resolve, reject) => {
    fetch(baseURL + type, {
      method: 'POST',
      body: JSON.stringify(userData),
      mode: "no-cors",
    })
    .then((response) => response.json())
    .then((res) => {
      resolve(res)
    })
    .catch((error) => {
      reject(error)
    });
  });
}
