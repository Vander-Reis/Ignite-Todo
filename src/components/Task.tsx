import styles from "./Task.module.css";
import { Trash } from "phosphor-react";
import { useState } from "react";

interface PropsTask {
    content: {
        checked: boolean;
        task: string;
    }

    onDeleteTask: (taskDelete: object) => void;
    onCountChecked: (countChecked: string, checked: boolean) => void;
}


export function Task({ content, onDeleteTask, onCountChecked } : PropsTask) {

    const [checked, setChecked] = useState(false);

    function handleChangeChecked() {
        setChecked(prevState => !prevState);
        onCountChecked(content.task, !checked);
    }

    function handleDeleteTask() {
        onDeleteTask(content);
    }

  return (
    <div className={styles.container}>
        <div className={checked ? styles.taskCompleted : styles.taskIncomplete}>
            <div className={styles.task}>
                <input 
                    name="checkbox"
                    type="checkbox"
                    onChange={handleChangeChecked}
                    checked={checked}
                    
                />
                <p>{content.task}</p>
                <Trash size={20} onClick={handleDeleteTask}/>
            </div>
        </div>
    </div>
  );
}
