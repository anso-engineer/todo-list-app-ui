import {useDispatch, useSelector} from "react-redux";
import {selectCurrentFilterMode, selectShouldUpdateTasks, selectTasks, setShouldUpdateTasks} from "./taskSlice.js";
import {useEffect} from "react";
import {getAllTasks} from "./taskActions.js";
import TaskCard from "../custom/taskCard.jsx";

export function Tasks() {
    const dispatch = useDispatch()
    const tasks = useSelector(selectTasks)
    const shouldUpdateTasks = useSelector(selectShouldUpdateTasks)
    const currentFilterMode = useSelector(selectCurrentFilterMode); // Get selected filter mode


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

    const filteredTasks = tasks.filter((task) => {
        if (!task.creation_date) return false; // Prevent errors from undefined/null values

        // Convert "07.03.2025 10:59:08" → "2025-03-07T10:59:08"
        const parseCustomDate = (dateStr) => {
            const parts = dateStr.split(" ");
            if (parts.length !== 2) return null; // Ensure it's the correct format

            const [day, month, year] = parts[0].split(".");
            const time = parts[1];

            if (!day || !month || !year || !time) return null; // Ensure valid parts
            return new Date(`${year}-${month}-${day}T${time}`); // Convert to ISO format
        };

        const taskDate = parseCustomDate(task.creation_date);

        if (!taskDate || isNaN(taskDate.getTime())) {
            console.error("Invalid date:", task.creation_date);
            return false; // Skip invalid dates
        }

        // Get today's and yesterday's date strings for comparison
        const today = new Date();
        const yesterday = new Date();
        yesterday.setDate(today.getDate() - 1);

        // Normalize to compare only the date part
        const formatDate = (date) => date.toISOString().split("T")[0];

        const taskDateStr = formatDate(taskDate);
        const todayStr = formatDate(today);
        const yesterdayStr = formatDate(yesterday);

        if (currentFilterMode === "yesterday") return taskDateStr === yesterdayStr;
        if (currentFilterMode === "today") return taskDateStr === todayStr;
        if (currentFilterMode === "series") return task.is_template;

        return true; // Default: Show all tasks
    });


    return (
            tasks?.length > 0
            ?
                ( <div className="container mt-4">
                    <h2>Task List</h2>
                    <div className="row" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '16px' }}>
                        {filteredTasks.map((task, index) => (
                            task?.completed === 0 &&
                            <div className="col-12 col-md-6 col-sm-6 mb-3" key={task.id}>
                                <TaskCard id={task.id} name={task.name} description={task.description}
                                    creationDate={task.creation_date} priority={task.priority}
                                    complexity={task.complexity} isTemplate={task.is_template}
                                    doneBtn={task.completed}
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