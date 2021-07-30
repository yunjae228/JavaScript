function getToken() {
    return localStorage.getItem('token');
}

function login(){

}

function bindLoginButton() {
    const form = document.querySelector('#form-login');
    form.addEventListener('submit', login);

}



function main() {
    //버튼 이벤트 연결
    bindLoginButton();

    //토큰 체크
    const token = getToken();
    if( token ===)
}


document.addEventListener('DOMContentLoaded' , main );