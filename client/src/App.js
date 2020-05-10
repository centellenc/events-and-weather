import React from 'react';
import './App.scss';
import ErrorBoundary from './components/ErrorBoundary';
import Events from './components/Events';
import EventsService from './services/EventsService';
import WeatherService from './services/WeatherService';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {registerLocale as datePickerRegisterLocale, setDefaultLocale as datePickerSetDefaultLocale } from  "react-datepicker";
import getUserLocale from 'get-user-locale';


function App() {

  const locale = getUserLocale();
  const localeDefinition = require('date-fns/locale/' + locale).default;
  datePickerRegisterLocale(locale, localeDefinition)
  datePickerSetDefaultLocale(localeDefinition);

  const bindedFetch = window.fetch.bind(window);
  const eventsService = new EventsService(bindedFetch, "http://localhost:3030/events");
  const weatherService = new WeatherService(bindedFetch, "http://api.openweathermap.org/data/2.5", "990d1688684038ff997c7cf5ffb5ad8b");

  return (
    <div className="App">
      <Router>
      <header className="mb-3">
        <h1>Events and weather</h1>
      </header>

      <ErrorBoundary>
            <Switch>
              <Route exact path="/" render={(props) => <Events 
                loadEventsFunction={(filters) => eventsService.get(filters)} 
                deleteEventFunction={(eventId) => eventsService.delete(eventId)} 
                addEventFunction={(event) => eventsService.add(event)}
                updateEventFunction={(event) => eventsService.update(event)}
                getWeatherForecastFunction={(event) => weatherService.getForecast(event.location, event.date)}
                {...props} /> } />
            </Switch>
          </ErrorBoundary>
      </Router>
    </div>
  );
}

export default App;
