
import './App.css';
import { useEffect, useState } from 'react';
import { TextField, Button, Grid } from '@mui/material';
import styled from '@emotion/styled';
import TaskItem from './components/TaskItem';
import useLocalStorage from './hooks/useLocalStorage';
import { v4 as uuidv4 } from 'uuid';

function App() {

  const [taskName, setTaskName] = useState("");
  const [tasks, setTasks] = useLocalStorage("tasks",[]);
  
const fetchTasks = async () => {
  const response = await fetch("https://my-craft-project.ddev.site/tasks.json");
  const tasks = await response.json();

  if (tasks?.data) {
    setTasks(tasks.data);
  }
  console.log("TASKS FORM API", tasks);
}
useEffect(() => {
  //fetchTasks();

}, [])

  const valueChange = (event) => {
    const newValue = event.target.value;
   setTaskName(newValue);
  }

  const handleAddTask = (e, task) => {
    e.preventDefault();
    const newTasks =[...tasks];

    newTasks.unshift({
      id: uuidv4(),
      name: task,
  });

  setTasks(newTasks);
  setTaskName("");
}

console.log(taskName);

   
  return (
    <div className="App">
     <div id="todo-app">
    <form>
      <Grid connatiner justifyContent={"center"} alignItems={"center"}>
        <Grid item>
          <TextField type="text" 
          id="new-task" 
          placeholder="Enter a new task" 
          value={taskName}
          onChange={valueChange}
          />
        </Grid>
      </Grid>
      <Grid Item>
        <StyledButton
        className="add-task" 
        variant='outlined' 
        onClick={(e) => handleAddTask(e, taskName)}>Create Task</StyledButton>
      </Grid>
        
         </form>
        <ul id="task-list">
          {tasks.map((task, index) => {
            return (
              <TaskItem key={`task-${task.id}-${index}`} task={task} tasks={tasks} setTasks={setTasks} index={index} />
            )
          })}
        </ul>
    </div>
  </div>
  );
}

export default App;

const StyledButton = styled(Button)`
  border-color: green;
`