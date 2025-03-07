import "./taskCard.css"
import {Button} from "react-bootstrap";
import {MdClose, MdDone} from "react-icons/md";
import {useDispatch} from "react-redux";
import {markTaskCompleted} from "../tasks/taskActions.js";
import {markTaskTemplateCompleted} from "../tasks/taskTemplateActions.js";
import {setActionType, setIsModalShown, setTaskToEdit} from "../newTaskModal/newTaskModalSlice.js";
import 'react-tooltip/dist/react-tooltip.css'
import {Tooltip} from "react-tooltip";


function TaskCard({
                      id, name, creationDate, completed, priority, complexity,
                      isTemplate, description, doneBtn
                  }) {
    const dispatch = useDispatch();


    function markCompleted() {
        if (isTemplate === 1) {
            dispatch(markTaskTemplateCompleted(id))
        } else {
            dispatch(markTaskCompleted(id))
        }
    }

    function modifyCard() {
        dispatch(setIsModalShown(true))
        dispatch(setTaskToEdit(
            {
                "id": id,
                "complexityValue": complexity,
                "priorityValue": priority,
                "description": description,
                "name": name
            }
        ))
        dispatch(setActionType("edit"))
    }

    return (
        <div
            data-tooltip-id={`tooltip-${id}`} // Link div to tooltip
            onDoubleClick={modifyCard}
            className={`m-3 card-task-outline position-relative ${
                priority === "Low" || priority === null
                    ? "low-priority"
                    : priority === "High"
                        ? "high-priority"
                        : ""
            }`
            }>
            <div className="d-flex justify-content-between">
                <div style={{fontSize: "0.75rem", marginLeft: "5px"}}>
                    {creationDate}
                </div>
                <div style={{fontSize: "0.75rem", marginRight: "50px"}}>
                    {complexity}
                </div>
                {/* Minimized font size */}
                <div>
                    <Button
                        style={{
                            backgroundColor: "#646cff",
                            width: "16px", // Adjust the width
                            height: "16px", // Adjust the height
                            display: "flex", // Flexbox for centering the icon
                            alignItems: "center",
                            justifyContent: "center",
                            padding: "0", // Ensure no extra padding
                        }}
                    >
                        <MdClose size="1.5em"/> {/* Adjust icon size here */}
                    </Button>
                </div>
            </div>
            <div className="m-2 mt-3" style={{height: "70%"}}>
                <h6 style={{textAlign: "justify"}}>{name}</h6>
            </div>
            <div className="d-flex flex-row-reverse">
                <Button
                    className="justify-content-end bg-success"
                    onClick={markCompleted}
                    style={{
                        // backgroundColor: "#646cff",
                        width: "16px", // Adjust the width
                        height: "16px", // Adjust the height
                        display: "flex", // Flexbox for centering the icon
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "0", // Ensure no extra padding
                    }}
                >
                    <MdDone size="1.5em"/>
                </Button>
            </div>
            {/* React Tooltip */}
            <Tooltip id={`tooltip-${id}`} place="top" effect="solid">
                {description || "No description available"}
            </Tooltip>
        </div>
    )
}

export default TaskCard