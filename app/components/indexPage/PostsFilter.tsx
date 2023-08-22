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


    const [radius10, setRadius10] = useState(false)
    const [radius25, setRadius25] = useState(false)
    const [radius50, setRadius50] = useState(false)
    const [radius100, setRadius100] = useState(false)

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
            <section className=''>

                <div className=''>
                    <input onChange={(e) => setSearchInput(e.target.value)} value={searchInput} className='mr-2 mb-2  shadow-inner shadow-gray-400 rounded-3xl p-1 pl-2 focus:outline-none focus:ring-2 focus:ring-[#67ae9a] md:mb-5' placeholder='Stellenbezeichnug' type="text" name="search" id="search" />
                    <form className='mb-5'>
                        <input
                            value={locationInput} onChange={(e) => setLocationInput(e.target.value)} className='mr-2   shadow-inner shadow-gray-400 rounded-3xl p-1 pl-2 focus:outline-none focus:ring-2 focus:ring-[#67ae9a]' placeholder='Ort' type="text" name="locationPost" id="locationPost" list="location-suggestions" />

                    </form>
                </div>
                <div className='mx-auto flex justify-center'>

                    <button className='border p-2 px-5 flex gap-2 items-center rounded-3xl text-white bg-[#66af99]' type='button' onClick={clickHandler}>
                        <p className='text-lg'>Suche</p>
                        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1.5rem" width="1.5rem" xmlns="http://www.w3.org/2000/svg"><path d="M10,18c1.846,0,3.543-0.635,4.897-1.688l4.396,4.396l1.414-1.414l-4.396-4.396C17.365,13.543,18,11.846,18,10 c0-4.411-3.589-8-8-8s-8,3.589-8,8S5.589,18,10,18z M10,4c3.309,0,6,2.691,6,6s-2.691,6-6,6s-6-2.691-6-6S6.691,4,10,4z"></path></svg>
                    </button>
                </div>
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
