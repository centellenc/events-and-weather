import React from 'react';
import { validate } from 'parameter-validator';
import parseISO from 'date-fns/parseISO'

class Event extends React.Component {

    constructor(props) {
        super(props);
        validate(props, ["onRemove", "onEdit", "getWeatherForecastFunction"]);
        this.state = {};
    }
    
    currentRenderedLocation = null;
    currentRenderedDate = null;
    componentDidUpdate() {
        const event = this.props.event;
        if (event.location !== this.currentRenderedLocation || event.date !== this.currentRenderedDate) {
            this.loadForecastIcon();
            this.currentRenderedLocation = event.location;
            this.currentRenderedDate = event.date;
        }
    }

    loadForecastIcon() {
        this.setState({weather: null}, () => {
            this.props.getWeatherForecastFunction(this.props.event)
            .then(forecast => {
                console.debug("Forecast for event %s: %o", this.props.event.title, forecast);
                if (forecast && forecast.weather && forecast.weather.length > 0)
                    this.setState({weather: forecast.weather[0]});
            });
        });
    }

    render() {
        return (
            <div className="d-flex w-100 justify-content-between">
                <div className="w-100 d-flex flex-column flex-grow-1">
                    <h5 className="mb-1 flex-grow-1">{this.props.event.title}</h5>
                    <small><i className="far fa-clock"></i> {parseISO(this.props.event.date).toLocaleString()}</small>
                    <small><i className="fas fa-map-marker-alt"></i> {this.props.event.location}</small>
                </div>
                {this.state.weather && 
                <div className="flex-column mr-3 align-self-center">
                    <img alt={this.state.weather.main} title={this.state.weather.main} src={"http://openweathermap.org/img/w/" + this.state.weather.icon + ".png"} />
                </div>}
                <div className="d-flex flex-column">
                    <button type="button" className="btn btn btn-secondary btn-sm" onClick={() => this.props.onRemove(this.props.event)}><i className="fas fa-times"></i></button>
                    <button type="button" className="btn btn btn-secondary btn-sm mt-1" onClick={() => this.props.onEdit(this.props.event)}><i className="fas fa-pen"></i></button>
                </div>
            </div>
        );
    }
}

export default Event;