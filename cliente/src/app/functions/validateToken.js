//import { jwtVerify } from "jose";
import { decode } from "jsonwebtoken";
const validateToken = async (token)=> {
   
    try{
        const isTokenValid = decode(token)
        console.log(isTokenValid)
        if(isTokenValid){
            return true
        }
        
    }catch (error){
        return false;
    }
}   
export {validateToken};