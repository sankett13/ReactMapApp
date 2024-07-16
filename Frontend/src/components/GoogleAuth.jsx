import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";


export default function GooglAuth(){
    return(
        <GoogleLogin
        onSuccess={credentialResponse =>{
            const decodedResponse = jwtDecode(credentialResponse.credential)
            console.log(decodedResponse)
        }}
        onError={()=>{
            console.log("Login Failed")
        }}
        ></GoogleLogin>
    )
}