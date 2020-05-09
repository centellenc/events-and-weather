import React from 'react';
import Event from './Event';
import EventEditor from './EventEditor';
import { validate } from 'parameter-validator';

class Events extends React.Component {
    constructor(props) {
        super(props);
        validate(props, ["loadEventsFunction", "addEventFunction", "removeEventFunction", "updateEventFunction"]);

        this.state = {
            events: [],
            searchText: localStorage.getItem('searchText') || ""
        };
    }

    onPackageClick = (e, p) => {
        var selectedPackageId = p.packageId;
        if (selectedPackageId === this.state.selectedPackageId)
            selectedPackageId = "";

        this.setState({ selectedPackageId: selectedPackageId }, () => {
            if (this.state.pinned) {
                this.props.history.push("/events/" + selectedPackageId);
                this.forceUpdate();
                if (!this.package)
                     return;
                this.package.setPackage(selectedPackageId);
            }
            else {
                this.props.history.push("/package/" + p.packageId);
            }
        });
    };

    onPinClick = (e) => {
        this.setState({ pinned: !this.state.pinned });
        localStorage.setItem('pinned', !this.state.pinned);
        if (this.state.pinned && this.state.selectedPackageId)
            this.props.history.push("/package/" + this.state.selectedPackageId);
    };

    onSearchChange = (value, regex) => {
        this.setState({searchText: value, searchRegex: regex});
        localStorage.setItem('searchText', value);
    };

    componentDidMount() {
        this.setState({loading: true});
        this.props
            .loadEventsFunction()
            .then((events) => {
                this.setState({ 
                    events: events,
                    loading: false
                })
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
                    <div className="w-100 text-right">
                        <button type="button" className="eaw-add-button btn btn-primary btn-sm" onClick={() => this.setState({adding: true})}><i className="fas fa-plus"></i></button>
                    </div>
                    {/* {this.state.loading && <Loader/>} */}
                    <ul className="list-group">{this.state.events.map((event) =>
                        (/*event.title.match(this.state.searchRegex) &&*/
                            <li key={event.id} className="eaw-event-list-item list-group-item d-flex justify-content-between align-items-center" >
                                <Event event={event} onRemove={this.onRemove} onEdit={this.onEdit}/>
                            </li>
                        ))}
                    </ul>
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