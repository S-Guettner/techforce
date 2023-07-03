'use client'
import { FC, useState } from 'react'
import { nanoid } from 'nanoid'

interface BussinesDashboardNewPostProps {

}

const BussinesDashboardNewPost: FC<BussinesDashboardNewPostProps> = ({ }) => {


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
    e.preventDefault(); // Prevent the default form submission behavior
    // Process the form data or perform any necessary actions
  };

  const deleteRequirement = (index: number) => {
    const newRequirements = [...requirements];
    newRequirements.splice(index, 1);
    setRequirements(newRequirements);
  };

  return (
    <main>
      <div>BussinesDashboardNewPost</div>
      <form >
        <input className='block border-2 border-black' placeholder='job title' type="text" name="jobTitle" id="jobTitle" />
        <input className='block border-2 border-black' placeholder='short job description' type="text" name="shortDescription" id="shortDescription" />


      </form>


      {/* bulletpoints */}
      <div>
        <form onSubmit={handleSubmit}>
          <input onChange={(e) => setTask(e.target.value)} className='block border-2 border-black' placeholder='job tasks' type="text" name="jobTasks" id="jobTasks" />
          <button onClick={() => addTask(task)}>add task</button>
        </form>
      </div>
      <div>
        <input onChange={(e) => setOffer(e.target.value)} className='block border-2 border-black' placeholder='What we offer you' type="text" name="jobOffer" id="jobOffer" />
        <button onClick={() => addOffer(offer)}>add offer</button>
      </div>
      <div>
        <input onChange={(e) => setRequirement(e.target.value)} className='block border-2 border-black' placeholder='job requirements' type="text" name="jobRequirements" id="jobRequirements" />
        <button onClick={() => addRequirement(requirement)}>add requirement</button>
      </div>


      <section className='bg-white h-screen'>
        <div>
          {/* ========================================================= TASKS ============================================================ */}
          <p>Tasks</p>
          <div>
            {tasks && tasks.map((item, index) => {
              return (
                <div key={nanoid()}>
                  <p className='inline'>&#x2022;{item} index = {index}</p>
                  <button className='bg-red-400 p-1 text-white rounded-md' onClick={() => deleteTask(index)}>delete task</button>
                </div>
              )
            }

            )}
          </div>
        </div>
        <div>
          {/* ========================================================= OFFERS ============================================================ */}
          <p>Job offer</p>
          <div>
            {offers && offers.map((item, index) => {
              return (
                <div key={nanoid()}>
                  <p className='inline'>&#x2022;{item} index = {index}</p>
                  <button className='bg-red-400 p-1 text-white rounded-md' onClick={() => deleteOffer(index)}>delete offer</button>
                </div>
              )
            }

            )}
          </div>
        </div>
        <div>
          {/* ========================================================= REQUIREMENTS ============================================================ */}
          <p>Job requirement</p>
          <div>
            {requirements && requirements.map((item, index) => {
              return (
                <div key={nanoid()}>
                  <p className='inline'>&#x2022;{item} index = {index}</p>
                  <button className='bg-red-400 p-1 text-white rounded-md' onClick={() => deleteRequirement(index)}>delete requirement</button>
                </div>
              )
            }

            )}
          </div>
        </div>
      </section>
    </main>
  )
}

export default BussinesDashboardNewPost