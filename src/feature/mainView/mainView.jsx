import NewTaskModal from "../newTaskModal/newTaskModal.jsx";
import TaskCard from "../custom/taskCard.jsx";
import {Button} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {selectIsShown, setIsModalShown} from "../newTaskModal/newTaskModalSlice.js";
import {Tasks} from "../tasks/tasks.jsx";
import {Toaster} from "react-hot-toast";

function MainView() {

    const dispatch = useDispatch()
    const addNewTaskModalIsShow = useSelector(selectIsShown)

    return (
        <div>
            <Toaster
                position="top-center"
                reverseOrder={false}
                gutter={8}
            />
            <Button onClick={ () => {
                if (!addNewTaskModalIsShow) {
                    dispatch(setIsModalShown(true))
                }
            }
            }>
                Add
            </Button>
            <div>
                <NewTaskModal isShown />
                <Tasks />
            </div>

        </div>)

}

export default MainView