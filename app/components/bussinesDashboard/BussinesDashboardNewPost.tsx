'use client'
import { FC, useState } from 'react'
import { useSession } from 'next-auth/react'
import { nanoid } from 'nanoid'
import axios from 'axios'

interface BussinesDashboardNewPostProps {

}

const BussinesDashboardNewPost: FC<BussinesDashboardNewPostProps> = ({ }) => {

  const { data: session } = useSession()
  console.log(session?.user?.email)

  const [jobTitle, setJobTitle] = useState("")
  const [shortJobDescription, setShortJobDescription] = useState("")
  const [detailedJobDescription, setSetailedJobDescription] = useState("")
  const [contactPerson, setContactPerson] = useState("")

  const [tasks, setTasks] = useState<string[]>([]);
  const [task, setTask] = useState("")

  const [offers, setOffers] = useState<string[]>([])
  const [offer, setOffer] = useState("")

  const [requirements, setRequirements] = useState<string[]>([])
  const [requirement, setRequirement] = useState("")

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
    /* req backend */
    axios.post('/api/newPost', {
      userEmail: session?.user?.email,
      jobTitle: jobTitle,
      shortJobDescription: shortJobDescription,
      detailedJobDescription: detailedJobDescription,
      tasks: tasks,
      offers: offers,
      requirements: requirements,
      contactPerson: contactPerson
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <main>
      <form >
        <input onChange={(e) => setJobTitle(e.target.value)} className='block border-2 border-black' placeholder='job title' type="text" name="jobTitle" id="jobTitle" />
        <input onChange={(e) => setShortJobDescription(e.target.value)} className='block border-2 border-black' placeholder='short job description' type="text" name="shortDescription" id="shortDescription" />
        <input onChange={(e) => setSetailedJobDescription(e.target.value)} className='block border-2 border-black' placeholder='detailed job description' type="text" name="detailedDescription" id="detailedDescription" />
        <input onChange={(e) => setContactPerson(e.target.value)} className='block border-2 border-black' placeholder='contact Person' type="text" name="contactPerson" id="contactPerson" />

      


      {/* bulletpoints */}
      <div>
        <div>
          <input onChange={(e) => setTask(e.target.value)} className=' border-2 border-black' placeholder='job tasks' type="text" name="jobTasks" id="jobTasks" />
          <button onClick={() => addTask(task)}>add task</button>
        </div>
      </div>
      <div>
        <input onChange={(e) => setOffer(e.target.value)} className='border-2 border-black' placeholder='What we offer you' type="text" name="jobOffer" id="jobOffer" />
        <button onClick={() => addOffer(offer)}>add offer</button>
      </div>
      <div>
        <input onChange={(e) => setRequirement(e.target.value)} className='border-2 border-black' placeholder='job requirements' type="text" name="jobRequirements" id="jobRequirements" />
        <button onClick={() => addRequirement(requirement)}>add requirement</button>
      </div>

      <button onClick={() => createNewPost()}>Create new job post</button>


      <section className='bg-white h-screen'>
        {/* ============================= ============================ TASKS ============================================================ */}
        <div className='my-10'>
          <p>Tasks</p>
          <div>
            {tasks && tasks.map((item, index) => {
              return (
                <div key={nanoid()}>
                  <p className='inline'>&#x2022;{item} </p>
                  <button className='bg-red-400 p-1 text-white rounded-md' onClick={() => deleteTask(index)}>delete task</button>
                </div>
              )
            }

            )}
          </div>
        </div>
        {/* ========================================================= OFFERS ============================================================ */}
        <div className='my-10'>
          <p>Job offer</p>
          <div>
            {offers && offers.map((item, index) => {
              return (
                <div key={nanoid()}>
                  <p className='inline'>&#x2022;{item} </p>
                  <button className='bg-red-400 p-1 text-white rounded-md' onClick={() => deleteOffer(index)}>delete offer</button>
                </div>
              )
            }

            )}
          </div>
        </div>
        {/* ========================================================= REQUIREMENTS ============================================================ */}
        <div className='my-10'>
          <p>Job requirement</p>
          <div>
            {requirements && requirements.map((item, index) => {
              return (
                <div key={nanoid()}>
                  <p className='inline'>&#x2022;{item} </p>
                  <button className='bg-red-400 p-1 text-white rounded-md' onClick={() => deleteRequirement(index)}>delete requirement</button>
                </div>
              )
            }

            )}
          </div>
        </div>
      </section>
      </form>
    </main>
  )
}

export default BussinesDashboardNewPost