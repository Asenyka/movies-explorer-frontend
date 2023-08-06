    
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
      export async function sendCard(cardData) {
        const res = await fetch(basePath, {
          method: "POST",
          headers: getHeaders(),
          body: JSON.stringify(cardData),
        });
        return getJson(res);
      }
      export async function deleteCard(id) {
        const res = await fetch(basePath, {
          method: "DELETE",
          headers: getHeaders(),
        });
        return getJson(res);
      }
      export async function changeLike(cardID, isLiked) {
        if (!isLiked) {
          const res = await fetch(basePath, {
            method: "PUT",
            headers: getHeaders(),
          });
          return getJson(res);
        } else {
          const res = await fetch(basePath, {
            method: "DELETE",
            headers: getHeaders(),
          });
          return getJson(res);
        }
      }
