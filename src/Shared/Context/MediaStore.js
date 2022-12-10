import { useState } from "react";
import { createContext } from "react";
import { BASE_URL, API_KEY } from '../api-config';
import axios from "axios";

export let MediaContext = createContext(null);

export default function MediaContextProvider(props) {

  const [movieList, setMovieList] = useState(null);
  const [tvList, setTvList] = useState(null);
  const [peopleList, setPeopleList] = useState(null);

  const fetchMediaList = async(mediaType) => {
    let { data } = await axios.get(`${BASE_URL}/trending/${mediaType}/day?api_key=${API_KEY}`);
    setRespinseList(mediaType, data);
  }

  const setRespinseList = (type, response) => {
    switch (type) {
      case 'movie':
        setMovieList(response.results);
        break;
      case 'tv':
        setTvList(response.results);
        break;    
      default:
        setPeopleList(response.results);
        break;
    }
  }
  
  return(
   <MediaContext.Provider value={{fetchMediaList, movieList, tvList, peopleList}}>
      {props.children}
   </MediaContext.Provider> 
  )
}
