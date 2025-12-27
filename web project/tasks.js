const { useState } = React;

function TaskList() {
    const [tasks, setTasks] = useState([
        { id: 1, text: "Sample Task 1", done: false },
        { id: 2, text: "Sample Task 2", done: false }
    ]);

    const [newTask, setNewTask] = useState("");

    const addTask = () => {
        if (newTask.trim() === "") return;

        setTasks([
            ...tasks,
            { id: Date.now(), text: newTask, done: false }
        ]);
        setNewTask("");
    };

    const markDone = (id) => {
        setTasks(
            tasks.map(task =>
                task.id === id ? { ...task, done: true } : task
            )
        );
    };

    const deleteTask = (id) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    return (
        <div>
            <div className="task-input">
                <input
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="New task..."
                />
                <button onClick={addTask}>Add</button>
            </div>

            <ul className="task-list">
                {tasks
                    .filter(task => !task.done)
                    .map(task => (
                        <li key={task.id}>
                            {task.text}
                            <div>
                                <button onClick={() => markDone(task.id)}>Done</button>
                                <button onClick={() => deleteTask(task.id)}>Delete</button>
                            </div>
                        </li>
                    ))}
            </ul>
        </div>
    );
}

ReactDOM.createRoot(document.getElementById("tasks-root"))
    .render(<TaskList />);
