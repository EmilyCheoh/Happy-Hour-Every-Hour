import React, { Component } from 'react';

class RestaurantSearch extends Component {
    render() {
        return (
            <ul>
                <div className="wrapper">
                    <div className="search">
                        <form onSubmit={(e) => this.handleFormSubmit(e)} >
                            <div className="input-group" >
                                <input type="text" className="form-control searchbar" placeholder="Search by city..." ref="searchBox" />
                                <span className="input-group-btn">
                                    <button className="btn btn-default search-btn" type="submit" id="searchButton">Search</button>
                                </span>
                            </div>
                        </form>

                    </div>
                    <div className="save">
                        
                            <form className="save-form" onSubmit={(e) => this.handleFormSave(e)} >
                                <button className="btn btn-default save-btn " type="submit">Save this city</button>
                            </form>
                        
                    </div>
                </div>

            </ul>


        );

    }

    handleFormSubmit(e) {
        e.preventDefault();
        var item = this.refs.searchBox.value;
        this.props.onFormSubmit(item);

    }

    handleFormSave(e) {
        if (this.props.isValidLocation) {
            e.preventDefault();
            var item = this.refs.searchBox.value;
            this.props.saveButton(item);
        } else {
            window.alert('You may not save an invalid location')
        }
    }


}


export default RestaurantSearch;