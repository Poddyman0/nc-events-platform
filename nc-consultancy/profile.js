import {profileIDSignedIn } from 'signInForm.js'
import {cart} from 'event.js'

document.addEventListener('DOMContentLoaded', function() {
    loadProfile()
})

//add url to below.
// include GET below

function loadProfile () {
    document.querySelector('#cart-checkout').addEventListener('click', function () {
        cart = []
    })
    const cartDisplay = document.querySelector('#cart-container')
    const cartTotal = 0
    document.querySelector('#cart-total').innerHTML = `${cartTotal}`
    cart.forEach(event => {
        let aEventToDisplay = document.createElement('div')
        aEventToDisplay.className = "card"
        aEventToDisplay.id = `event-card-${event.event_id}`
        aEventToDisplay.innerHTML = `
            <img class="card-img-top" src="${event.event_picture}" alt="Event Picture">
            <div class="card-body">
                <div class="card-title-icon-container">
                    <h5 class="card-title">${event.event_name}</h5>
                </div>
            <p class="card-text">Description: ${event.eventDescription}</p>
            <p class="card-text">Start Date: ${event.event_start_date}</p>
            <p class="card-text">Event City: ${event.event_city}</p>
            <p class="card-text">Price: ${event.event_ticket_price}</p>
            <button type="button" value="${event.event_id}" id="btn-event-card-${event.event_id}-remove-from-cart" class="btn btn-primary">Remove Event</button>
            </div>
        `
        cartTotal += event.event_ticket_price * event.amount_in_cart;
        const removeFromCartBtn = document.querySelector(`#btn-event-card-${event.event_id}-remove-from-cart`)
        removeFromCartBtn.addEventListener('click', function () {
            for (let i = 0; i <= cart.length; i++) {
                if (cart[i].event_id === removeFromCartBtn.value) {
                    cart.splice(cart[i], 1)
                }
            }

            loadProfile ()
        })

        cartDisplay.appendChild(aEventToDisplay)
    })
    const profileDisplay = document.querySelector('.profile-container')
    getProfile ()
    function getProfile () {
        const getProfileBE = {
            profileEmailSignedIn: profileEmailSignedIn,
            profileID: profileIDSignedIn,            
        }

        fetch(`profile/get/${profileIDSignedIn}/profile`, {
            method: 'GET',
            body: JSON.stringify(getProfileBE)
        })
        .then(function(response) {
                let profileResponse = {
                    profile_id: response.profileID,
                    first_name: response.firstName,
                    second_name: response.secondName,
                    date_of_birth: response.dateOfBirth,
                    phone_number: response.phoneNumber,
                    house_number: response.houseNumber,
                    street_name: response.streetName,
                    city: response.city,
                    county: response.county,
                    country: response.country,
                    post_code: response.postCode,
                    email: response.email,
                    role: response.role,
                }
                profileDisplay.innerHTML = `
                <div id="${profileResponse.profile_id}">
                    <h1>Your Profile</h1>
                    <div>First Name: ${profileResponse.first_name}</div>
                    <div>Second Name: ${profileResponse.second_name}</div>
                    <div>Date Of Birth: ${profileResponse.date_of_birth}</div>
                    <div>Phone Number: ${profileResponse.phone_number}</div>
                    <div>House Number: ${profileResponse.house_number}</div>
                    <div>Street Name: ${profileResponse.street_name}</div>
                    <div>City: ${profileResponse.city}</div>
                    <div>County: ${profileResponse.county}</div>
                    <div>Country: ${profileResponse.country}</div>
                    <div>Post Code: ${profileResponse.post_code}</div>
                    <div>Email: ${profileResponse.email}</div>
                    <div>Role: ${profileResponse.role}</div>
                </div>
                `
            })
            .catch(function(err) {
                console.log("Error: ", err)
            })
    }
    document.querySelector('#delete-profile').addEventListener('click', function() {
        const getProfileBE = {
            profileID: profileIDSignedIn,            
        }
        fetch(`profile/delete/${profileIDSignedIn}`, {
            method: 'DELETE',
            body: JSON.stringify(getProfileBE)
        })
        .then(function(response){ 
            return response.json();
        })
        .catch(function(err) {
            console.log("Error: ", err)
        })

    })
    document.querySelector('#sign-out-profile').addEventListener('click', function () {
        const getProfileBE = {
            profileID: profileIDSignedIn,            
        }

        fetch(`profile/put/${profileIDSignedIn}/profile`, {
            method: 'PUT',
            body: JSON.stringify(getProfileBE)
        })
        .then(function(response){ 
            profileIDSignedIn = ""
            profileEmailSignedIn = ""
            return response.json();
        })
        .catch(function(err) {
            console.log("Error: ", err)
        })

    })
    
}



