import React from 'react';
import './App.scss';
import ErrorBoundary from './components/ErrorBoundary'
import Events from './components/Events'
import EventsService from './services/EventsService'
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import {registerLocale as datePickerRegisterLocale, setDefaultLocale as datePickerSetDefaultLocale } from  "react-datepicker"
import getUserLocale from 'get-user-locale';


function App() {

  const locale = getUserLocale();
  const localeDefinition = require('date-fns/locale/' + locale).default;
  datePickerRegisterLocale(locale, localeDefinition)
  datePickerSetDefaultLocale(localeDefinition);

  let eventsService = new EventsService(window.fetch.bind(window), "http://localhost:3030/events");

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
                {...props} /> } />
            </Switch>
          </ErrorBoundary>
      </Router>
    </div>
  );
}

export default App;
