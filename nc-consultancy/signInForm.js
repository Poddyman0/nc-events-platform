document.addEventListener('DOMContentLoaded', function() {
    signInForm()
})

export let profileIDSignedIn = ""

function signInForm() {


    profileSignIn ()
    function profileSignIn () {
        document.querySelector('btn-sign-in').addEventListener('click', function(event) {
            event.preventDefault()
            const emailSignIn = document.querySelector('#email-sign-in').value
            const emailSignInFeedback = document.querySelector('.sign-in-email-feedback')
            const passwordSignIn = document.querySelector('#password-sign-in').value
            const passwordSignInFeedback = document.querySelector('.sign-in-password-feedback')

        const profileSignInBE = {
            profileEmail: emailSignIn,
            profilePassword: passwordSignIn,
        }

        fetch(`profile/get/${profileSignInBE.profileEmail}/${profileSignInBE.profilePassword}/signin`, {
            method: 'GET',
            body: JSON.stringify(profileSignInBE)
        })
        .then(function(response) {
            return response.json();
        })
        .then(function(response) {
            response.errors.forEach(error => {
                if (error === "Email does not exist.") {
                    emailSignIn.className = "form-control is-invalid"
                    emailSignInFeedback.innerHTML = "Email does not exist."
                } else if (error === "Password does not exist") {
                    passwordSignIn.className = "form-control is-invalid"
                    passwordSignInFeedback.innerHTML = "Password does not exist."
                } else if (error = "Email does not match password") {
                    emailSignIn.className = "form-control is-invalid"
                    passwordSignIn.className = "form-control is-invalid"
                    emailSignInFeedback.innerHTML = "Email does not match password"
                    passwordSignInFeedback.innerHTML = "Email does not match password"
                } else if (response.errors === []) {
                    emailSignIn.className = "form-control"
                    passwordSignIn.className = "form-control"
                    emailSignInFeedback.innerHTML = ""
                    passwordSignInFeedback.innerHTML = ""
                    profileIDSignedIn = response.profileID
                }
            })


        })
        .catch(function(err) {
            console.log("Error: ", err)
        })
        if (profileIDSignedIn !== "" || profileEmailSignedIn !== "") {
            const profileChangeSignInStatus = {
                profileID: profileIDSignedIn,
                profileSignedIn: true,
            }
            fetch(`profile/put/${profileIDSignedIn}/signin`, {
                method: 'PUT',
                body: JSON.stringify(profileChangeSignInStatus)
            })
            .then(function(response) {
                return response.json();
            })
            .then(function(response) {
                window.location.href = "/signInForm.html"
            })
            .catch(function(err) {
                console.log("Error: ", err)
            })
        }

    })
    }

}