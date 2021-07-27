const searchContainer = document.getElementById('search-container');
const gallery = document.querySelector('#gallery');
const cards = document.getElementsByClassName('card');
const cardContainer = document.querySelector(".card-img-container");
// console.log(cardContainer);

/**  FETCH API **/

async function fetchData(url) {
    return await fetch(url)
        //check status
        .then(response => response.json())
    //catch errors
}

fetchData('https://randomuser.me/api/?nat=us&results=12')
    .then(data => {
         generateCard(data);
        //  generateWindow(data);
    })
    // .then(data => generateWindow(data))

/**  FUNCTIONS **/

function generateCard(data) {
    for (let i = 0; i < data.results.length; i++) {
        let card = document.createElement('div');
        card.className = 'card';
        gallery.appendChild(card);
        card.insertAdjacentHTML('beforeend', `
            <div class="card-img-container">
                <img class="card-img" src="${data.results[i].picture.large}" alt="profile picture">
            </div>
            <div class="card-info-container">
                <h3 id="name" class="card-name cap">${data.results[i].name.first} ${data.results[i].name.last}</h3>
                <p class="card-text">${data.results[i].email}</p>
                <p class="card-text cap">${data.results[i].location.city}, ${data.results[i].location.state}</p>
            </div>
        `);
    }
    //https://stackoverflow.com/questions/222841/most-efficient-way-to-convert-an-htmlcollection-to-an-array
    [...cards].forEach(card => {
        // console.log(card);
        card.addEventListener('click', (e) => {
            generateWindow(data[e.target]);
        })
    });
}

function generateWindow(data){
    let modalContainer = document.createElement('div');
    modalContainer.className = 'modal-container';
    gallery.insertAdjacentElement('afterend', modalContainer);
    console.log(data);
      // console.log(modalContainer);
    fixDate(data);
    let info = data.results[0];
    modalContainer.innerHTML = `
        <div class="modal-container">
        <div class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
                <img class="modal-img" src="${info.picture.large}" alt="profile picture">
                <h3 id="name" class="modal-name cap">${info.name.first} ${info.name.last}</h3>
                <p class="modal-text">${info.email}</p>
                <p class="modal-text cap">${info.location.city}</p>
                <hr>
                <p class="modal-text">${info.phone}</p>
                <p class="modal-text">${info.location.street.number} ${info.location.street.name}, ${info.location.city}, ${info.location.state} ${info.location.postcode}</p>
                <p class="modal-text">Birthday: ${day}/${month}/${year}</p>
            </div>
        </div>
        `;
        // console.log(data);
    const closeBtn = document.getElementById('modal-close-btn');
        // console.log(closeBtn);
    closeBtn.addEventListener('click', () => {
        modalContainer.style.display = 'none';
    })
}

function fixDate(data){
    let info = data.results[0];
    let date = (info.dob.date);
    day = date.split('-')[1];
    month = date.split('-')[2];
    month = month.substring(0,2);
    year = date.split('-')[0];
}
