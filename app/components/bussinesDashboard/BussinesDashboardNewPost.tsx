'use client'
import { FC, useState } from 'react'
import { nanoid } from 'nanoid'

interface BussinesDashboardNewPostProps {

}

const BussinesDashboardNewPost: FC<BussinesDashboardNewPostProps> = ({ }) => {

  const [tasks, setTasks] = useState<string[]>([]);
  const [task, setTask] = useState("")

  const addTask = (task: string) => {
    setTasks((prevTasks) => [...prevTasks, task]);
  };

  const deleteTask = (index: number) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the default form submission behavior
    // Process the form data or perform any necessary actions
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
      <input className='block border-2 border-black' placeholder='What we offer you' type="text" name="jobOffer" id="jobOffer" />
      <input className='block border-2 border-black' placeholder='job requirements' type="text" name="jobRequirements" id="jobRequirements" />


      <section>
        <p>Preview</p>
        <div>
          {tasks && tasks.map((item, index) => {
            return (
              <div>
                <p className='inline'>&#x2022;{item} index = {index}</p>
                <button className='bg-red-400 p-1 text-white rounded-md' onClick={() => deleteTask(index)}>delete task</button>
              </div>
            )
          }

          )}
        </div>
      </section>
    </main>
  )
}

export default BussinesDashboardNewPost