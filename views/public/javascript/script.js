function validateForm(){
    let fullname = document.forms["form"]["fullname"].value;
    let email = document.forms["form"]["email"].value;
    let mobile = document.forms["form"]["mobile"].value;
    let city = document.forms["form"]["city"].value;
    if (email == "" || mobile == "" || city ==""){
        alert("Please complete the form");
        return false;
    }
}