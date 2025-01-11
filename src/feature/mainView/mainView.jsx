import NewTaskModal from "../newTaskModal/newTaskModal.jsx";
import TaskCard from "../custom/taskCard.jsx";
import {Button} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {selectIsShown, setIsModalShown} from "../newTaskModal/newTaskModalSlice.js";

function MainView() {

    const dispatch = useDispatch()
    const addNewTaskModalIsShow = useSelector(selectIsShown)

    return (
        <div>
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
                <TaskCard
                    priority="High"
                    creationDate="12.07.2023"
                    complexity="Complex"
                    name="Analyze the impact of strength training on sprinting performance.
                            Design a soccer training session focused on improving ball control and passing accuracy.
                            Create a tactical plan for a football team to improve defensive strategies."
                />

                <TaskCard
                    priority="Medium"
                    creationDate="10.11.2022"
                    complexity="Complex" name="Develop a swimming technique workshop to enhance freestyle efficiency.
                        Create a basketball practice schedule to improve shooting accuracy from the perimeter.
                        Design a fitness regimen to improve flexibility for tennis players."
                />

                <TaskCard
                    priority="Low"
                    creationDate="20.09.2021"
                    complexity="Complex" name="Create a workout plan for improving vertical jump for basketball players.
                        Develop a strategy to improve endurance for marathon runners.
                        Design a rugby scrum drill to improve team coordination and power."
                />
            </div>

        </div>)

}

export default MainView