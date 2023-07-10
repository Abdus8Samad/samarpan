import axios from 'axios';
import { useSnackbar } from 'notistack';
import React, { useEffect } from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import dummyData from '../global/dummyData';
import { useParams } from 'react-router';


const Parent = styled.div`

`;

const Categories = (props) =>{
    const [movies, setMovies] = useState(dummyData);
    const { enqueueSnackbar } = useSnackbar();
    const { genre } = useParams();
    useEffect(() =>{
        axios.get(`/movie/getGenre/${genre}`)
        .then(res =>{
            setMovies(res.data.movies);
        })
        .catch(err =>{
            let status = "";
            if(err.response){
                status = err.response.status;
            }
            enqueueSnackbar(`${status} Internal server error`, { variant: 'error'});
        })
    }, []);
    return(
        <Parent>
            {movies.map((movie, index) =>{
                return(
                    <div key={index}>
                        <p>{movie.title}</p>
                    </div>
                )
            })}
        </Parent>
    )
}

export default Categories;