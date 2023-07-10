import react, { useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { Navigate } from 'react-router';

const LoginAlert = () =>{
    const { enqueueSnackbar } = useSnackbar();
    useEffect(() =>{
        enqueueSnackbar("401: Please Login First !", { variant : "warning" });
    })
    return(
        <Navigate to='/login' />
    )
}

export default LoginAlert;