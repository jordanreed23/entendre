export function PostUser(type, userData){
  let baseURL = '';
  return new Promise((resolve, reject) => {
    fetch(baseURL + type, {
      method: 'POST',
      body: JSON.stringify(userData)
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
