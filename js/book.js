function getToken() {
    return localStorage.getItem('token');
  }
  
  async function getUserByToken(token) {
    try {
      const res = await axios.get('https://api.marktube.tv/v1/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (error) {
      console.log('getUserByToken error', error);
      return null;
    }
  }
  
  async function logout() {
    const token = getToken();
    if (token === null) {
      location = '/login';
      return;
    }
    try {
      await axios.delete('https://api.marktube.tv/v1/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.log('logout error', error);
    } finally {
      localStorage.clear();
      window.location.href = '/login';
    }
  }
  
  async function getBook(bookId) {
    const token = getToken();
    if (token === null) {
      location.href = '/login';
      return null;
    }
    try {
      const res = await axios.get(`https://api.marktube.tv/v1/book/${bookId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (error) {
      console.log('getBook error', error);
      return null;
    }
  }
  
  async function deleteBook(bookId) {
    const token = getToken();
    if (token === null) {
      location = '/login';
      return;
    }
    await axios.delete(`https://api.marktube.tv/v1/book/${bookId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  
  function bindLogoutButton() {
    const btnLogout = document.querySelector('#btn_logout');
    btnLogout.addEventListener('click', logout);
  }
  
  function render(book) {
    const detailElement = document.querySelector('#detail');
  
    detailElement.innerHTML = `<div class="card bg-light w-100">
      <div class="card-header"><h4>${book.title}</h4></div>
      <div class="card-body">
        <h5 class="card-title">"${book.message}"</h5>
        <p class="card-text">????????? : ${book.author}</p>
        <p class="card-text">?????? : <a href="${
          book.url
        }" target="_BLANK">?????? ??????</a></p>
        <a href="/edit.html?id=${book.bookId}" class="btn btn-primary btn-sm">Edit</a>
        <button type="button" class="btn btn-danger btn-sm" id="btn-delete">Delete</button>
      </div>
      <div class="card-footer">
          <small class="text-muted">????????? : ${new Date(
            book.createdAt,
          ).toLocaleString()}</small>
        </div>
    </div>`;
  
    document.querySelector('#btn-delete').addEventListener('click', async () => {
      try {
        await deleteBook(book.bookId);
        location.href = '/';
      } catch (error) {
        console.log(error);
      }
    });
  }
  
  async function main() {
    // ????????? ????????? ??????
    bindLogoutButton();
  
    // ?????????????????? id ????????????
    const bookId = new URL(location.href).searchParams.get('id');
  
    // ?????? ??????
    const token = getToken();
    if (token === null) {
      location.href = '/login';
      return;
    }
  
    // ???????????? ???????????? ?????? ?????? ????????????
    const user = await getUserByToken(token);
    if (user === null) {
      localStorage.clear();
      location.href = '/login';
      return;
    }
  
    // ?????? ???????????? ????????????
    const book = await getBook(bookId);
    if (book === null) {
      alert('???????????? ??? ???????????? ??????');
      return;
    }
  
    // ????????? ?????? ?????????
    render(book);
  }
  
  document.addEventListener('DOMContentLoaded', main);