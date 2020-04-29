$(document).ready(function(){

    // local logout event handler 
    $('#logout').click(function(){
        console.log('logout was clicked');
        window.location = "index.html";
    });

    // local login storage function
    function store() {
        var inputUsername = document.getElementById("username2");
        var inputEmail = document.getElementById('email');
        var inputPassword1 = document.getElementById('password1');
        var inputPassword2 = document.getElementById('password2');
        var inputFirstname = document.getElementById('firstname');
        var inputLastname = document.getElementById('lastname');
        // checks if all fields are entered and stores them in Local storage
        if(inputUsername != null && inputEmail != null && inputPassword1 != null && inputPassword2 != null 
            && inputFirstname != null && inputLastname != null){
            window.localStorage.setItem("username2", inputUsername.value);
            window.localStorage.setItem('email', inputEmail.value);
            window.localStorage.setItem('firstname', inputFirstname.value);
            window.localStorage.setItem('lastname', inputLastname.value);
            if (inputPassword1.value == inputPassword2.value) {
                // set is statement for one password
                window.localStorage.setItem("password1", inputPassword1.value);
            } else {
                alert("Password does not match");
            }  
            window.location.replace('home.html');
        }
    };

    // login button event handler
    $('#login-submit').click(function(e){
        e.preventDefault();
        var username1 = $('#username1').val();
        var password = $('#password').val();
        var inputUsername = window.localStorage.getItem("username2");
        var inputPassword = window.localStorage.getItem("password1");
        // checks if user name and password match user info in local storage
        if(username1 == inputUsername && password == inputPassword){
            window.location.replace('home.html');
        }else{
            console.log('failed to sign in');
        }
    });
    // register button event handler
    $('#registerButton').click(function(e){
        e.preventDefault();
        store();
    });
    

})