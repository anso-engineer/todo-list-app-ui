import {useDispatch, useSelector} from "react-redux";
import {selectTasks} from "./taskSlice.js";
import {useEffect} from "react";
import {getAllTasks} from "./taskActions.js";
import TaskCard from "../custom/taskCard.jsx";

export function Tasks() {
    const dispatch = useDispatch()
    const tasks = useSelector(selectTasks)

    useEffect(() => {
        dispatch(getAllTasks())
    }, []);

    useEffect(() => {
        console.log(tasks)
    }, [tasks]);

    return (
            tasks?.length > 0
            ?
                ( <div className="container mt-4">
                    <h2>Task List</h2>
                    <div className="row">
                        {tasks.map((task, index) => (
                            <div className="col-md-4 mb-3" key={task.id}>
                                <TaskCard name={task.name} description={task.description}
                                    creationDate={task.creation_date} priority={task.priority}
                                          complexity={task.complexity}
                                />

                            </div>
                        ))}
                    </div>
                </div>
                )
                :
                ( <div>
                    <h3> No data! </h3>
                </div>
                )
    )
}