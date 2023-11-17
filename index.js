const BASE_URL = 'https://fsa-crud-2aa9294fe819.herokuapp.com/api/2308-ACC-ET-WEB-PT-B';
const EVENTS_ENDPOINT = `${BASE_URL}/events`;

const PARTY_LIST = document.getElementById('partyList');


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

fetchEvents();

function renderEvents(events) {

    PARTY_LIST.innerHTML = '';
    for (let event of events) {
        let eventListItem = document.createElement("li");

        eventListItem.textContent = `Name: ${event.name} Description: ${event.description} Date: ${event.date} Location: ${event.location}`;
        PARTY_LIST.append(eventListItem);
    }
}




