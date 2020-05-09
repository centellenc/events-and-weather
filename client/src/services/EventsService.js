
function toJsonIfJson(text) {
    try {
        return JSON.parse(text);
    } catch(e) {
        return text;
    }
}

function composeUrlWithFilters(filters) {
    let url = SERVICE_URL;
    if (!filters)
        return url;
    if (filters.location)
        url += "/in/" + encodeURIComponent(filters.location);
    if (filters.date)
        url += "/on/" + encodeURIComponent(filters.date);
    return url;
}

const SERVICE_URL = "http://localhost:3030/events";

export default class EventsService {

    async get (filters) {
        return fetch(composeUrlWithFilters(filters) + "?limit=5", { method: "GET" })
        .then(res => res.text())
        .then(toJsonIfJson);
    }

    async add (event) {
        return fetch(SERVICE_URL, { method: "POST", body: JSON.stringify(event), headers: {"Content-Type": "application/json"} })
        .then(res => res.text())
        .then(toJsonIfJson);
    }

    async update (event) {
        return fetch(SERVICE_URL, { method: "PUT", body: JSON.stringify(event), headers: {"Content-Type": "application/json"} })
        .then(res => res.text())
        .then(toJsonIfJson);
    }

    async remove (eventId) {
        return fetch(SERVICE_URL + "/" + eventId, { method: "DELETE" })
        .then(res => res.text())
        .then(toJsonIfJson);
    }

    static formatDate (s) {
        return new Date(s).toLocaleString('en-GB', {
            dateStyle: "short", 
            timeStyle: "short" 
        });
    }
}
