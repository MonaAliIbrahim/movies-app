import { createContext, useState } from 'react';
import { BASE_URL, API_KEY } from '../api-config';
import axios from 'axios';

export let PersonDetailsContext = createContext(null);

export default function PersonDetailsContextProvider(props) {

  const [personDetails, setPersonDetails] = useState(null)

  const fetchDetails = async(id) => {
    let { data } = await axios.get(`${BASE_URL}/person/${id}/combined_credits?api_key=${API_KEY}`);
    setPersonDetails(data.cast.slice(0,20));
  }

  return(
    <PersonDetailsContext.Provider value={{fetchDetails, personDetails}}>
      {props.children}
    </PersonDetailsContext.Provider>
  )
}
