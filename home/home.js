const checkLogin = () => {
    const user = localStorage.getItem('email');
    const pass = localStorage.getItem('pass');

    if (!user && !pass) {
       window.location.replace('/login/login.html');
    }
}

const getData = async () => {
    let response = await fetch('../assets/data.json');
    let data = await response.json();
    return data;
}

const addCar = () => {
    console.log('hola');
}

const createGameCard = (videogame) => {

    const {id, img, name, price} = videogame;

    const contentV = document.getElementById('gamesBox');
    const card = document.createElement('div');
    card.classList.add('gameCard');
    contentV.appendChild(card);

    const boxImg = document.createElement('div');
    boxImg.classList.add('img');
    card.appendChild(boxImg);

    const imgV = document.createElement('img');
    imgV.src = img;
    boxImg.appendChild(imgV);

    const boxText = document.createElement('div');
    boxText.classList.add('text');
    card.appendChild(boxText);

    const nameV = document.createElement('p');
    nameV.classList.add('gName');
    boxText.appendChild(nameV);
    nameV.innerHTML = name;

    const priceV = document.createElement('p');
    priceV.classList.add('gPrice');
    boxText.appendChild(priceV);
    priceV.innerHTML = `${price} USD`;

    const divider = document.createElement('hr');
    card.appendChild(divider);

    const option = document.createElement('div');
    option.classList.add('options');
    card.appendChild(option);

    const btn = document.createElement('a');
    btn.classList.add('btn');
    btn.classList.add('btnAddCar');
    option.appendChild(btn);
    btn.setAttribute('id', `game_${id}`);
    btn.onclick = async function() {
        let videogames = await getData();
        videogames.find(element => {
            const idIn = element.id;
            if(id === idIn){
                Toastify(
                    {
                        text: "agregando ...",
                        duration: 2000,
                        gravity: "top", // `top` or `bottom`
                        position: "right", // `left`, `center` or `right`
                        stopOnFocus: true, // Prevents dismissing of toast on hover
                        style: {
                            background: "linear-gradient(to right, #0077b6, #00b4d8)",
                        },
                onClick: function(){} // Callback after click
                }).showToast();
                let videogame = JSON.stringify(element);
                localStorage.setItem(`videogame_${idIn}`, videogame);
            }
        });
    }
    btn.innerHTML = 'Agregar al carrito  ';

    const icon = document.createElement('i');
    icon.classList.add('fa-solid');
    icon.classList.add('fa-cart-plus');
    btn.appendChild(icon);
}

const displayGames = async () => {
    let videogames = await getData();
    for(let item of videogames){
        createGameCard(item);
    }
}

const searchVideogame = (videogames) => {
    const btnSearch = document.getElementById('btnSearch');
    const formSearch = document.getElementById('formSearch');

    btnSearch.addEventListener('click', async (e) => {
        e.preventDefault();
        const value = formSearch[0].value.toLowerCase();

        let videogames = await getData();

        if (value === '') {
            const contentV = document.getElementById('gamesBox');
            contentV.innerHTML = '';
            let videogames = await getData();
            for (let item of videogames) {
                createGameCard(item);
            }
        } else {
            const contentV = document.getElementById('gamesBox');
            contentV.innerHTML = '';
            videogames.find(element => {
                const name = element.name.toLowerCase()
                if(name.includes(value)){
                    createGameCard(element);
                }
            });
        }

    });

    formSearch.addEventListener('keypress', (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
        }
    });

    formSearch.addEventListener('search', async () => {
        const contentV = document.getElementById('gamesBox');
        contentV.innerHTML = '';
        let videogames = await getData();
        for (let item of videogames) {
            createGameCard(item);
        }
    });
}

const orderVideoGameByPriceLow = (videogames) => {
    const btnLow = document.getElementById('btnLow');

    btnLow.addEventListener('click', async () => {

        Toastify(
            {
                text: "Ordenando ...",
                duration: 3000,
                gravity: "top", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                    background: "linear-gradient(to right, #0077b6, #00b4d8)",
                },
        onClick: function(){} // Callback after click
        }).showToast();

        let videogames = await getData();

        setTimeout(() => {
            videogames.sort((a, b) => {
                if (a.price > b.price) {
                    return 1;
                } else if (a.price < b.price) {
                    return -1;
                } else {
                    return 0;
                }
            });
            const contentV = document.getElementById('gamesBox');
            contentV.innerHTML = '';
            for (let item of videogames) {
                createGameCard(item);
            }
        }, 2000);
    });
}

const orderVideoGameByPriceHigh = (videogames) => {
    const btnHigh = document.getElementById('btnHigh');

    btnHigh.addEventListener('click', async () => {

        Toastify(
            {
                text: "Ordenando ...",
                duration: 3000,
                gravity: "top", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                    background: "linear-gradient(to right, #0077b6, #00b4d8)",
                },
        onClick: function(){} // Callback after click
        }).showToast();

        let videogames = await getData();

        setTimeout(() => {
            videogames.sort((a, b) => {
                if (a.price < b.price) {
                    return 1;
                } else if (a.price > b.price) {
                    return -1;
                } else {
                    return 0;
                }
            });
            const contentV = document.getElementById('gamesBox');
            contentV.innerHTML = '';
            for (let item of videogames) {
                createGameCard(item);
            }
        }, 2000);

    });
}

checkLogin();
displayGames();
searchVideogame();
orderVideoGameByPriceLow();
orderVideoGameByPriceHigh();
