import {useDispatch, useSelector} from "react-redux";
import {selectShouldUpdateTasks, selectTasks, setShouldUpdateTasks} from "./taskSlice.js";
import {useEffect} from "react";
import {getAllTasks} from "./taskActions.js";
import TaskCard from "../custom/taskCard.jsx";

export function Tasks() {
    const dispatch = useDispatch()
    const tasks = useSelector(selectTasks)
    const shouldUpdateTasks = useSelector(selectShouldUpdateTasks)

    useEffect(() => {
        dispatch(getAllTasks())
    }, []);

    useEffect(() => {
        if (shouldUpdateTasks) {
            dispatch(getAllTasks())
            console.log("Tasks updated!")
            dispatch(setShouldUpdateTasks(false))
        }

    }, [shouldUpdateTasks]);

    useEffect(() => {
        console.log("Get all tasks!")
    }, [tasks]);

    return (
            tasks?.length > 0
            ?
                ( <div className="container mt-4">
                    <h2>Task List</h2>
                    <div className="row" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '16px' }}>
                        {tasks.map((task, index) => (
                            task?.completed === 0 &&
                            <div className="col-12 col-md-6 col-sm-6 mb-3" key={task.id}>
                                <TaskCard id={task.id} name={task.name} description={task.description}
                                    creationDate={task.creation_date} priority={task.priority}
                                    complexity={task.complexity} isTemplate={task.is_template} doneBtn={task.completed}
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