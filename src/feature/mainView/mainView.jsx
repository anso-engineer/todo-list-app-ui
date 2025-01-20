import NewTaskModal from "../newTaskModal/newTaskModal.jsx";
import "../tasks/tasks.css"
import {Button} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {selectIsShown, setIsModalShown} from "../newTaskModal/newTaskModalSlice.js";
import {Tasks} from "../tasks/tasks.jsx";
import {Toaster} from "react-hot-toast";
import NewTaskTemplateModal from "../newTaskTemplateModal/newTaskTemplateModal.jsx";
import {
    selectIsTemplateModalShown,
    setIsTemplateModalShown
} from "../newTaskTemplateModal/newTaskTemplateModalSlice.js";

function MainView() {

    const dispatch = useDispatch()
    const addNewTaskModalIsShown = useSelector(selectIsShown)
    const addNewTaskTemplateModalIsShown = useSelector(selectIsTemplateModalShown);

    return (
        <div>
            <Toaster
                position="top-center"
                reverseOrder={false}
                gutter={8}
            />
            <Button
                className="toolbar-button"
                onClick={() => {
                    if (!addNewTaskModalIsShown) {
                        dispatch(setIsModalShown(true))
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
            <div>
                <NewTaskModal isShown/>
                <NewTaskTemplateModal isShown/>
                <Tasks/>
            </div>

        </div>)

}

export default MainView