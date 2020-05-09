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

valuesMatch = (filterValue, eventValue) => {
    console.log("\nfilterValue: " + filterValue);
    console.log("eventValue: " + eventValue);
    console.log(eventValue.search(new RegExp(_.escapeRegExp(filterValue), "i")));
    console.log(filterValue && (eventValue.search(new RegExp(_.escapeRegExp(filterValue), "i") > -1)));
    return filterValue && (eventValue.search(new RegExp(_.escapeRegExp(filterValue), "i")) > -1)
};

propertiesMatch = (event, filters, properties) => _.some(properties, (property) => valuesMatch(filters[property], event[property]));

filter = (events, filters) => {
    return _.filter(events, (event) => propertiesMatch(event, filters, ["location", "date"]));
}

applyLimit = (events, limit) => {
    console.log("limit: " + limit);
    console.log("events %o: ", events);
   
    return limit ? events.slice(0, limit) : events;
}

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