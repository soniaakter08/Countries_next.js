'use client';

import { Box } from "@mui/system";
import { useAuth } from "../context/AuthContext";
import { CircularProgress, Typography } from "@mui/material";
import AuthRedirect from "../login/AuthRedirect";
import Image from "next/image";

const Protected = () =>{

    const {user, loading} = useAuth();
    if (loading){
        return (
            <Box
                sx={{
                    display:"flex",
                    justifyContent:"center",
                    alignItems:"center",
                    height:"100vh",
                }}
            >
                <CircularProgress />
            </Box>
        );
    }
    
    if(!user){
        return (<AuthRedirect/>)
    }

    console.log('Id:', user.user_metadata);

    return(
        <Box sx={{maxWidth: 1200, mx:"auto2", p:3}}>
            <Typography variant="h2" style={{padding:'10px'}}>Protected-User Data</Typography>
            <Typography variant="body1"> {user.email}</Typography>
            <Typography variant="body1"> {user.id}</Typography>
            <Typography variant="body1" style={{paddingBottom:'15px'}}> {user.user_metadata.name}</Typography>
            <Image src={user.user_metadata.avatar_url} 
                alt="User Avatar" 
                width={100} height={100}
                style={{borderRadius:'50%'}} ></Image>
        </Box>
    )
}

export default Protected;