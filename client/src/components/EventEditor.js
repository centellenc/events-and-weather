import React from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { validate } from 'parameter-validator';
import { v4 as uuidv4 } from 'uuid';
import $ from "jquery";
import parseISO from 'date-fns/parseISO'

class EventEditor extends React.Component {
    
    constructor(props) {
        super(props);
        validate(props, ["event"]);
        props.event.id = props.event.id || uuidv4();
        props.event.date = props.event.date || new Date().toISOString();
        this.state = {
            event: props.event
        };
    }

    componentDidMount() {
        $(".modal #title").focus();
    }

    onChange = (event) => {
        this.state.event[event.target.id] = event.target.value;
        this.setState({event:this.state.event});
    }

    onDateChange = (newDate) => {
        this.state.event.date = newDate.toISOString();
        this.setState({event:this.state.event});
    }

    onSave = () => this.props.onSave(this.state.event);
    onCancel = () => this.props.onCancel();

    onKeyDown = (event) => {
        if (event.key === "Enter")
            this.onSave();
        else if (event.key === "Escape")
            this.onCancel();
    }

    render() {
        return (
            <div className="modal" onKeyDown={this.onKeyDown}>
                <div className="eaw-modal-background"></div>                
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{this.props.title}</h5>
                        <button type="button" className="close" aria-label="Close" onClick={() => this.props.onCancel()}>
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="form-group">
                            <label htmlFor="title">What</label>
                            <input type="text" className="form-control" id="title" placeholder="Title of the event" onChange={this.onChange} value={this.state.event.title} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="location">Where</label>
                            <input type="text" className="form-control" id="location" placeholder="Where to go" onChange={this.onChange} value={this.state.event.location} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="location" className="w-100" >When</label>
                            <DatePicker className="form-control" showTimeSelect dateFormat="Pp" selected={parseISO(this.state.event.date)} onChange={this.onDateChange} />
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={this.onCancel}>Cancel</button>
                        <button type="button" className="btn btn-primary" onClick={this.onSave}>Save</button>
                    </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default EventEditor;