//import { jwtVerify } from "jose";
import { decode } from "jsonwebtoken";
const validateToken = async (token)=> {
    const tokenzinho = "eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTY5NTY5MTU0MiwiaWF0IjoxNjk1NjkxNTQyfQ.EG-A9n08TjSSm2affCX5Bl3yRpDbIytMIO5j2iMalLA";

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