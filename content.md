@import url('https://fonts.googleapis.com/css2?family=Fira+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800&display=swap');

*{
    padding:0;
    margin:0;
    box-sizing: border-box;
}

:root{
    --white: white;
    --blue: #00509d;
    --success:#28A745;
    --danger: #DC3444;
}

html,body{
   
    height: 100%;
}

a, button{
    cursor: pointer;
    font-family: "Poppins", sans-serif;
}

h1,h2,h3,h4,h5{
    font-family: "Poppins", sans-serif;
}

body{
    display: grid;
    place-items: center;
    padding: 0 24px;
    background: hsla(225, 78%, 59%, 1);
    background: linear-gradient(90deg, hsla(225, 78%, 59%, 1) 0%, hsla(197, 85%, 51%, 1) 100%);
    background: -moz-linear-gradient(90deg, hsla(225, 78%, 59%, 1) 0%, hsla(197, 85%, 51%, 1) 100%);
    background: -webkit-linear-gradient(90deg, hsla(225, 78%, 59%, 1) 0%, hsla(197, 85%, 51%, 1) 100%);
    filter: progid: DXImageTransform.Microsoft.gradient( startColorstr="#456FE8", endColorstr="#19B0EC", GradientType=1 );
}

.login-card{
    width: 100%;
    padding: 20px 30px 44px;
    border-radius: 24px;
    background: var(--white);
    text-align: center;
    background-color: white;

    -webkit-box-shadow: 10px 10px 33px -22px rgba(0,0,0,0.75);
    -moz-box-shadow: 10px 10px 33px -22px rgba(0,0,0,0.75);
    box-shadow: 10px 10px 33px -22px rgba(0,0,0,0.75);
}

.login-card h2{
    margin: 0 0 12px;
    font-size: 36px;
    font-weight: 600;
}

.login-card h3{
    margin: 0 0 30px;
    font-size: 16px;
    font-weight: 500;
    color: rgba(0,0,0,0.38);

}

.login-form{
    width: 100%;
    margin: 0;
    display: grid;
    gap: 16px;
    text-align: left;
    color:var(--white);
    
}

.login-form a{
    text-decoration: none;
    font-weight: 300;
    color: var(--blue);
}

.login-form input{
    padding: 15px;
    outline: none;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.login-form input:focus{
    outline: none;
}

.login-form button{
    outline: none;
    border: none; 
    text-transform: uppercase;
    padding: 15px;
    border-radius: 5px;
    font-weight: 500;
    font-size: 16px;
    background-color: var(--blue);
    color: var(--white);
}

.login-form label{
    color: var(--blue);
    font-family:"Poppins", sans-serif;
    font-weight: 300;
    cursor: pointer;
    
}

.login-form input[type=checkbox]{
    cursor: pointer;
}

.login-card  span{
    color:var(--blue);
    font-family: "Poppins", sans-serif;
    font-weight: 300;
}

.success{
    color: var(--success);
}

.error{
    color: var(--danger);
}




@media(width >= 500px)
{
    body{
        padding: 0;
    }

    .login-card{
        margin: 0;
        width: 400px;
    }

    .login-card h1{
        font-size: 20px;
        
    }
}