import { useDispatch, useSelector } from "react-redux";
import {
    selectCurrentContextState,
    selectCurrentFilterMode,
    selectShouldUpdateTasks,
    selectTasks,
    setShouldUpdateTasks,
} from "./taskSlice.js";
import { useEffect, useMemo } from "react";
import {
    getActiveTasks,
    getCompletedTasks,
    getOnlyCreatedTasks,
} from "./taskActions.js";
import TaskCard from "../custom/taskCard.jsx";
import { startOfDay, toDate } from "../../utils/datetime.js";

export function Tasks() {
    const dispatch = useDispatch();

    const tasks = useSelector(selectTasks);
    const shouldUpdateTasks = useSelector(selectShouldUpdateTasks);
    const currentFilterMode = useSelector(selectCurrentFilterMode);
    const currentContextState = useSelector(selectCurrentContextState);

    /**
     * Initial loading
     */
    useEffect(() => {
        switch (currentContextState) {
            case "completed":
                dispatch(getCompletedTasks());
                break;

            case "only-created":
                dispatch(getOnlyCreatedTasks());
                break;

            case "active":
            default:
                dispatch(getActiveTasks());
        }
    }, [currentContextState, dispatch]);

    /**
     * Refresh after any action
     */
    useEffect(() => {
        if (!shouldUpdateTasks) {
            return;
        }

        switch (currentContextState) {
            case "completed":
                dispatch(getCompletedTasks());
                break;

            case "only-created":
                dispatch(getOnlyCreatedTasks());
                break;

            case "active":
            default:
                dispatch(getActiveTasks());
                break;
        }

        dispatch(setShouldUpdateTasks(false));
    }, [shouldUpdateTasks, currentContextState, dispatch]);

    /**
     * Filter tasks
     */
    const filteredTasks = useMemo(() => {
        const today = startOfDay(new Date());
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);

        return tasks.filter((task) => {
            const taskDate = toDate(task?.creation_date);

            if (!taskDate) {
                console.error("Invalid date:", task?.creation_date);
                return false;
            }

            const taskDay = startOfDay(taskDate);

            switch (currentFilterMode) {
                case "yesterday":
                    return taskDay.getTime() === yesterday.getTime();

                case "today":
                    return taskDay.getTime() === today.getTime();

                case "series":
                    return (
                        task?.is_template === 1 ||
                        task?.is_template === true ||
                        task?.is_template === "1"
                    );

                default:
                    return true;
            }
        });
    }, [tasks, currentFilterMode]);

    return (
        filteredTasks.length > 0 ? (
            <section className="mt-4 tasks-wrap">
                <h2>Task List</h2>

                <div className="tasks-grid">
                    {filteredTasks.map((task) => (
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
                    ))}
                </div>
            </section>
        ) : (
            <div>
                <h3>No data!</h3>
            </div>
        )
    );
}