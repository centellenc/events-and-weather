var fs = require('fs');
var eventsFilter = require('./eventsFilter');

const JSON_FILE_PATH = './persistence/storage/events.json';

save = (events) => {
    fs.writeFile(JSON_FILE_PATH, JSON.stringify(events), function (err) {
        if (err)
            throw err;
      });    
}

load = () => {
    try {
        return JSON.parse(fs.readFileSync(JSON_FILE_PATH));
    } catch(e) {
        console.log("Error loading events %o", e);
        return [];
    }
}

module.exports = {
    get: (filters, limit) =>  {
        return eventsFilter.for(filters, limit).apply(load());
    },
    create: (event) => {
        let events = load();
        events.push(event);
        save(events);
    },
    update: (eventToUpdate) => {
        let events = load();
        let indexOfExistingEvent = _.findIndex(events, (event) => event.id === eventToUpdate.id);
        events.splice(indexOfExistingEvent, 1, eventToUpdate);
        save(events);
    },
    delete: (eventId) => {
        let events = load();
        _.remove(events, (event) => event.id === eventId);
        save(events);
    }
};