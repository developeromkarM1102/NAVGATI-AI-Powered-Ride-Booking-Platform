import axios from "axios"

const api = axios.create({
    baseURL : process.env.NEXT_PUBLIC_BACKEND_URL,
    withCredentials : true
})

export async function DriverRegister({username, email, password, phone, licenseNumber, licenseExpiry, vehicle}) {
    
    try{
        const response = await api.post("/api/auth/registerDriver", {
            username,
            email,
            password,
            phone,
            licenseNumber,
            licenseExpiry,
            vehicle
        })

        return response.data;
    }
    catch(err){
        // console.error("Registation Error:",err)
        return{error : err.message}
    }
}

export async function DriverLogin({email, password}) {

    try{
        const response = await api.post("api/auth/loginDriver",{
            email,
            password
        })

        return response.data;
    }
    catch(err){
        // console.error("Login Error :",err)
        return{error : err.message}
    }
}

export async function DriverLogout() {

    try{

        const response = await api.get("api/auth/logoutDriver")
        return response.data;
    }
    catch(err){
        // console.error("Logout Error :",err)
        return{error : err.message}
    }
}

export async function DriverGetMe() {
    try{
        const response = await api.get("api/auth/getmeDriver")
        return response.data;
    }
    catch(err){
        // console.error("getMe Error :",err)
        return{error : err.message}
    }
}