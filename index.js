const BASE_URL = 'https://fsa-crud-2aa9294fe819.herokuapp.com/api/2308-ACC-ET-WEB-PT-B';
const EVENTS_ENDPOINT = `${BASE_URL}/events`;
const PARTY_LIST = document.getElementById('partyList');

const FORM = document.querySelector('form');
FORM.addEventListener('submit', (event) => {
    event.preventDefault();
    const elements = FORM.elements;
    const partyName = elements['partyName'].value;
    const partyDate = elements['partyDate'].value;
    const partyTime = elements['partyTime'].value;
    const partyLocation = elements['partyLocation'].value;
    const partyDescription = elements['partyDescription'].value;

    const newPartyData = {
        name: partyName,
        date: `${partyDate}${partyTime}`,
        location: partyLocation,
        description: partyDescription,
    }
})

async function fetchEvents() {
    try {
        const response = await fetch(EVENTS_ENDPOINT);
        if (!response.ok) {
            console.log("API error", response.status);
            return;
        }
        const jsonResponse = await response.json();
        const events = jsonResponse.data;
        renderEvents(events);


    } catch (error) {
        console.error(error);
    }
}

function createPartyCard(title, date, address, description) {


    const PARTY_CARD = document.createElement("div");
    PARTY_CARD.classList.add('card')

    const PARTY_CARD_TITLE = document.createElement("h2");
    PARTY_CARD_TITLE.classList.add('title');
    PARTY_CARD_TITLE.textContent = title;

    const PARTY_CARD_DATE = document.createElement("p");
    PARTY_CARD_DATE.classList.add('date');
    PARTY_CARD_DATE.textContent = date;

    const PARTY_CARD_ADDRESS = document.createElement("p");
    PARTY_CARD_ADDRESS.classList.add('address')
    PARTY_CARD_ADDRESS.textContent = address;

    const PARTY_CARD_DESCRIPTION = document.createElement("p");
    PARTY_CARD_DESCRIPTION.classList.add('description');
    PARTY_CARD_DESCRIPTION.textContent = description;

    PARTY_CARD.append(PARTY_CARD_TITLE, PARTY_CARD_DATE, PARTY_CARD_ADDRESS, PARTY_CARD_DESCRIPTION);
    PARTY_CARD.append(PARTY_CARD);


    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.onclick = function () { deleteEvent(EVENTS.id); };
    PARTY_CARD.appendChild(deleteButton);

    return PARTY_CARD;
}


function renderEvents(events) {

    PARTY_LIST.innerHTML = '';
    for (let event of events) {
        let eventListItem = document.createElement("li");

        eventListItem.textContent = `Name: ${event.name} Description: ${event.description} Date: ${event.date} Location: ${event.location}`;
        PARTY_LIST.append(eventListItem);
    }
}

async function deleteEvent(eventId) {
    try {
        const response = await fetch(`${EVENTS_ENDPOINT}/${eventId}`, {
            method: 'DELETE'
        });
        if (!response.ok) throw new Error('Error on delete');
        fetchEvents(); // Refresh the list
    } catch (error) {
        console.error('Delete error:', error);
    }
}

fetchEvents();



