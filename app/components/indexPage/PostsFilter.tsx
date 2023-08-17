import { FC, useState, useEffect } from 'react';
import axios from 'axios';
import _ from 'lodash';  // import lodash

interface PostsFilterProps {
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>
    setLocation: React.Dispatch<React.SetStateAction<string>>
    setLongitude: React.Dispatch<React.SetStateAction<number>>
    setLatitude: React.Dispatch<React.SetStateAction<number>>
    setRadius: React.Dispatch<React.SetStateAction<number | string | undefined>>
}

const PostsFilter: FC<PostsFilterProps> = ({ setSearchTerm, setLocation, setLongitude, setLatitude, setRadius }) => {
    const [dropdownState, setDropdownState] = useState(false)
    const [sortParameter, setSortParameter] = useState("")
    const [searchInput, setSearchInput] = useState("")
    const [locationInput, setLocationInput] = useState("")
    const [suggestions, setSuggestions] = useState<Array<string>>([]); // for storing location suggestions

    const [activeRadius, setActiveRadius] = useState("border-[#67ae9a]")


    const [radius10,setRadius10] = useState(false)
    const [radius25,setRadius25] = useState(false)
    const [radius50,setRadius50] = useState(false)
    const [radius100,setRadius100] = useState(false)

    const radiusHandler = (radius: number) => {
        setRadius(radius);

        setRadius10(false);
        setRadius25(false);
        setRadius50(false);
        setRadius100(false);

        switch (radius) {
            case 10:
                setRadius10(true);
                break;
            case 25:
                setRadius25(true);
                break;
            case 50:
                setRadius50(true);
                break;
            case 100:
                setRadius100(true);
                break;
            default:
                break;
        }
    }

    const clickHandler = (e: any) => {
        e.preventDefault();
        setSearchTerm(searchInput)
        setLocation(locationInput)
    }


    /* const debouncedSearchTerm = _.debounce(() => getGeolocation(locationInput), 500); */

   /*  console.log(locationInput)

    useEffect(() => {
        if (locationInput) {
            debouncedSearchTerm();
            // Cancel the debounce on useEffect cleanup.
            return debouncedSearchTerm.cancel;
        } else {
            setSuggestions([]);
        }
    }, [locationInput]); */

/*     const getGeolocation = (search: string) => {
        axios.get('https://api.opencagedata.com/geocode/v1/json', {
            params: {
                key: `${process.env.NEXT_PUBLIC_KEY}`,
                q: search,
                language: 'de',
                limit: 5,
                countrycode: 'de'
            }
        }).then(response => {
            console.log(response)
            if (response.data.results) {
                let suggestionList = response.data.results.map((place: any) => place.formatted);
                setSuggestions(suggestionList);
                setLongitude(response.data.results[0].geometry.lng)
                setLatitude(response.data.results[0].geometry.lat)
                setLocationInput(response.data.results[0].formatted)
            } else {
                setSuggestions([]);
            }
        }).catch(error => {
            console.error('Error fetching data from OpenCage API: ', error);
            console.error('Error fetching data from OpenCage API: ', error.response?.data || error);
            setSuggestions([]);
        });
    }; */

    return (
        <section>
            <section>

                <input onChange={(e) => setSearchInput(e.target.value)} value={searchInput} className='mr-2 shadow-inner shadow-gray-400 rounded-3xl p-1 pl-2 focus:outline-none focus:ring-2 focus:ring-[#67ae9a]' placeholder='Stellenbezeichnug' type="text" name="search" id="search" />
                    <button type='button' onClick={clickHandler}>
                        <svg stroke="currentColor" fill="none" strokeWidth="0" viewBox="0 0 24 24" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M18.319 14.4326C20.7628 11.2941 20.542 6.75347 17.6569 3.86829C14.5327 0.744098 9.46734 0.744098 6.34315 3.86829C3.21895 6.99249 3.21895 12.0578 6.34315 15.182C9.22833 18.0672 13.769 18.2879 16.9075 15.8442C16.921 15.8595 16.9351 15.8745 16.9497 15.8891L21.1924 20.1317C21.5829 20.5223 22.2161 20.5223 22.6066 20.1317C22.9971 19.7412 22.9971 19.1081 22.6066 18.7175L18.364 14.4749C18.3493 14.4603 18.3343 14.4462 18.319 14.4326ZM16.2426 5.28251C18.5858 7.62565 18.5858 11.4246 16.2426 13.7678C13.8995 16.1109 10.1005 16.1109 7.75736 13.7678C5.41421 11.4246 5.41421 7.62565 7.75736 5.28251C10.1005 2.93936 13.8995 2.93936 16.2426 5.28251Z" fill="currentColor"></path></svg>
                    </button>

                <form >
                    <input
                        value={locationInput} onChange={(e) => setLocationInput(e.target.value)} className='mr-2 shadow-inner shadow-gray-400 rounded-3xl p-1 pl-2 focus:outline-none focus:ring-2 focus:ring-[#67ae9a]' placeholder='Ort' type="text" name="locationPost" id="locationPost" list="location-suggestions" />
                    <datalist id="location-suggestions">
                        {suggestions.map((suggestion, index) => <option key={index}>{suggestion}</option>)}
                    </datalist>
                    
                    
                </form>
{/*                 <section>
                    <p>Radius</p>
                    <button onClick={() => radiusHandler(10)} className={`border p-2 ${radius10 ? activeRadius : ""}`}>10km</button>
                    <button onClick={() => radiusHandler(25)} className={`border p-2 ${radius25 ? activeRadius : ""}`}>25km</button>
                    <button onClick={() => radiusHandler(50)} className={`border p-2 ${radius50 ? activeRadius : ""}`}>50km</button>
                    <button onClick={() => radiusHandler(100)} className={`border p-2 ${radius100 ? activeRadius : ""}`}>100km</button>
                </section> */}
            </section>
        </section>
    )
}

export default PostsFilter
