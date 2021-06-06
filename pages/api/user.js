import {API_URL} from "@/config/index";
import cookie from "cookie";
import {createSecureServer} from "http2";

export default async (req,res)=>{
    if (req.method ==='GET'){

       if(!req.headers.cookie) {
           res.status(403).json({message: 'Not Authorized'})
           return
       }

       const {token} = cookie.parse(req.headers.cookie)
        const strapRes = await fetch(`${API_URL}/users/me`,{
            method:'GET',
            headers:{
                Authorization: `Bearer ${token}`
            }
        })

        const user = await strapRes.json()

        if(strapRes.ok){
            res.status(200).json({user})
        }else {
            res.status(403).json({message: 'User forbidden'})
        }

    }else {
        res.setHeader('Allow', ['GET'])
        res.status(405).json({message:`Method ${req.method} not allowed`})
    }
}
