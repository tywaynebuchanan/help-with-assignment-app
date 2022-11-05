import '@babel/polyfill'
import axios from 'axios'
import { showAlert } from './alerts'

export const login = async (email,password) =>{
    try {
        const res = await axios({
            method: 'POST',
            url: 'http://127.0.0.1:3000/login',
            data:{
                email,
                password,
            }
        })

        if(res.data.status === "success"){
            showAlert('success','Logged in successfully');
            window.setTimeout(()=>{
                location.assign('/dashboard');
            },1500)
        }
        console.log(res);
    } catch (err) {
        console.log(err)
            showAlert('error',err.response.data.message)
    }
   

}
