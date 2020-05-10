import React from 'react';
import { validate } from 'parameter-validator';
import DatePicker from "react-datepicker";
import Search from './Search';
import $ from "jquery";
import parseISO from 'date-fns/parseISO'

class Toolbar extends React.Component {
    constructor(props) {
        super(props);
        validate(props, ["onAdd", "searchFunction"]);

        this.state = {
            events: [],
            searchLocation: localStorage.getItem('searchLocation') || "",
            searchDate: localStorage.getItem('searchDate') || "",
        };
    }

    componentDidMount() {
        $(".react-datepicker-wrapper input").attr("placeholder", "Search by date");
    }

    runSearch = () => {
        this.props.searchFunction({
            "location" : this.state.searchLocation, 
            "date": this.state.searchDate});
    }

    onSearchChange = (value, regex) => {
        this.setState({searchLocation: value, searchRegex: regex}, () => this.runSearch());
        localStorage.setItem('searchLocation', value);
    };

    onDateChange = (newDate) => {
        const isoDate = newDate ? newDate.toISOString() : null;
        this.setState({searchDate: isoDate}, () => this.runSearch());
        localStorage.setItem('searchDate', isoDate || "");
    }

    placeholder="aa"

    render() {
        return (
            <div className="d-flex align-items-center justify-content-between">
                <div className="flex-grow-1" >
                    <Search 
                        onSearchChange={this.onSearchChange} 
                        initialValue={this.state.searchLocation} 
                        placeholder="Search by location"
                        ref={(search) => { this.search = search; }} />
                </div>
                <div className="ml-2">
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text"><i className="far fa-clock"></i></span>
                        </div>
                        <DatePicker className="form-control" dateFormat="P" selected={this.state.searchDate && parseISO(this.state.searchDate)} onChange={this.onDateChange} />
                        {this.state.searchDate &&
                            <div className="input-group-append">
                                <button className="input-group-text" onClick={() => {this.setState({searchDate: null}); this.onDateChange(null); }}><i className="fas fa-times"></i></button>
                            </div>
                        }

                    </div>
                </div>
                <div className="ml-4 align-self-center pb-2">
                    <button type="button" className="eaw-add-button btn btn-primary btn-sm " onClick={this.props.onAdd}><i className="fas fa-plus"></i></button>
                </div>
            </div>
        );
    }
    
}

export default Toolbar;