import React from 'react';
import { validate } from 'parameter-validator';

class Event extends React.Component {

    constructor(props) {
        super(props);
        validate(props, ["onRemove", "onEdit"]);
    }

    render() {
        return (
            <div className="d-flex w-100 justify-content-between">
                <div className="w-100 d-flex flex-column flex-grow-1">
                    <h5 className="mb-1 flex-grow-1">{this.props.event.title}</h5>
                    <small><i className="far fa-clock"></i> {this.props.event.date}</small>
                    <small><i className="fas fa-map-marker-alt"></i> {this.props.event.location}</small>
                </div>
                <div className="d-flex flex-column">
                    <button type="button" className="btn btn btn-secondary btn-sm" onClick={() => this.props.onRemove(this.props.event)}><i className="fas fa-times"></i></button>
                    <button type="button" className="btn btn btn-secondary btn-sm mt-1" onClick={() => this.props.onEdit(this.props.event)}><i className="fas fa-pen"></i></button>
                </div>
            </div>
        );
    }
}

export default Event;