const eventsFilter = require('./eventsFilter');
var _ = require('lodash');


test('apply should return empty when gets an empty array', () => {
    // Given
    let events = [];
    let filters = {};
    let limit = 100;

    // When
    let result = eventsFilter.for(filters, limit).apply(events);

    // Then
    expect(result).toStrictEqual(events);
});

test('apply should return empty when gets an empty array', () => {
    // Given
    let events = [];
    let filters = {};
    let limit = 100;

    // When
    let result = eventsFilter.for(filters, limit).apply(events);

    // Then
    expect(result).toStrictEqual(events);
});

test('apply should return all items when there ae no filters', () => {
    // Given
    let events = createEvents(10);
    let filters = {};
    let limit = 100;

    // When
    let result = eventsFilter.for(filters, limit).apply(events);

    // Then
    expect(result).toStrictEqual(events);
});

test('apply should return only up to the limit of events', () => {
    // Given
    let events = createEvents(10);
    let filters = {};
    let limit = 5;

    // When
    let result = eventsFilter.for(filters, limit).apply(events);

    // Then
    expect(result).toStrictEqual(events.slice(0, 5));
});

test('apply should return only the events with locations containing the location filter', () => {
    // Given
    let events = createEvents(10);
    let filters = {location: "1"};
    let limit = undefined;

    // When
    let result = eventsFilter.for(filters, limit).apply(events);

    // Then
    expect(result).toStrictEqual([events[1]]);
});

test('apply should return multiple events with locations containing the location filter', () => {
    // Given
    let events = createEvents(10);
    events[0].location = "Somewhere";
    let filters = {location: "Location"};
    let limit = undefined;

    // When
    let result = eventsFilter.for(filters, limit).apply(events);

    // Then
    expect(result).toStrictEqual(events.slice(1));
});

test('apply should return only the events with dates in the date filter', () => {
    // Given
    let events = createEvents(10);
    let filters = {date: events[3].date};
    let limit = undefined;

    // When
    let result = eventsFilter.for(filters, limit).apply(events);

    // Then
    expect(result).toStrictEqual([events[3]]);
});

test('apply should return multiple events with dates in the date filter', () => {
    // Given
    let events = createEvents(10);
    let filters = {date: events[3].date};
    events[5].date = events[3].date;
    let limit = undefined;

    // When
    let result = eventsFilter.for(filters, limit).apply(events);

    // Then
    expect(result).toStrictEqual([events[3], events[5]]);
});

test('apply should not return any event if none matches location and date filters', () => {
    // Given
    let events = createEvents(10);
    let filters = {date: events[3].date, location: "4"};
    let limit = undefined;

    // When
    let result = eventsFilter.for(filters, limit).apply(events);

    // Then
    expect(result).toStrictEqual([]);
});

test('apply should return events when they match location and date filters', () => {
    // Given
    let events = createEvents(10);
    let filters = {date: events[3].date, location: "3"};
    let limit = undefined;

    // When
    let result = eventsFilter.for(filters, limit).apply(events);

    // Then
    expect(result).toStrictEqual([events[3]]);
});


test('apply should sort events by date', () => {
    // Given
    let events = createEvents(10);
    _.reverse(events);
    let filters = {};
    let limit = undefined;

    // When
    let result = eventsFilter.for(filters, limit).apply(events);

    // Then
    _.reverse(events);
    expect(result).toStrictEqual(events);
});


function createEvents(quantity) {
    let events = [];
    _.times(quantity, (index) => events.push({
        id: index,
        title: "Event " + index,
        location: "Location " + index,
        date: new Date(2020, 1, index, 12, 0).toISOString()        
    }))
    return events;
}