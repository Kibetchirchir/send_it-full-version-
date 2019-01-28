function signIn() {
        // getting the form values
        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;
        let signin_url = "https://senditv2.herokuapp.com/api/v2/auth/login";
        let signin_data = {
            email : email,
            password : password,
            role : "admin"
        }
        // sending data to our end point
        fetch(signin_url, {
            method: 'POST',
            body: JSON.stringify(signin_data),
            headers:{
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(response => {
            if(response.status === "success"){
                window.localStorage.setItem('token' , response.data.token)
                window.localStorage.setItem('name' , response.data.name)
                window.location.href='admindashboard.html';
            } else {
                alert(response.message)
            }
        })
        .catch(error => alert("OOPS try again"));
}