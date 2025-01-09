import {useDispatch, useSelector} from "react-redux";
import {selectTasks} from "./taskSlice.js";
import {useEffect} from "react";
import {getAllTasks} from "./taskActions.js";

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
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">{task.name}</h5>
                                        <p className="card-text">
                                            <strong>Description:</strong> {task.description}
                                        </p>
                                        <p className="card-text">
                                            <strong>Creation Date:</strong> {task.CreationDate}
                                        </p>
                                        <p className="card-text">
                                            <strong>Completed:</strong> {task.Completed ? "Yes" : "No"}
                                        </p>
                                        <p className="card-text">
                                            <strong>Priority:</strong> {task.Priority || "N/A"}
                                        </p>
                                        <p className="card-text">
                                            <strong>Complexity:</strong> {task.Complexity || "N/A"}
                                        </p>
                                    </div>
                                </div>
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