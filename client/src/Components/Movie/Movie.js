import React, { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import axios from 'axios';
import styled from 'styled-components';
import Waiting from '../global/Waiting';
import { useNavigate, useParams } from 'react-router';
import Reviews from './Reviews';
import TopBox from './TopBox';
import Details from './Details';
import { useMisc, useSetMisc } from '../Contexts/misc';

const media = (width) => `@media only screen and (max-width:${width}px)`;

const Parent = styled.div`
    color:rgba(255, 255, 255, 0.85);
`;

export const UserTag = styled.div`
    display:flex;
    width:100%;
    div:nth-child(2){
        padding-left:9px;
    }
`;

const Main = ({ movie, props }) =>{
    return(
        <Parent>
            <TopBox movie={movie} parentProps={props} />
            <Details movie={movie} />
            <Reviews movie={movie} parentProps={props} />
        </Parent>
    )
}

const Movie = (props) =>{
    const navigate = useNavigate();
    const [movie, setMovie] = useState("");
    const { enqueueSnackbar } = useSnackbar();
    const misc = useMisc();
    const setMisc = useSetMisc();
    const { name } = useParams();
    useEffect(() =>{
        axios.get(`/movie/getMovie/${name}`)
        .then(res =>{
            const { status, movie } = res.data;
            if(status === 404){
                enqueueSnackbar("Movie not found !", { variant : "error" });
                navigate('/');
            } else if(status === 500){
                enqueueSnackbar("Internal server error !", { variant : "error" });
                navigate('/');
            } else {
                setMovie(movie);
            }
        })
        .catch(err =>{
            console.log(err);
            enqueueSnackbar("Some error ocurred !", { variant : "error" }); 
            navigate(-1);
        })
        setMisc({...misc, isFooter: true, isTopbar: false});
        return () =>{
            setMisc({...misc, isFooter: true, isTopbar: true});
        }
    }, [])
    return(
        (movie === "") ? (<Waiting open={true} />) : (
            <Main
                movie={movie}
                props={props}
            />
        )
    )
}

export default Movie;