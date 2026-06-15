import NewTaskModal from "../newTaskModal/newTaskModal.jsx";
import "../tasks/tasks.css"
import {Button} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {selectIsShown, setActionType, setIsModalShown} from "../newTaskModal/newTaskModalSlice.js";
import {Tasks} from "../tasks/tasks.jsx";
import {Toaster} from "react-hot-toast";
import NewTaskTemplateModal from "../newTaskTemplateModal/newTaskTemplateModal.jsx";
import "./mainView.css"
import {
    selectIsTemplateModalShown,
    setIsTemplateModalShown
} from "../newTaskTemplateModal/newTaskTemplateModalSlice.js";
import {
    selectCurrentContextState,
    selectCurrentFilterMode,
    setCurrentContextState,
    setCurrentFilterMode
} from "../tasks/taskSlice.js";
import {setIsTemplateMainModalShown} from "../templateMainModal/templateMainModalSlice.js";
import TemplateMainModal from "../templateMainModal/templateMainModal.jsx";
import AddEditTemplateModal from "../addEditTemplateModal/AddEditTemplateModal.jsx";
import {getActiveTasks, getCompletedTasks, getOnlyCreatedTasks} from "../tasks/taskActions.js";
import {getCompletedTasksApi} from "../../api/tasksApi.js";
import log from "eslint-plugin-react/lib/util/log.js";

function MainView() {

    const dispatch = useDispatch()
    const addNewTaskModalIsShown = useSelector(selectIsShown)
    const addNewTaskTemplateModalIsShown = useSelector(selectIsTemplateModalShown);
    const templateModalIsShown = useSelector(selectIsTemplateModalShown)
    const currentFilterMode = useSelector(selectCurrentFilterMode); // Get selected filter mode
    const currentContextState = useSelector(selectCurrentContextState);


    const handleFilterChange = (mode) => {
        if (currentFilterMode === mode) {
            // If the button clicked is already active, clear the filter
            dispatch(setCurrentFilterMode(""));  // Clear the filter by setting an empty string
        } else {
            // Otherwise, set the selected mode
            dispatch(setCurrentFilterMode(mode));  // Update the current filter mode
        }
    };

    return (
        <div className="main-view">
            <Toaster
                position="top-center"
                reverseOrder={false}
                gutter={8}
            />
            <div>
                <Button
                    className="toolbar-button"
                    onClick={() => {
                        if (!addNewTaskModalIsShown) {
                            dispatch(setIsModalShown(true))
                            dispatch(setActionType("add"))
                        }
                    }
                    }>
                    New Task
                </Button>
                <Button
                    className="toolbar-button"
                    onClick={() => {
                        if (!addNewTaskTemplateModalIsShown) {
                            dispatch(setIsTemplateModalShown(true))
                        }
                    }
                    }>
                    Predefined
                </Button>
                <Button
                    className="toolbar-button"
                    onClick={() => {
                        if (!templateModalIsShown) {
                            dispatch(setIsTemplateMainModalShown(true))
                        }
                    }
                    }>
                    Templates
                </Button>
            </div>
            <div>
                <Button
                    onClick={() => handleFilterChange("yesterday")}
                    className={`${currentFilterMode === "yesterday" ? "filter-button-active" : "filter-button-regular"}`}
                >
                    Yesterday
                </Button>
                <Button
                    onClick={() => handleFilterChange("today")}
                    className={`${currentFilterMode === "today" ? "filter-button-active" : "filter-button-regular"}`}
                >
                    Today
                </Button>
                <Button
                    onClick={() => handleFilterChange("series")}
                    className={`${currentFilterMode === "series" ? "filter-button-active" : "filter-button-regular"}`}
                >
                    Series
                </Button>
            </div>
            <div className="state-toolbox">
                <button
                    className={`state-toolbox-btn ${currentContextState === 'only-created' ? 'current-selected-state' : ''}`}
                    onClick={() => {
                        console.log("clicked on Only Created")
                        dispatch(setCurrentContextState("only-created"))
                        dispatch(getOnlyCreatedTasks())
                    }}
                >
                    <i className="bi bi-box-seam"></i> {/* Shelf */}
                </button>
                <button
                    className={`state-toolbox-btn ${currentContextState === 'active' ? 'current-selected-state' : ''}`}
                    onClick={() => {
                        console.log("clicked on Active")
                        dispatch(setCurrentContextState("active"))
                        dispatch(getActiveTasks())
                    }
                    }
                >
                    <i className="bi bi-table"></i> {/* Table */}
                </button>
                <button
                    className={`state-toolbox-btn ${currentContextState === 'completed' ? 'current-selected-state' : ''}`}
                    onClick={() => {
                        console.log("clicked on Completed")
                        dispatch(setCurrentContextState("completed"))
                        dispatch(getCompletedTasks())
                    }
                    }>
                    <i className="bi bi-building"></i> {/* Basement */}
                </button>
            </div>
            <div>
                <NewTaskModal isShown/>
                <NewTaskTemplateModal isShown/>
                <TemplateMainModal/>
                <AddEditTemplateModal/>
                <div className="cards-container">
                    <Tasks/>
                </div>
            </div>

        </div>)

}

export default MainView