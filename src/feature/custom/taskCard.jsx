import "./taskCard.css"
import {Button} from "react-bootstrap";
import {MdClose} from "react-icons/md";


function TaskCard({name, creationDate, completed, priority, complexity}) {
    return (
        <div
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
                <div style={{fontSize: "0.75rem", marginRight: "120px"}}>
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
            <div className="m-2 mt-3">
                <h6 style={{textAlign: "justify"}}>{name}</h6>

            </div>
        </div>
    )
}

export default TaskCard