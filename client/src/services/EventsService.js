// require("es6-promise").polyfill();
// require("isomorphic-fetch");

const BASE_URL = window.BASE_URL || "/api/PackageManager/";

function toJsonIfJson(text) {
    try {
        const json = JSON.parse(text);
        console.log("json: %o", json);
        return json;
    } catch(e) {
        return text;
    }
}

const SERVICE_URL = "http://localhost:3030/events";

export default class EventsService {

    async get () {
        return fetch(SERVICE_URL + "?limit=5", { method: "GET" })
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
