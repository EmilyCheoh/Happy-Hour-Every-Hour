import React, { Component } from 'react';

class SavedSearches extends Component {
    render() {
        var arrayIsNotEmpty = this.props.list.length > 0;

        var value = arrayIsNotEmpty ? 'condition is true' : 'condition is false';

        return (
            <div>
                {arrayIsNotEmpty ? (
                    <div id="saved-locations">
                            <p>My locations: </p>
                            <ul className="list-group">
                            {this.props.list.map((item, index) => {
                                return (
                                    <li key={index}>

                                            <a className="saved-city"
                                                href="#"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    this.props.onSavedItemClick(item);
                                                }}
                                            >{item}&nbsp;</a>
                                            <a className="remove-city"
                                                href="#"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    this.handleItemRemoved(item);
                                                }}
                                            > &nbsp;Remove</a>
                                        
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                ) : (
                    <div className="no-saved-locations">You can also save this city by pressing the button above.</div>
                )}
            </div>
        );
    }

    handleItemRemoved(item) {
        this.props.onItemRemoved(item);
    }
}

export default SavedSearches;