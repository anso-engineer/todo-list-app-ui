import {Button, Form, Modal} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {
    dropState,
    selectActionType,
    selectIsShown,
    selectTaskToEdit
} from "./newTaskModalSlice.js";
import {Controller, useForm} from "react-hook-form";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import './dropdownStyle.css'
import './newTaskModal.css'
import {handleDropdownChangeRhk} from "../../utils/handlers.js";
import {addNewTask, editTask} from "./newTaskModalAction.js";
import {useEffect} from "react";
import TiptapEditor from "../../templates/TipTapEditor/TipTapEditor.jsx";

export const priorityOptions = [
    {value: 'Low', label: 'Low'},
    {value: 'High', label: 'High'},
]


export const complexityOptions = [
    {value: 'Easy', label: 'Easy'},
    {value: 'Moderate', label: 'Moderate'},
    {value: 'High', label: 'High'}
]

function NewTaskModal() {

    const actionType = useSelector(selectActionType)
    const isShown = useSelector(selectIsShown)
    const dispatch = useDispatch();
    const taskToEdit = useSelector(selectTaskToEdit)
    // const [selectedPriorityOption, setSelectedPriorityOption] = useState(null);

    useEffect(() => {
        if(taskToEdit) {
            console.log(taskToEdit)
            reset(taskToEdit)
        }
    }, [taskToEdit]);


    const form = useForm({
        mode: "onTouched",
        defaultValues: taskToEdit || {}, // Pre-fill values if editing
    });

    const {
        register,
        setValue,
        trigger,
        control,
        watch,
        reset,
        dirtyFields,
        handleSubmit,
        formState: {errors}
    } = form;

    useEffect(() => {
        register("complexityValue")
        register("priorityValue")
    }, [register]);



    // Custom submit handler
    const onSubmit = data => {
        console.log('Form Data:', data);
        if (actionType === "add") {
            dispatch(addNewTask(data));
        } else if (actionType === "edit") {
            dispatch(editTask(data)); // You would need to implement editTask action
        }
        dispatch(dropState())
        reset()
    };

    // Prevent form submission by default and use handleSubmit for controlled submission
    const handleFormSubmit = handleSubmit(
        onSubmit
    );

    const defaultValues = {
        name: "",
        priorityValue: "",
        complexityValue: "",
        description: "",
    };

    function handleClose() {
        dispatch(dropState())
        Object.keys(defaultValues).forEach((key) => {
            setValue(key, defaultValues[key]); // Reset each field to its specific default value
        });
    }


    return (
        <div>
            <Modal show={isShown}
                   onHide={handleClose}
                   dialogClassName="add-task-modal-dialog"
                   contentClassName="add-task-modal-content"
                   centered>
                {/*<Modal.Dialog>*/}
                    <Modal.Header closeButton>
                        <Modal.Title>Plan your next task</Modal.Title>
                    </Modal.Header>
                    <Modal.Body
                    >
                        <Form onSubmit={handleFormSubmit}>
                            <Form.Group>
                                <div style={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
                                    <div style={{width: '48%'}}>
                                        {errors.priorityValue ? (
                                            <span className="text-danger">
                                                Empty not allowed
                                            </span>
                                        ) : (
                                            <label>Priority</label>
                                        )}
                                        <Controller
                                            name="priorityValue"
                                            control={control}
                                            rules={{
                                                required: 'Empty not allowed', // Validation rule
                                            }}
                                            render={({field}) => (
                                                <Dropdown options={priorityOptions}
                                                          controlClassName="dropdown-custom-primary"
                                                          onChange={handleDropdownChangeRhk(priorityOptions, field,
                                                              "priorityValue", setValue, trigger)}
                                                          value={watch("priorityValue")}
                                                          placeholder="Select an option"
                                                />
                                            )}
                                        />
                                    </div>
                                    <div style={{width: '48%'}}>
                                        {errors.complexityValue ? (
                                            <span className="text-danger">
                                                Empty not allowed
                                            </span>
                                        ) : (
                                            <label>Complexity</label>
                                        )}
                                        <Controller
                                            name="complexityValue"
                                            control={control}
                                            rules={{
                                                required: 'Empty not allowed', // Validation rule
                                            }}
                                            render={({field}) => (
                                                <Dropdown options={complexityOptions}
                                                          controlClassName="dropdown-custom-primary"
                                                          onChange={handleDropdownChangeRhk(complexityOptions, field,
                                                              "complexityValue", setValue, trigger)}
                                                          value={watch("complexityValue")}
                                                          placeholder="Select an option"
                                                          style={{width: "50%", borderColor: "blue"}}
                                                />
                                            )}
                                        />
                                    </div>
                                </div>
                            </Form.Group>


                            <Form.Group className="mb-3">
                                <label className="mb-2">Name</label>
                                <input
                                    {...register("name", {
                                        required: "Empty name isn't allowed",
                                        validate: {
                                            minLength: (value) =>
                                                value.length >= 6 || "Text must be at least 6 characters long",
                                            maxLength: (value) =>
                                                value.length <= 45 || `You exceeded the text length by ${value.length - 45} symbols`,
                                        },
                                    })}
                                    className="form-control border-primary"
                                    type="text"
                                    placeholder="Name for the future task"
                                />
                                {errors.name && <span className="text-danger">{errors.name.message}</span>}
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <label className="mb-2">Description</label>
                                <Controller
                                    name="description"
                                    control={control}
                                    {...register("description", {
                                        validate: {
                                            maxLength: (value) =>
                                                value.length <= 1000 || `You exceeded the title length by ${value.length - 1000} symbols`,
                                        },
                                    })}
                                    render={({ field }) => (
                                        <TiptapEditor
                                            value={field.value}
                                            onChange={field.onChange}
                                            error={errors.description}
                                        />
                                    )}
                                />
                                {errors.description &&
                                    <span className="text-danger">{errors.description.message}</span>}
                            </Form.Group>
                            {/* Spacer div for spacing between form and buttons */}
                            <div className="spacer"/>
                            {/* Buttons container */}
                            <div className="d-flex justify-content-end align-items-center mt-3">
                                <Button type="button" className="btn btn-secondary general-btn">
                                    Cancel
                                </Button>
                                <Button type="submit" className="btn btn-success general-btn" style={{marginLeft: "10px"}}>
                                    {actionType === "add" ? "Add" : "Modify"}
                                </Button>
                            </div>
                        </Form>
                    </Modal.Body>
                {/*</Modal.Dialog>*/}
            </Modal>
        </div>
    )
}

export default NewTaskModal