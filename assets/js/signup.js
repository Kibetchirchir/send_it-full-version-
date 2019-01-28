function signUp() {
        // getting the form values
        let email = document.getElementById("email").value;
        let fullname = document.getElementById("fullname").value;
        let phonenumber = document.getElementById("phonenumber").value;
        let password = document.getElementById("password").value;
        let password1 = document.getElementById("password1").value;
        let signup_url = "https://senditv2.herokuapp.com/api/v2/auth/signup";
        // Checking if the password and confirmation password is same
        if(password != password1){
            alert("password does not match")
            return true
        }
        let signup_data = {
            email : email,
            name : fullname,
            phonenumber : phonenumber,
            password : password,
            role : "user"
        }
        // sending data to our end point
        fetch(signup_url, {
            method: 'POST',
            body: JSON.stringify(signup_data),
            headers:{
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(response => {
            if(response.status === "added"){
                alert("successfully registered now press OK to proceed to login")
                window.location.href='signin.html';
            } else {
                alert(response.message)
            }
        })
        .catch(error => alert("OOPS try again"));
}