import {useDispatch, useSelector} from "react-redux";
import {
    selectCurrentContextState,
    selectCurrentFilterMode,
    selectShouldUpdateTasks,
    selectTasks,
    setShouldUpdateTasks
} from "./taskSlice.js";
import {useEffect, useState} from "react";
import {getActiveTasks, getAllTasks} from "./taskActions.js";
import TaskCard from "../custom/taskCard.jsx";
import {startOfDay, toDate} from "../../utils/datetime.js";

export function Tasks() {
    const dispatch = useDispatch()
    const tasks = useSelector(selectTasks)
    const shouldUpdateTasks = useSelector(selectShouldUpdateTasks)
    const currentFilterMode = useSelector(selectCurrentFilterMode); // Get selected filter mode
    const currentContextState = useSelector(selectCurrentContextState);
    const [filteredTasks, setFilteredTasks] = useState(tasks);


    useEffect(() => {
        dispatch(getActiveTasks())
    }, []);

    useEffect(() => {
        if (shouldUpdateTasks) {
            // dispatch(getAllTasks())
            console.log("Tasks updated!")
            updateFilteredTasks(tasks)
            dispatch(setShouldUpdateTasks(false))
        }

    }, [shouldUpdateTasks]);

    useEffect(() => {
        console.log("Get all tasks!")
    }, [tasks]);



    function updateFilteredTasks() {
        const today = startOfDay(new Date());
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);

        setFilteredTasks(
            tasks.filter((task) => {
                const taskDate = toDate(task?.creation_date);
                if (!taskDate) {
                    console.error("Invalid date:", task?.creation_date);
                    return false;
                }
                const taskDay = startOfDay(taskDate);

                if (currentFilterMode === "yesterday") return taskDay.getTime() === yesterday.getTime();
                if (currentFilterMode === "today") return taskDay.getTime() === today.getTime();
                if (currentFilterMode === "series") return task?.is_template === 1 || task?.is_template === true || task?.is_template === "1";

                return true;
            })
        );

        console.log(filteredTasks)
    }




return (
    tasks?.length > 0 ? (
        <section className="mt-4 tasks-wrap">   {/* ✅ full width wrapper */}
            <h2>Task List</h2>
            <div className="tasks-grid">          {/* ✅ drop "row" to avoid Bootstrap */}
                {filteredTasks.map((task) =>
                        (
                            <TaskCard
                                key={task.id}
                                id={task.id}
                                name={task.name}
                                description={task.description}
                                creationDate={task.creation_date}
                                priority={task.priority}
                                complexity={task.complexity}
                                completed={task.completed}
                                isTemplate={task.is_template}
                                onlyCreated={task.only_created}
                                doneBtn={task.completed}
                            />
                        )
                )}
            </div>
        </section>
    ) : (
        <div><h3>No data!</h3></div>
    )
);
}