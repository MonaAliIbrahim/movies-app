import { createContext, useState } from 'react';
import { BASE_URL, API_KEY } from '../api-config';
import axios from 'axios';

export let DetailsContext = createContext(null);

export default function DetailsContextProvider(props) {

  const [detailsObj, setDetailsObj] = useState(null);

  const fetchDetails = async(type, id) => {
    setDetailsObj(null);
    let { data } = await axios.get(`${BASE_URL}/${type}/${id}?api_key=${API_KEY}`);
    setDetailsObj(data);
  }

  return(
    <DetailsContext.Provider value={{fetchDetails, detailsObj}}>
      {props.children}
    </DetailsContext.Provider>
  )
}
