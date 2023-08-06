const basePath="https://api.parties.nomoreparties.sbs"


function getHeaders() {
  const token=localStorage.getItem("jwt");
  return {
    "Content-Type": "application/json",
    authorization: `Bearer ${token}`,
  };
}
function getJson(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}
      export async function getUserInfo() {
        const res = await fetch(`${basePath}/users/me`, {
          headers: getHeaders(),
        });
        return getJson(res);
      }
    
      export async function sendUserInfo(userData) {
        const res = await fetch(`${basePath}/users/me`, {
          method: "PATCH",
          headers: getHeaders(),
          body: JSON.stringify(userData),
        });
        return this._getJson(res);
      }
      export async function register(userData) {
        const res = await fetch(`${basePath}/signup`, {
         method: "POST",
         headers: getHeaders(),
         body: JSON.stringify(userData),
        });
        return getJson(res);
      }

      
      export async function login(userData) {
        const res = await fetch(`${basePath}/signin`, {
         method: "POST",
         headers: getHeaders(),
         body: JSON.stringify(userData),
        });
      
        return getJson(res);
       
      }
      export async function checkToken(jwt) {
        const res = await fetch(`${basePath}/users/me`, {
          method: "GET",
          headers: { "Content-Type": "application/json",
          "Authorization" : `Bearer ${jwt}`}
          
         });
         return getJson(res);
      }
    