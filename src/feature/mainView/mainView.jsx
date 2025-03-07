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
import {selectCurrentFilterMode, setCurrentFilterMode} from "../tasks/taskSlice.js";

function MainView() {

    const dispatch = useDispatch()
    const addNewTaskModalIsShown = useSelector(selectIsShown)
    const addNewTaskTemplateModalIsShown = useSelector(selectIsTemplateModalShown);
    const currentFilterMode = useSelector(selectCurrentFilterMode); // Get selected filter mode

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
                    Template
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
            <div>
                <NewTaskModal isShown/>
                <NewTaskTemplateModal isShown/>
                <Tasks/>
            </div>

        </div>)

}

export default MainView