var fs = require('fs');
var _ = require('lodash');

save = (events) => {
    fs.writeFile('./events.json', JSON.stringify(events), function (err) {
        if (err)
            throw err;
      });    
}

load = () => {
    try {
        return JSON.parse(fs.readFileSync('./events.json'));
    } catch(e) {
        console.log("Error loading events %o", e);
        return [];
    }
}

valuesMatch = (filterValue, eventValue) => !filterValue || (eventValue.search(new RegExp(_.escapeRegExp(filterValue), "i")) > -1);

datesMatch = (filterIsoDate, eventIsoDate) => {
    if (!filterIsoDate)
        return true;

    let filterDate = new Date(Date.parse(filterIsoDate));
    let eventDate = new Date(Date.parse(eventIsoDate));

    return filterDate.getDay() === eventDate.getDay()
        && filterDate.getMonth() === eventDate.getMonth()
        && filterDate.getFullYear() === eventDate.getFullYear();
};

propertiesMatch = (event, filters, properties) => _.every(properties, (property) => valuesMatch(filters[property], event[property]));
datePropertiesMatch = (event, filters, properties) => _.every(properties, (property) => datesMatch(filters[property], event[property]));

filter = (events, filters) => {
    return _.filter(events, (event) => propertiesMatch(event, filters, ["location"]) && datePropertiesMatch(event, filters, ["date"]));
}

applyLimit = (events, limit) => limit ? events.slice(0, limit) : events;


module.exports = {
    get: (filters, limit) =>  {
        return applyLimit(filters ? filter(load(), filters) : load(), limit);
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
    remove: (eventId) => {
        let events = load();
        _.remove(events, (event) => event.id === eventId);
        save(events);
    }
};