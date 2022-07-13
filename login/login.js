const form = document.getElementById('form1'),
        btn = document.getElementById('btn1'),
        alertEmail = document.getElementById('alertEmail'),
        alertPass = document.getElementById('alertPass');

verifyEmail = (email) => {
    const vEmail = String(email)
        .toLocaleLowerCase()
            .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

    // if (vEmail === null) {
    //     alertEmail.classList.remove('hide');
    // } else {
    //     return true;
    // }

    return vEmail === null ? alertEmail.classList.remove('hide') : true;
}

verifyPassword = (pass) => {
    const vPass = String(pass);
    // if (vPass == '') {
    //     alertPass.classList.remove('hide');
    // }else{
    //     return true;
    // }

    return vPass === '' ? alertPass.classList.remove('hide') : true;
}

btn.addEventListener('click', (e) => {

    e.preventDefault();

    const email = form[0].value;
    const password = form[1].value;

    if (verifyEmail(email) && verifyPassword(password)) {
        alertEmail.classList.add('hide');
        alertPass.classList.add('hide');
        localStorage.setItem('email', email);
        localStorage.setItem('pass', password);

        Toastify(
            {
                text: "Ingresando...",
                duration: 4000,
                gravity: "top", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                    background: "linear-gradient(to right, #0077b6, #00b4d8)",
                },
        onClick: function(){} // Callback after click
        }).showToast();

        setTimeout(() => {
            window.location.href = '../home/home.html';
        }, 5000);
    }

});