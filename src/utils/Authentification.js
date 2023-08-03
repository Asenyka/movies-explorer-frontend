const basePath="https://api.parties.nomoreparties.sbs"


    function getHeaders() {
        return {
          "Content-Type": "application/json",
        };
      }
      function getJson(res) {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
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
    