import React, { Component } from 'react';

class ShowRestaurants extends Component {
    render() {
        return (
            <div className="row">
                {this.props.restaurants.map((restaurant, index) => {
                    return (

                        <div className="container">
                            <div className="col-xl-6">
                                <div className="restaurant">
                                    <div key={restaurant.restaurant.id}>
                                        <div>
                                            <a href={restaurant.restaurant.url}>
                                                <img className="restaurant-pic" src={restaurant.restaurant.featured_image} alt="SORRY! Picture not found. " />
                                                <div className="info">
                                            <h1 className="restaurant-name">{restaurant.restaurant.name}</h1>
                                            
                                            <div className="more-info">
                                                <p className="cuisine">{restaurant.restaurant.cuisines}</p>
                                                <p>ADDRESS: {restaurant.restaurant.location.address}</p>
                                                <p>Average Cost for Two: ${restaurant.restaurant.average_cost_for_two}</p>
                                                <p>Price level: {restaurant.restaurant.price_range}</p>
                                                <p>Average Rating: {restaurant.restaurant.user_rating.aggregate_rating}/5, {restaurant.restaurant.user_rating.rating_text}</p>
                                            </div>

                                        </div>
                                            </a>
                                        </div>
                                        
                                    </div>
                                </div>

                            </div>

                        </div>

                    );
                })}
            </div>

        );
    }

}

export default ShowRestaurants;