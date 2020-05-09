import React from 'react';

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {searchText: this.props.initialValue || ""};
        this.callOnSearchChange();
    }

    createSearchTextRegExp() {
        return new RegExp(this.state.searchText, "ig");
    }

    componentDidMount() {
        this.searchInput.focus();
    }

    onSearchChange = (e) => {
        this.setState({ searchText: e.target.value }, () => {
            this.callOnSearchChange();
        });
    };

    onSearchClearClick = (e) => {
        this.setState({ searchText: "" }, (state) => {
            this.callOnSearchChange();
            this.searchInput.focus();
        });
    };

    onSearchKeyDown = (e) => {
        if (e.key === "Escape")
            this.onSearchClearClick();
    };

    callOnSearchChange() {
        this.props.onSearchChange(this.state.searchText, this.createSearchTextRegExp());
    }

    render() {
        return (
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    {/* <i className="fas fa-search"></i> */}
                    <span className="input-group-text"><i className="fas fa-map-marker-alt"></i></span>
                </div>
                <input value={this.state.searchText} ref={(input) => { this.searchInput = input; }} onChange={this.onSearchChange} onKeyDown={this.onSearchKeyDown} className="form-control" type="text" placeholder={this.props.placeholder} aria-label="Search" />
                {this.state.searchText &&
                    <div className="input-group-append">
                        <button className="input-group-text" onClick={this.onSearchClearClick}><i className="fas fa-times"></i></button>
                    </div>
                }
            </div>
        )
    };
}

export default Search;