import React from "react";
import lupa from '../../img/lupa.svg';
import '../../components/Input/input.css';
import {filterSearch} from '../filterSearch/filterSearch';

class Input extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchTerm: ''
        };
    }

    handleChange = (event) => {
        this.setState({ searchTerm: event.target.value });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        filterSearch(this.state.searchTerm);
    }

    render() {
        return (
            <div className="sidebar_search">
                <form onSubmit={this.handleSubmit}>
                    <input 
                        id="sidebar_input" 
                        placeholder={this.props.placeholder} 
                        type="search" 
                        value={this.state.searchTerm} 
                        onChange={this.handleChange} 
                    />
                    <button type="submit">
                        <img src={lupa} id="search_icon" alt="Search" />
                    </button>
                </form>
            </div>
        );
    }
}

export default Input;