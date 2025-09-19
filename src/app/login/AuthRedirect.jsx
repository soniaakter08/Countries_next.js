import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext"
import { useEffect } from "react";
 
 
const AuthRedirect = () => {
    const {user} = useAuth();
    const router = useRouter();
 
    useEffect(() => {
        if(user){
            router.push("/protected");
        }
    }, [user,router]);
    return null;
};
export default AuthRedirect;