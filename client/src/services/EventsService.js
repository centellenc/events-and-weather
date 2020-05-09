
function toJsonIfJson(text) {
    try {
        return JSON.parse(text);
    } catch(e) {
        return text;
    }
}

function composeUrlWithFilters(filters, url) {
    if (!filters)
        return url;
    if (filters.location)
        url += "/in/" + encodeURIComponent(filters.location);
    if (filters.date)
        url += "/on/" + encodeURIComponent(filters.date);
    return url;
}

export default class EventsService {

    constructor(fetch, baseUrl) {
        this.fetch = fetch;
        this.baseUrl = baseUrl;
    }

    async get (filters) {
        return this.fetch(composeUrlWithFilters(filters, this.baseUrl) + "?limit=5", { method: "GET" })
        .then(res => res.text())
        .then(toJsonIfJson);
    }

    async add (event) {
        return this.fetch(this.baseUrl, { method: "POST", body: JSON.stringify(event), headers: {"Content-Type": "application/json"} })
        .then(res => res.text())
        .then(toJsonIfJson);
    }

    async update (event) {
        return this.fetch(this.baseUrl, { method: "PUT", body: JSON.stringify(event), headers: {"Content-Type": "application/json"} })
        .then(res => res.text())
        .then(toJsonIfJson);
    }

    async remove (eventId) {
        return this.fetch(this.baseUrl + "/" + eventId, { method: "DELETE" })
        .then(res => res.text())
        .then(toJsonIfJson);
    }
}
