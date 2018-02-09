import React, { Component } from 'react';

class CurrentCity extends Component {
    render() {
        var name = this.props.name;
        return (
            <div>
                {name ? (
                    <div className="col" id="display">
                        <p id="hidden">{this.props.id}</p>
                    </div>
                ) : (
                    <div className="no-city">Please search by a city name to view Happy Hour spots near you</div>
                )}
            </div>
        );
    }
}

export default CurrentCity;