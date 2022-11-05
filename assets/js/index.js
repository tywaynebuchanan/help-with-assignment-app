import {login} from "./login"

//Values


const loginForm = document.querySelector(".form");

//Delegation
if(loginForm)
loginForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    const email = document.getElementById("email").value;
const password = document.getElementById("password").value;
    login(email,password);  
})