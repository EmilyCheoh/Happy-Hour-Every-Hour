import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import RestaurantSearch from './RestaurantSearch';
import CurrentCity from './CurrentCity';
import SavedSearches from './SavedSearches';
import ShowRestaurants from './ShowRestaurants';
import BackgroundImage from './BackgroundImage';
import { EILSEQ } from 'constants';

var STORAGE_KEY = 'todoList';

var ZOMATO_API_KEY = 'fa8528e5a15b961425f8874d8cd1b5a4';

var HH_COLLECTION_ID = 339;

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            list: [],
            restaurants: []
        };
    }

    componentDidMount() {
        var savedListString = localStorage.getItem(STORAGE_KEY);
        var savedListArray = JSON.parse(savedListString) || [];

        this.setState({
            list: savedListArray
        });

        if (savedListArray.length !== 0) {
            this.handleFormSubmit(savedListArray[0]);
        }
    }

    render() {
        var filteredList = this.state.list.filter(item => item.length > 1);

        return (
            <div className="app">
                <BackgroundImage />
                <div className="title-search">
                    <h1 className="app-title">HAPPY HOUR EVERY HOUR</h1>
                    <p className="app-intro">
                        Know when and where to drink and dine for a deal.
                    </p>


                </div>

                <RestaurantSearch
                    onFormSubmit={(request) => {
                        this.handleFormSubmit(request);
                    }}
                    saveButton={(request) => {
                        this.saveButton(request);
                    }}
                    isValidLocation={this.state.isValidLocation}
                />

                <CurrentCity
                    name={this.state.name}
                    id={this.state.id}
                    title={this.state.title}
                    restaurantName={this.state.restaurantName}
                />

                <SavedSearches
                    list={this.state.list}
                    onItemRemoved={(item) => {
                        this.handleItemRemoved(item);
                    }}
                    onSavedItemClick={(item) => {
                        this.handleFormSubmit(item);
                    }}
                />

                <ShowRestaurants
                    restaurants={this.state.restaurants}
                />

            </div>
        );
    }

    saveButton(item) {
        if (!this.state.list.includes(item)) {
            var existingList = this.state.list;
        var newList = existingList.concat([item]);
        this.setState({
            list: newList
        });

        localStorage.setItem(STORAGE_KEY, JSON.stringify(newList));
        }
        
    }

    handleItemRemoved(itemToRemove) {
        var existingList = this.state.list;

        // Remove any items from the list that equal the removed item
        var newList = existingList.filter((item) => {
            return item !== itemToRemove;
        });

        this.setState({
            list: newList
        });

        localStorage.setItem(STORAGE_KEY, JSON.stringify(newList));
    }

    handleFormSubmit(item) {
        var headers = new Headers();

        headers.append('user-key', ZOMATO_API_KEY);

        var request = new Request('https://developers.zomato.com/api/v2.1/cities?q=' + item, {
            method: 'GET',
            headers: headers,
            mode: 'cors'
        });



        fetch(request)
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                console.log(json)
                var city_id = json.location_suggestions[0].id;

                this.setState({
                    name: json.location_suggestions[0].name,
                    id: city_id
                });
                var collectionsRequest = new Request('https://developers.zomato.com/api/v2.1/collections?city_id=' + city_id, {
                    method: 'GET',
                    headers: headers,
                    mode: 'cors'
                });
                fetch(collectionsRequest)
                    .then((response) => {
                        return response.json();
                    })
                    .then((json) => {
                        console.log(json)

                        var happyHourCollection = json.collections.find(function (collection) {
                            return collection.collection.collection_id === HH_COLLECTION_ID
                        })
                        this.setState({
                            title: happyHourCollection.collection.title
                        })

                    })
                    .catch((error) => {
                        window.alert("Looks like this city doesn't have a Happy Hours collection. ");
                    });

                var restaurantRequest = new Request('https://developers.zomato.com/api/v2.1/search?entity_id=' + city_id + '&entity_type=city&collection_id=' + HH_COLLECTION_ID, {
                    method: 'GET',
                    headers: headers,
                    mode: 'cors'
                });

                fetch(restaurantRequest)
                    .then((response) => {
                        return response.json();
                    })
                    .then((json) => {
                        console.log(json)

                        var isValidLocation = true;

                        this.setState({
                            restaurants: json.restaurants,
                            isValidLocation: true
                        })

                    })
            })


            .catch((error) => {
                window.alert("This city doesn't exist. ");
                this.setState({
                    isValidLocation: false
                })
            });

    }
}



export default App;