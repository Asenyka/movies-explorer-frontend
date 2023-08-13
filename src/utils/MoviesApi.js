    
    const basePath="https://api.nomoreparties.co/beatfilm-movies";
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
      export async function getCards() {
        const res = await fetch(basePath, {
          headers: getHeaders(),
        });
        return getJson(res);
      }
