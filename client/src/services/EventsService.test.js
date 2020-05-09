import React from 'react';
import EventsService from './EventsService';


describe("EventsService", () => {

    const URL_1 = "one url";
    const LOCATION_1 = "One location";
    const DATE_1 = "One date";
    const EVENT_1 = {
        id: "14235",
        title: "One title",
        location: "One location",
        date: "One date"
    };
    const JSON_HEADERS = { "Content-Type": "application/json" };
    const RESPONSE_1 = "response text 1";
    var responseThen2;
    
    var then1;
    var then2;
    var fetch;
    var eventService;
    var fetchThenResult;
    var fetchSecondThenResult;

    beforeEach(() => {
        responseThen2 = "response text 2";
        then2 = jest.fn((callback) => { fetchSecondThenResult = callback(responseThen2); });
        then1 = jest.fn((callback) => { fetchThenResult = callback({text: () => RESPONSE_1}); return {then: then2}; });
        // then1.mockReturnValue();
        fetch = jest.fn();
        fetch.mockReturnValue({then: then1});
        eventService = new EventsService(fetch, URL_1);
        fetchThenResult = null;
        fetchSecondThenResult = null;
    });


    test('add should call fetch with POST and the event in the body', () => {
        // When
        eventService.add(EVENT_1);
        
        // Then
        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith(URL_1, {body: JSON.stringify(EVENT_1), headers: JSON_HEADERS, method: "POST"});
        expect(fetchThenResult).toBe(RESPONSE_1);
        expect(fetchSecondThenResult).toBe(responseThen2);
    });

    test('response should be parsed to an object when it is JSON', () => {
        // Given
        let oneObject = {a: 1, b: "2"};
        responseThen2 = JSON.stringify(oneObject);

        // When
        eventService.add(EVENT_1);
        
        // Then
        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith(URL_1, {body: JSON.stringify(EVENT_1), headers: JSON_HEADERS, method: "POST"});
        expect(fetchThenResult).toBe(RESPONSE_1);
        expect(fetchSecondThenResult).toStrictEqual(oneObject);
    });


    test('update should call fetch with PUT and the event in the body', () => {
        // When
        eventService.update(EVENT_1);
        
        // Then
        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith(URL_1, {body: JSON.stringify(EVENT_1), headers: JSON_HEADERS, method: "PUT"});
        expect(fetchThenResult).toBe(RESPONSE_1);
        expect(fetchSecondThenResult).toBe(responseThen2);
    });


    test('remove should call fetch with DELETE and the id in the url', () => {
        // When
        eventService.delete(EVENT_1.id);
        
        // Then
        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith(URL_1 + "/" + EVENT_1.id, {method: "DELETE"});
        expect(fetchThenResult).toBe(RESPONSE_1);
        expect(fetchSecondThenResult).toBe(responseThen2);
    });

    describe("get", () => {

        test('should call fetch with GET and no filters when no filters are passed', () => {
            // When
            eventService.get();
            
            // Then
            expect(fetch).toHaveBeenCalledTimes(1);
            expect(fetch).toHaveBeenCalledWith(URL_1 + "?limit=5", {method: "GET"});
            expect(fetchThenResult).toBe(RESPONSE_1);
            expect(fetchSecondThenResult).toBe(responseThen2);
        });

        test('should call fetch with GET and location filter when a location filter is passed', () => {
            // When
            eventService.get({location: LOCATION_1});
            
            // Then
            expect(fetch).toHaveBeenCalledTimes(1);
            expect(fetch).toHaveBeenCalledWith(URL_1 + "/in/" + encodeURIComponent(LOCATION_1) + "?limit=5", {method: "GET"});
        });

        test('should call fetch with GET and date filter when a date filter is passed', () => {
            // When
            eventService.get({date: DATE_1});
            
            // Then
            expect(fetch).toHaveBeenCalledTimes(1);
            expect(fetch).toHaveBeenCalledWith(URL_1 + "/on/" + encodeURIComponent(DATE_1) + "?limit=5", {method: "GET"});
        });

        test('should call fetch with GET and location and date filter when both location and date filter are passed', () => {
            // When
            eventService.get({location: LOCATION_1, date: DATE_1});
            
            // Then
            expect(fetch).toHaveBeenCalledTimes(1);
            expect(fetch).toHaveBeenCalledWith(URL_1 + "/in/" + encodeURIComponent(LOCATION_1) + "/on/" + encodeURIComponent(DATE_1) + "?limit=5", {method: "GET"});
        });
    });
});    