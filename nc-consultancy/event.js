import { eventIDToView } from './events.js'

document.addEventListener('DOMContentLoaded', function() {
    loadEvent()
})

//add url to below.
export let cart = []

function loadEvent () {
    const eventDisplay = document.querySelector('.an-event-container')
    getEvent () 
    function getEvent () {
        fetch(`event/get/${eventIDToView}/aevent`, {
            method: 'GET',
            body: JSON.stringify(eventIDToView)
        })
        .then(function(response) {
            return response.json();
        })
        .then(function(response) {
                let eventResponse = {
                    event_id: response.eventID,
                    event_organiser: response.eventOrganiser,
                    event_name: response.eventName,
                    event_description: response.eventDescription,
                    event_start_date: response.eventStartDate,
                    event_start_time: response.eventStartTime,
                    event_end_date: response.eventEndDate,
                    event_end_time: response.eventEndTime,
                    event_building_number: response.eventBuildingNumber,
                    event_street_name: response.eventStreetName,
                    event_city: response.eventCity,
                    event_county: response.eventCounty,
                    event_country: response.eventCountry,
                    event_post_code: response.eventPostCode,
                    event_ticket_price: response.eventTicketPrice,
                    event_ticket_amount: response.eventTicketAmount,
                    event_picture: response.eventPicture,
                    event_atendees: response.eventAtendees,
    
                }
                    let aEventToDisplay = document.createElement('div')
                    aEventToDisplay.className = "card"
                    aEventToDisplay.id = `an-event-card-${eventResponse.event_id}`
                    aEventToDisplay.innerHTML = `
                        <img class="card-img-top" src="${eventResponse.event_picture}" alt="Event Picture">
                        <div class="card-body">
                            <div class="card-title-icon-container">
                                <h5 class="card-title">${eventResponse.event_name}</h5>
                            </div>
                            <p class="card-text">Organiser: ${eventResponse.event_organiser}</p>
                            <p class="card-text">Description: ${eventResponse.event_description}</p>
                            <p class="card-text">Start Date: ${eventResponse.event_start_date}</p>
                            <p class="card-text">Start Time: ${eventResponse.event_start_time}</p>
                            <p class="card-text">End Date: ${eventResponse.event_end_date}</p>
                            <p class="card-text">End Time: ${eventResponse.event_end_time}</p>
                            <p class="card-text">Location: ${eventResponse.event_building_number}, ${eventResponse.event_street_name}, ${eventResponse.event_city}, ${eventResponse.event_county}, ${eventResponse.event_country}, ${eventResponse.event_post_code}</p>
                            <p class="card-text">Ticket Price: ${eventResponse.event_ticket_price}</p>
                            <p class="card-text">Amount Of Tickets Left: ${eventResponse.event_ticket_amount}</p>
                            <form class="card-text">
                                <label for="add-to-cart-amount">Amount of tickets you want to purchase:</label>
                                <input type="number" class="form-control" id="add-to-cart-amount" placeholder="Enter amount of tickets you would like to buy." required>
                                <div class="invalid-feedback add-to-cart-amount-feedback"
                                <button class="btn btn-primary" id="add-to-cart-button">Add To Cart</button>
                            </form>
                            <button class="btn btn-danger" id="delete-event">Delete Event</button>
                            <p id="added-to-cart-feedback"></p>
                        </div>
                    `
                    eventDisplay.innerHTML = aEventToDisplay;
    
                    const ticketAmountPurchase = document.querySelector('#add-to-cart-amount')
                    const addToCartAmountFeedback = document.querySelector('.add-to-cart-amount-feedback')
                    const addedToCartFeedback = document.querySelector('#added-to-cart-feedback')
                    addedToCartFeedback.innerHTML = ""
                    document.querySelector('#add-to-cart-button').addEventListener('click', function (event) {
                        event.preventDefault()
                        if (ticketAmountPurchase.value.length === 0 || ticketAmountPurchase.value === 0 || ticketAmountPurchase.value > eventResponse.event_ticket_amount) {
                            ticketAmountPurchase.className = "form-control is-invalid"
                            addToCartAmountFeedback.innerHTML = "Amount of tickets purchased field must not be 0, not contain a number or be greater than the amount of tickets available"
                        } else {
                            ticketAmountPurchase.className = "form-control"
                            addToCartAmountFeedback.innerHTML = ""
                            addedToCartFeedback.innerHTML = "Event successfully added to cart"
                            eventResponse.amount_in_cart = document.querySelector('#add-to-cart-amount').value

                            cart.push(eventResponse)
                        }
    
                    })
                    document.querySelector('#delete-event').addEventListener('click', function() {
                        const deleteEventBE = {
                            eventID: eventIDToView,            
                        }
                
                        fetch(`event/delete/${eventIDToView}`, {
                            method: 'DELETE',
                            body: JSON.stringify(deleteEventBE)
                        })
                        .then(function(response){ 
                            return response.json();
                        })
                        .catch(function(err) {
                            console.log("Error: ", err)
                        })
                
                    })
        })
        .catch(function(err) {
            console.log("Error: ", err)
        })
    
    }
}

