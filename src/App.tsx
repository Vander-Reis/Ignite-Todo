import { Header } from "./components/Header";
import { Task } from "./components/Task";
import { AiOutlinePlusCircle } from "react-icons/ai";
import styles from "./App.module.css";
import "./global.css";
import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import noTasks from "./assets/Clipboard.svg";

interface Task {
  checked: boolean;
  task: string;
}

export function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const [newTaskText, setNewTaskText] = useState("");

  function handleCreateTask(event: FormEvent) {
    event.preventDefault();

    setTasks([...tasks, { checked: false, task: newTaskText }]);

    setNewTaskText('');
  
  }


  function handleNewCommentChange(event: ChangeEvent<HTMLInputElement>) {
    setNewTaskText(event.target.value);
  }

  function deleteTask(taskToDelete: object) {

    const tasksWithoutDeletedOne = tasks.filter(task => {
      return task !== taskToDelete;
    })

    setTasks(tasksWithoutDeletedOne);

    
  }

  function countTaskCompleted(content: string, checked: boolean) {
    const taskIndex = tasks.findIndex(task => task.task === content);

    const tempTasks = [...tasks];

    tempTasks[taskIndex].checked = checked;

    setTasks(tempTasks);
  }

  const isCompleted = tasks.filter(task => task.checked === true);



  return (
    <div>
      <Header />

      <main className={styles.container}>
        <form onSubmit={handleCreateTask}>
          <input
            type="text"
            placeholder="Adicione uma nova tarefa"
            value={newTaskText}
            onChange={handleNewCommentChange}
          />
          <button type="submit">
            Criar <AiOutlinePlusCircle size={20} />
          </button>
        </form>

        <div className={styles.statusTask}>
          <div className={styles.taskCreated}>
            <p>Tarefas criadas</p>
            <span>{tasks.length}</span>
          </div>

          <div className={styles.completedTasks}>
            <p>Tarefas Concluídas</p>
              {tasks.length === 0 ? 
                <span>{tasks.length}</span> : 
                  <span> {isCompleted.length} de {tasks.length}</span>
              }
          </div>
        </div>

        {tasks.length === 0 ? 
          <div className={styles.withNoTasks}>
            <img src={noTasks} />
            <p>Você ainda não tem tarefas cadastradas</p>
            <p>Crie tarefas e organize seus itens a fazer</p>
          </div>
          : 
          tasks.map((task) => {
            return (
              <Task
                key={task.task}
                content={task}
                onDeleteTask={deleteTask}
                onCountChecked={countTaskCompleted}
              />
            );
          })
        }
      </main>
    </div>
  );
}
