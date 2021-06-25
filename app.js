require('./config/config');

const express = require('express');
const app = express();
const http = require('http')
const _ =require('lodash')
const {imageUpload } = require('./config/multer-config');
const userinfo = require('./Models/userinfo') 
var md5 = require('md5');
const {validateEmail,alphabetstring,Numbers,PasswordValidate} = require('./validation') 
const port = process.env.PORT;
 
app.post('/newUser', imageUpload, async function (req, res) {

    try {
        // validateEmail = (email) => {
        //     var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        //     return re.test(String(email).toLowerCase());
        // }
        var body = _.pick(req.body ,['username'],['mobileNumber'],['email'],['password']);

        if (!body.username) {
            res.status(500);
            res.send({ "message": "please enter username" });
        }
        if (!body.mobileNumber) {
            res.status(500);
            res.send({ "message": "please enter MobileNumber" });
        }
        if (!body.email) {
            res.status(500);
            res.send({ "message": "please enter emailid" });
        }
        if (!body.password) {
            res.status(500);
            res.send({ "message": "please enter password" });
        }
        if (!alphabetstring(body.username)) {
            res.status(500);
            res.send({ "message": "UserName Should Contain only Alphabets" });
        }
        if ((body.username).length <=2) {
            res.status(500);
            res.send({ "message": "UserName Should Contain Mininum 3 Character" });
        }
        if (!Numbers(body.mobileNumber)) {
            res.status(500);
            res.send({ "message": "MobileNumber Should Contain only Numbers" });
        }
        if (!((body.mobileNumber).length >=7 ||(body.mobileNumber).length <=13)) {
            res.status(500);
            res.send({ "message": "Kinldy provide Valid Mobile Number" });
        }
        if (!validateEmail(body.email)) {
            res.status(500);
            res.send({ "message": "Please Provide Valid Mail ID" });
        }
        if (!PasswordValidate(body.password)) {
            res.status(500);
            res.send({ "message": "Password Should Contain Minimum 7 characters includues at least one numeric and a special character.Please try again" });
        }

        else{
            console.log(body.password)
            console.log(md5(body.password))
            const a = new userinfo(body);
            a.userName = body.username;
            a.mobile = body.mobileNumber;
            a.emailId = body.email;
            a.password = md5(body.password)
            
           a.save().then(rs => {
               res.status(200).json({"message": "User Created successfully"});
               });
    }
      
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});


app.get('/getUsers', async function (req, res) {

    try {
      var data = []
     userinfo.findAll()
.then(element=>{ 
    element.forEach(e=>{
    const userlist = {
        name: e.userName,
        mobile:e.mobile
 }
  data.push(userlist)
})
res.send(data);
 
     
})

} catch (err) {
    console.log(err);
    res.status(500).json(err);
}
});




app.delete('/deleteUser', imageUpload, async function (req, res) {

    try {
        var body = _.pick(req.body ,['username']);

        console.log("asdasdad"+body.username)
        if (!body.username) {
            res.status(500);
            res.send({ "message": "please enter username" });
        }
        userinfo.destroy({
            where: {
                userName: body.username
            }
        }).then(rs => {
            res.status(200).json({"message": "User Deleted successfully"});
            });
        


} catch (err) {
    console.log(err);
    res.status(500).json(err);
}
});









app.listen(port, () => {
    console.log(`listining on port ${port}`);
    // var md5 = require("md5"); 
    // //CryptoJS= require("Crypto"); 
    // console.log(md5("message")); 
    // //CryptoJS.MD5 ('string to be encrypted '). ToString ()

    // console.log(md5.decrypt("78e731027d8fd50ed642340b7c9a63b3"));
      
});