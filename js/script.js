const searchContainer = document.getElementById('search-container');

const gallery = document.querySelector('#gallery');

const card = document.createElement('div');
card.className = 'card';
card.innerHTML = `
<div class="card">
    <div class="card-img-container">
        <img class="card-img" src="https://placehold.it/90x90" alt="profile picture">
    </div>
    <div class="card-info-container">
        <h3 id="name" class="card-name cap">first last</h3>
        <p class="card-text">email</p>
        <p class="card-text cap">city, state</p>
    </div>
</div>
`;

gallery.appendChild(card);

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



/**  FETCH API **/

function fetchData(url){
    return fetch(url)
    //check status
        .then(response => response.json())
        //catch errors
}

Promise.all([
    fetchData('https://randomuser.me/api/')
])
.then(data => generateCard(data))


function generateCard(data){
    const html = `
    <div class="card">
        <div class="card-img-container">
            <img class="card-img" src="${data[0].results[0].picture.thumbnail}" alt="profile picture">
        </div>
        <div class="card-info-container">
            <h3 id="name" class="card-name cap">${data[0].results[0].name.first} ${ data[0].results[0].name.last}</h3>
            <p class="card-text">${data[0].results[0].email}</p>
            <p class="card-text cap">${data[0].results[0].location.city}, ${data[0].results[0].location.state}</p>
        </div>
    </div>
    `;
    card.innerHTML = html;
}