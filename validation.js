const express = require('express');
 var  validateEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}


var  alphabetstring = (username) => {
    var re = /^[a-zA-Z]+$/;
    return re.test(username);
}

var  Numbers = (mobilenumber) => {
    var re =/^[0-9]+$/;
    return re.test(mobilenumber);
}

var  PasswordValidate = (password) => {
    var re =/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,999}$/;
    return re.test(password);
}


module.exports = { validateEmail,alphabetstring,Numbers,PasswordValidate };