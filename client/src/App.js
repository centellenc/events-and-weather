import React from 'react';
import logo from './logo.svg';
import './App.scss';
import ErrorBoundary from './components/ErrorBoundary'
import Events from './components/Events'
import EventsService from './services/EventsService'
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

function App() {

  let eventsService = new EventsService();

  return (
    <div className="App">
      <Router>
      <header className="App-header">
        <h1>Events and weather</h1>
        {/* <h1><i className="far fa-calendar-alt"></i> Events and weather <i className="fas fa-cloud-sun-rain"></i></h1> */}
      </header>

      <ErrorBoundary>
            <Switch>
              <Route exact path="/" render={(props) => <Events 
                loadEventsFunction={() => eventsService.get()} 
                removeEventFunction={(eventId) => eventsService.remove(eventId)} 
                addEventFunction={(event) => eventsService.add(event)}
                updateEventFunction={(event) => eventsService.update(event)}
                {...props} /> } />
              {/* <Route path="/packages/:id" component={Packages} />
              <Route path="/packages" component={Packages} />
              <Route path="/package/:id" component={Package} /> */}
            </Switch>
          </ErrorBoundary>
      </Router>
    </div>
  );
}

export default App;
