const searchContainer = document.getElementById('search-container');

const gallery = document.querySelector('#gallery');


/**  FETCH API **/

function fetchData(url) {
    return fetch(url)
        //check status
        .then(response => response.json())
    //catch errors
}


fetchData('https://randomuser.me/api/?nat=us&results=12')
    .then(data => {
         generateCard(data),
        generateWindow(data);
    })
    // .then(data => generateWindow(data))


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
}

const modalContainer = document.createElement('div');
modalContainer.className = 'modal-container';
modalContainer.innerHTML = `
<div class="modal-container">
<div class="modal">
    <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
    <div class="modal-info-container">
        <img class="modal-img" src="https://placehold.it/125x125" alt="profile picture">
        <h3 id="name" class="modal-name cap">name</h3>
        <p class="modal-text">email</p>
        <p class="modal-text cap">city</p>
        <hr>
        <p class="modal-text">(555) 555-5555</p>
        <p class="modal-text">123 Portland Ave., Portland, OR 97204</p>
        <p class="modal-text">Birthday: 10/21/2015</p>
    </div>
</div>
`;

const cardContainer = document.querySelector(".card-img-container");
console.log(cardContainer);

function generateWindow(data){
    let modalContainer = document.createElement('div');
    modalContainer.className = 'modal-container';
    gallery.insertAdjacentElement('afterend', modalContainer);
    console.log(modalContainer);
    let date = (data.results[0].dob.date);
    day = date.split('-')[1];
    month = date.split('-')[2];
    month = month.substring(0,2);
    year = date.split('-')[0];
    modalContainer.innerHTML = `
        <div class="modal-container">
        <div class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
                <img class="modal-img" src="${data.results[0].picture.large}" alt="profile picture">
                <h3 id="name" class="modal-name cap">${data.results[0].name.first} ${data.results[0].name.last}</h3>
                <p class="modal-text">${data.results[0].email}</p>
                <p class="modal-text cap">${data.results[0].location.city}</p>
                <hr>
                <p class="modal-text">${data.results[0].phone}</p>
                <p class="modal-text">${data.results[0].location.street.number} ${data.results[0].location.street.name}, ${data.results[0].location.city}, ${data.results[0].location.state} ${data.results[0].location.postcode}</p>
                <p class="modal-text">Birthday: ${day}/${month}/${year}</p>
            </div>
        </div>
        `;}
