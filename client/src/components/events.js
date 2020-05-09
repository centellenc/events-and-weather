import React from 'react';
import { validate } from 'parameter-validator';
import Event from './Event';
import EventEditor from './EventEditor';
import Loader from './Loader';
import Toolbar from './Toolbar';

class Events extends React.Component {
    constructor(props) {
        super(props);
        validate(props, ["loadEventsFunction", "addEventFunction", "removeEventFunction", "updateEventFunction"]);

        this.state = {
            events: []
        };
    }

    componentDidMount() {
        this.load();
    }

    load(filters) {
        this.setState({ loading: true });
        this.props
            .loadEventsFunction(filters)
            .then((events) => {
                this.setState({
                    events: events,
                    loading: false
                });
            });
    }

    onAdd = (eventToAdd) => {
        this.props.addEventFunction(eventToAdd)
            .then((result) => console.debug(result)); 
        this.state.events.push(eventToAdd);
        this.setState({
            events: this.state.events,
            adding: false
        })
    }

    onRemove = (eventToRemove) => {
        this.props.removeEventFunction(eventToRemove.id)
            .then((result) => console.debug(result)); 
        this.state.events.splice(this.state.events.indexOf(eventToRemove), 1);
        this.setState({events: this.state.events});        
    }

    onEdit = (eventToEdit) => {
        this.setState({editedEvent: eventToEdit});
    } 

    onEdited = (editedEvent) => {
        this.setState({editedEvent: null});
        this.props.updateEventFunction(editedEvent)
            .then((result) => console.debug(result)); 
    } 

    render() {
        return (
            <div className="Events-panel d-flex justify-content-between">
                <div className="flex-fill">
                    <Toolbar searchFunction={(filters) => this.load(filters)} onAdd={() => this.setState({adding: true})} />

                    {this.state.loading && <Loader/>}
                    <ul className="list-group">{this.state.events.map((event) =>
                        <li key={event.id} className="eaw-event-list-item list-group-item d-flex justify-content-between align-items-center" >
                            <Event event={event} onRemove={this.onRemove} onEdit={this.onEdit}/>
                        </li>
                    )}</ul>

                    {this.state.editedEvent &&
                        <EventEditor 
                            title="Editing"
                            event={this.state.editedEvent}
                            onCancel={() => this.setState({editedEvent: null})}
                            onSave={this.onEdited}
                            />}

                    {this.state.adding &&
                        <EventEditor 
                            title="Adding"
                            event={{}}
                            onCancel={() => this.setState({adding: false})}
                            onSave={this.onAdd}
                            />}

                </div>
            </div>
        );
    }
}

export default Events;