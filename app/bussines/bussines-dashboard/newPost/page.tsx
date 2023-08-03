'use client'
import { FC, useState , useEffect} from 'react'
import Navbar from '@/app/components/Navbar'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { nanoid } from 'nanoid'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import opencage from 'opencage-api-client';
import _ from 'lodash'; 

interface pageProps {

}

const page: FC<pageProps> = ({ }) => {

    const router = useRouter();

    const { data: session } = useSession()

    const [jobTitle, setJobTitle] = useState("")
    const [shortJobDescription, setShortJobDescription] = useState("")

    const [detailedJobDescription, setDetailedJobDescription] = useState("")
    const [contactPersonName, setContactPersonName] = useState("")
    const [contactPersonNumber, setContactPersonNumber] = useState("")
    const [contactPersonEmail, setContactPersonEmail] = useState("")

    const [tasks, setTasks] = useState<string[]>([]);
    const [task, setTask] = useState("")

    const [offers, setOffers] = useState<string[]>([])
    const [offer, setOffer] = useState("")

    const [requirements, setRequirements] = useState<string[]>([])
    const [requirement, setRequirement] = useState("")


    const [location, setLocation] = useState("")
    const [locationSuggestions, setLocationSuggestions] = useState([])

    const debouncedSearchTerm = _.debounce(() => getGeolocation(location), 200);

    const [suggestions, setSuggestions] = useState<Array<string>>([]);  

    const [longitude, setLongitude] = useState(0)
    const [latitude, setLatitude] = useState(0)

    console.log("longitude", longitude)
    console.log("latitude", latitude)

    useEffect(() => {
        if (location) {
            debouncedSearchTerm();
            // Cancel the debounce on useEffect cleanup.
            return debouncedSearchTerm.cancel;
        } else {
            setSuggestions([]);
        }
    }, [location]);

    const getGeolocation = (search: string) => {
        axios.get('https://api.opencagedata.com/geocode/v1/json', {
            params: {
                key: `${process.env.NEXT_PUBLIC_KEY}`,
                q: search,
                language: 'de',
                limit: 5,
                countrycode: 'de'
            }
        }).then(response => {
            if (response.data.results) {
                let suggestionList = response.data.results.map((place: any) => place.formatted);
                setSuggestions(suggestionList);
                setLongitude(response.data.results[0].geometry.lng)
                setLatitude(response.data.results[0].geometry.lat)
            } else {
                setSuggestions([]);
            }
        }).catch(error => {
            console.error('Error fetching data from OpenCage API: ', error);
            setSuggestions([]);
        });
    };



    const addTask = (task: string) => {
        setTasks((prevTasks) => [...prevTasks, task]);
    };

    const deleteTask = (index: number) => {
        const newTasks = [...tasks];
        newTasks.splice(index, 1);
        setTasks(newTasks);
    };

    const addOffer = (offer: string) => {
        setOffers((prevOffers) => [...prevOffers, offer]);
    };

    const deleteOffer = (index: number) => {
        const newOffers = [...offers];
        newOffers.splice(index, 1);
        setOffers(newOffers);
    };

    const addRequirement = (requirement: string) => {
        setRequirements((prevRequirements) => [...prevRequirements, requirement]);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
    }

    const deleteRequirement = (index: number) => {
        const newRequirements = [...requirements];
        newRequirements.splice(index, 1);
        setRequirements(newRequirements);
    };

    const createNewPost = () => {

        axios.post('/api/newPost', {
            userEmail: session?.user?.email,
            jobTitle: jobTitle,
            detailedJobDescription: detailedJobDescription,
            tasks: tasks,
            offers: offers,
            requirements: requirements,
            contactPersonName: contactPersonName,
            contactPersonNumber: contactPersonNumber,
            contactPersonEmail: contactPersonEmail,
            location:location,
            latitude:latitude,
            longitude:longitude,
        })
            .then(function (response) {
                console.log(response);
                router.push('/bussines/bussines-dashboard')
            })
            .catch(function (error) {
                console.log(error);
            });
    }



    return (
        <main>
            <Navbar
                currentPage='bussines'
            />
            <div className='mb-10'>
                <Link href={'/bussines/bussines-dashboard'}>
                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M872 474H286.9l350.2-304c5.6-4.9 2.2-14-5.2-14h-88.5c-3.9 0-7.6 1.4-10.5 3.9L155 487.8a31.96 31.96 0 0 0 0 48.3L535.1 866c1.5 1.3 3.3 2 5.2 2h91.5c7.4 0 10.8-9.2 5.2-14L286.9 550H872c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8z"></path></svg>
                </Link>
            </div>

            <section>
                <div>
                    <div>
                        <input type='text' value={location} onChange={(e) => setLocation(e.target.value)} className='block border mb-5 p-2 w-5/6  mx-auto rounded-xl' placeholder='Ort'  name="location" id="location" list="location-suggestions" />
                        <datalist id="location-suggestions">
                            {suggestions.map((suggestion, index) => <option key={index}>{suggestion}</option>)}
                        </datalist>
                    </div>
                    <input onChange={(e) => setJobTitle(e.target.value)} className='block border mb-5 p-2 w-5/6  mx-auto rounded-xl' placeholder='Stellenbezeichnung' type="text" name="jobTitle" id="jobTitle" />
                    <textarea onChange={(e) => setDetailedJobDescription(e.target.value)} className='block border max-h-36 h-36 mb-5 p-2 w-5/6 mx-auto rounded-xl' placeholder='Stellenbeschreibung' name="detailedDescription" id="detailedDescription" />
                    <input onChange={(e) => setContactPersonName(e.target.value)} className='block border mb-5 p-2 w-5/6 mx-auto rounded-xl' placeholder='Name Kontaktperson' type="text" name="contactPerson" id="contactPerson" />
                    <input onChange={(e) => setContactPersonNumber(e.target.value)} className='block border mb-5 p-2 w-5/6 mx-auto rounded-xl' placeholder='Nummer Kontaktperson' type="text" name="contactPersonNumber" id="contactPersonNumber" />
                    <input onChange={(e) => setContactPersonEmail(e.target.value)} className='block border mb-5 p-2 w-5/6 mx-auto rounded-xl' placeholder='E-mail Kontaktperson' type="text" name="contactPerson" id="contactPerson" />
                </div>

                <form onSubmit={(e) => { e.preventDefault(); addTask(task); setTask('') }}>
                    <div className='flex justify-center'>
                        <div className='flex w-5/6 items-center'>
                            <textarea value={task} onChange={(e) => setTask(e.target.value)} className='border rounded-xl p-2 mb-5 max-h-36 mr-2' name="" id="" cols={30} rows={5} placeholder='Aufgaben:'></textarea>
                            <button className='block mx-auto font-light border w-1/3 m-2  rounded-2xl my-2 p-2 ' type='submit'>hinzufügen</button>
                        </div>
                    </div>
                </form>
                <form onSubmit={(e) => { e.preventDefault(); addOffer(offer); setOffer('') }}>
                    <div className='flex justify-center'>
                        <div className='flex w-5/6 items-center'>
                            <textarea value={offer} onChange={(e) => setOffer(e.target.value)} className='border rounded-xl p-2 mb-5 max-h-36 mr-2' name="" id="" cols={30} rows={5} placeholder='Was wir bieten:'></textarea>
                            <button className='block mx-auto font-light border w-1/3 m-2  rounded-2xl my-2 p-2 ' type='submit'>hinzufügen</button>
                        </div>
                    </div>
                </form>
                <form onSubmit={(e) => { e.preventDefault(); addRequirement(requirement); setRequirement('') }}>
                    <div className='flex justify-center'>
                        <div className='flex w-5/6 items-center'>
                            <textarea value={requirement} onChange={(e) => setRequirement(e.target.value)} className='border rounded-xl p-2 mb-5 max-h-36 mr-2' name="" id="" cols={30} rows={5} placeholder='Anforderungen:'></textarea>
                            <button className='block mx-auto font-light border w-1/3 m-2  rounded-2xl my-2 p-2  mb-10 ' type='submit'>hinzufügen</button>
                        </div>
                    </div>
                </form>


                <section className='bg-white '>
                    {/* ============================= ============================ TASKS ============================================================ */}
                    <div className='my-10 p-6'>
                        <p>Aufgaben:</p>
                        <div>
                            {tasks && tasks.map((item, index) => {
                                return (
                                    <div className='flex justify-between my-2' key={nanoid()}>
                                        <p className='inline'>&#x2022;{item} </p>
                                        <button className='bg-red-400 p-1 text-white rounded-md' onClick={() => deleteTask(index)}>
                                            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2.46-7.12l1.41-1.41L12 12.59l2.12-2.12 1.41 1.41L13.41 14l2.12 2.12-1.41 1.41L12 15.41l-2.12 2.12-1.41-1.41L10.59 14l-2.13-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4z"></path></svg>
                                        </button>
                                    </div>
                                )
                            }

                            )}
                        </div>
                    </div>
                    {/* ========================================================= OFFERS ============================================================ */}
                    <div className='my-10 p-6'>
                        <p>Was wir bieten:</p>
                        <div>
                            {offers && offers.map((item, index) => {
                                return (
                                    <div className='flex justify-between my-2' key={nanoid()}>
                                        <p className='inline'>&#x2022;{item} </p>
                                        <button className='bg-red-400 p-1 text-white rounded-md' onClick={() => deleteOffer(index)}>
                                            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2.46-7.12l1.41-1.41L12 12.59l2.12-2.12 1.41 1.41L13.41 14l2.12 2.12-1.41 1.41L12 15.41l-2.12 2.12-1.41-1.41L10.59 14l-2.13-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4z"></path></svg>
                                        </button>
                                    </div>
                                )
                            }

                            )}
                        </div>
                    </div>
                    {/* ========================================================= REQUIREMENTS ============================================================ */}
                    <div className='my-10 p-6'>
                        <p>Anforderungen:</p>
                        <div>
                            {requirements && requirements.map((item, index) => {
                                return (
                                    <div className='flex justify-between my-2' key={nanoid()}>
                                        <p className='inline'>&#x2022;{item} </p>
                                        <button className='bg-red-400 p-1 text-white rounded-md' onClick={() => deleteRequirement(index)}>
                                            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2.46-7.12l1.41-1.41L12 12.59l2.12-2.12 1.41 1.41L13.41 14l2.12 2.12-1.41 1.41L12 15.41l-2.12 2.12-1.41-1.41L10.59 14l-2.13-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4z"></path></svg>
                                        </button>
                                    </div>
                                )
                            }

                            )}
                        </div>
                    </div>
                </section>
            </section>
            <button className='block mx-auto bg-[#66af99] text-white rounded-3xl p-3 font-light mb-5' onClick={() => createNewPost()}>Stellenausschreibung erstellen</button>
        </main>
    )
}

export default page