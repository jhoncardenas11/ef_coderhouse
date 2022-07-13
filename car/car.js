let local = localStorage;
let videogames = [];

for (let item in local) {
    if (item.indexOf('videogame') > -1) {
        let videogame = localStorage.getItem(item);
        videogames.push(JSON.parse(videogame));
    }
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
    btn.classList.add('btnRemoveCar');
    option.appendChild(btn);
    btn.setAttribute('id', `game_${id}`);
    btn.onclick = async function() {
        Toastify(
            {
                text: "eliminando ...",
                duration: 2000,
                gravity: "top", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                    background: "linear-gradient(to right, #0077b6, #00b4d8)",
                },
        onClick: function(){} // Callback after click
        }).showToast();
        setTimeout(() => {
            localStorage.removeItem(`videogame_${id}`);
            location.reload();
        }, 2000)
    }

    const icon = document.createElement('i');
    icon.classList.add('fa-solid');
    icon.classList.add('fa-circle-minus');
    btn.appendChild(icon);
}

for (let item of videogames) {
    createGameCard(item);
}
