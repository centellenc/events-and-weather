var _ = require('lodash');
var parseISO  = require('date-fns/parseISO').default

valuesMatch = (filterValue, eventValue) => !filterValue || (eventValue.search(new RegExp(_.escapeRegExp(filterValue), "i")) > -1);
propertiesMatch = (event, filters, properties) => _.every(properties, (property) => valuesMatch(filters[property], event[property]));
datePropertiesMatch = (event, filters, properties) => _.every(properties, (property) => datesMatch(filters[property], event[property]));
filter = (events, filters) => _.filter(events, (event) => propertiesMatch(event, filters, ["location"]) && datePropertiesMatch(event, filters, ["date"]));
applyLimit = (events, limit) => limit ? events.slice(0, limit) : events;
sortByDate = (events) => _.sortBy(events, ["date", "title"]);

datesMatch = (filterIsoDate, eventIsoDate) => {
    if (!filterIsoDate)
        return true;

    let filterDate = parseISO(filterIsoDate);
    let eventDate = parseISO(eventIsoDate);

    return filterDate.getDay() === eventDate.getDay()
        && filterDate.getMonth() === eventDate.getMonth()
        && filterDate.getFullYear() === eventDate.getFullYear();
};


module.exports = {
    for: (filters, limit) => {
        return {
            apply (events) {
                return applyLimit(sortByDate(filters ? filter(events, filters) : events), limit);
            }
        };
    }
}
