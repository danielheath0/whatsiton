import { db } from "../config/db";
import { UserRegister } from "../types/interfaces";

export const _createNewUser = async ({ fName, lName, email, uName, password, countryCode }: UserRegister) => {//I'll need to pass an object to this}
    try {
        
        const [user] = await db("users").insert({
            f_name: fName,
            l_name: lName,
            email: email,
            u_name: uName,
            password_hash: password,
            country_code: countryCode
        }, ["f_name", "l_name"])
        return user
    } catch (error) {
        console.error("Error registering user:", error)
        
        if ((error as any).code==="23505") throw new Error("User already exists - please log in.")

        throw error

    }
} 

export const _login = async (uName:string) => {
    try {
        // console.log("_login uName:", uName)
        const user = await db("users").select("f_name","l_name","email","user_id", "u_name", "password_hash","country_code").where("u_name", uName).first()
        return user || null
    } catch (error) {
        console.error("Error logging in user:", error)
        console.error("Full error object:", JSON.stringify(error, null, 2))
        throw new Error("Login failed")
        
    }
}

export const _doSomething = async () => {
    // console.log("Doing something")
    return "Something done"
}