const eventsAppCreator = require('./eventsApp');

const LOCATION_1 = "One location";
const DATE_1 = "One date";
const LIMIT_1 = 85;
const EVENT_1 = {
    id: "14235",
    title: "One title",
    location: "One location",
    date: "One date"
};

var eventsDataAccessMock;
var eventValidatorMock;
var eventsApp;

beforeEach(() => {
    eventsDataAccessMock = jest.createMockFromModule('../persistence/eventsJsonDataAccess');
    eventValidatorMock = jest.createMockFromModule('../businessLogic/eventValidator');
    eventsApp = eventsAppCreator.create(eventsDataAccessMock, eventValidatorMock);
});

test('push should call the data access create', () => {
    // Given
    const request = {body: EVENT_1};
    const response = {send: jest.fn()};

    // When
    eventsApp.post(request, response);

    // Then
    expect(eventsDataAccessMock.create).toHaveBeenCalledTimes(1);
    expect(eventsDataAccessMock.create).toHaveBeenCalledWith(EVENT_1);
});

test('put should call the data access update', () => {
    // Given
    const request = {body: EVENT_1};
    const response = {send: jest.fn()};

    // When
    eventsApp.put(request, response);

    // Then
    expect(eventsDataAccessMock.update).toHaveBeenCalledTimes(1);
    expect(eventsDataAccessMock.update).toHaveBeenCalledWith(EVENT_1);
});

test('delete should call the data access delete', () => {
    // Given
    const request = {params: {id: EVENT_1.id}};
    const response = {send: jest.fn()};

    // When
    eventsApp.delete(request, response);

    // Then
    expect(eventsDataAccessMock.delete).toHaveBeenCalledTimes(1);
    expect(eventsDataAccessMock.delete).toHaveBeenCalledWith(EVENT_1.id);
});

test('delete should call the data access delete', () => {
    // Given
    const request = {params: {id: EVENT_1.id}};
    const response = {send: jest.fn()};

    // When
    eventsApp.delete(request, response);

    // Then
    expect(eventsDataAccessMock.delete).toHaveBeenCalledTimes(1);
    expect(eventsDataAccessMock.delete).toHaveBeenCalledWith(EVENT_1.id);
});

describe("get", () => {

    test('should call the data access get without filters and limit when the request doesn\'t have filters and limit', () => {
        // Given
        const request = {params: {}, query: {}};
        const response = {send: jest.fn()};
    
        // When
        eventsApp.get(request, response);
    
        // Then
        expect(eventsDataAccessMock.get).toHaveBeenCalledTimes(1);
        expect(eventsDataAccessMock.get).toHaveBeenCalledWith({location: undefined, date: undefined}, undefined);
    });

    test('should call the data access get with location filter when the request contains a location filter', () => {
        // Given
        const request = {params: {location: LOCATION_1}, query: {}};
        const response = {send: jest.fn()};
    
        // When
        eventsApp.get(request, response);
    
        // Then
        expect(eventsDataAccessMock.get).toHaveBeenCalledTimes(1);
        expect(eventsDataAccessMock.get).toHaveBeenCalledWith({location: LOCATION_1, date: undefined}, undefined);
    });

    test('should call the data access get with date filter when the request contains a date filter', () => {
        // Given
        const request = {params: {date: DATE_1}, query: {}};
        const response = {send: jest.fn()};
    
        // When
        eventsApp.get(request, response);
    
        // Then
        expect(eventsDataAccessMock.get).toHaveBeenCalledTimes(1);
        expect(eventsDataAccessMock.get).toHaveBeenCalledWith({location: undefined, date: DATE_1}, undefined);
    });

    test('should call the data access get with a limit when the request contains a limit', () => {
        // Given
        const request = {params: {}, query: {limit: LIMIT_1}};
        const response = {send: jest.fn()};
    
        // When
        eventsApp.get(request, response);
    
        // Then
        expect(eventsDataAccessMock.get).toHaveBeenCalledTimes(1);
        expect(eventsDataAccessMock.get).toHaveBeenCalledWith({location: undefined, date: undefined}, LIMIT_1);
    });

    test('should call the data access get with location and date filters and a limit when the request contains them all', () => {
        // Given
        const request = {params: {date: DATE_1, location: LOCATION_1}, query: {limit: LIMIT_1}};
        const response = {send: jest.fn()};
    
        // When
        eventsApp.get(request, response);
    
        // Then
        expect(eventsDataAccessMock.get).toHaveBeenCalledTimes(1);
        expect(eventsDataAccessMock.get).toHaveBeenCalledWith({location: LOCATION_1, date: DATE_1}, LIMIT_1);
    });
    
});

