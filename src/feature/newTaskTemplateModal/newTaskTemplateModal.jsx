import {Button, Form, Modal} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {
    dropState,
    selectIsTemplateModalShown,
    selectTaskTemplates,
    setIsTemplateModalShown,
} from "./newTaskTemplateModalSlice.js";
import {Controller, useForm} from "react-hook-form";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import './dropdownStyle.css'
import './newTaskTemplateModal.css'
import {addNewTaskTemplate, getOpenedTaskTemplates} from "./newTaskTemplateModalAction.js";
import {useEffect, useState} from "react";
import Select from "react-select";
import {handleDropdownChangeRhk, handleSelectChangeRhk} from "../../utils/handlers.js";
import {complexityOptions, priorityOptions} from "../newTaskModal/newTaskModal.jsx";


function NewTaskTemplateModal() {

    const isShown = useSelector(selectIsTemplateModalShown)
    const templates = useSelector(selectTaskTemplates)
    const dispatch = useDispatch();
    const [templateOptions, setTemplateOptions] = useState([])
// Template list
//     const templates = [
//         { id: 73, name: 'Помыть ванную и раковину', completed: 1 },
//         { id: 74, name: 'Помыть пол в кухне', completed: 1 },
//         { id: 75, name: 'Помыть пол в большой комнате', completed: 1 },
//     ];


// Transform template list to options

    const form = useForm({
        mode: "onTouched",
        defaultValues: {}
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

    useEffect(() => {
        if (isShown) dispatch(getOpenedTaskTemplates());
    }, [isShown]);


    useEffect(() => {
        if(templates.length > 0) {
                setTemplateOptions (templates.map((template) => ({
                value: template.id,
                label: template.name,
            }))
                );
        }
    }, [templates] );

    // Custom submit handler
    const onSubmit = data => {
        // console.log('Form Data:', data);
        const taskTemplateObj = {
            "task_template_id":  data.taskTemplateValue.value,
            "priority": data.priorityValue.value || null,
            "complexity": data.complexityValue.value || null,
        }
        dispatch(addNewTaskTemplate(taskTemplateObj))
        dispatch(setIsTemplateModalShown(false))
        reset()
        // Handle form data here (e.g., dispatch an action or make an API call)
    };

    // Prevent form submission by default and use handleSubmit for controlled submission
    const handleFormSubmit = handleSubmit(
        onSubmit
    );

    function handleClose() {
        dispatch(dropState())
        console.log(errors)
    }

    return (
        <div>
            <Modal show={isShown}
                   onHide={handleClose}
                // dialogClassName="add-price-modal-win"
                   contentClassName="add-task-template-modal-content"
                   dialogClassName="add-task-template-modal-dialog"
                   centered>
                <Modal.Dialog
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Plan based on template</Modal.Title>
                    </Modal.Header>
                    <Modal.Body
                    >
                        <Form onSubmit={handleFormSubmit} style={{height: "300px"}}>
                            <Form.Group className="mt-3">
                                <div style={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
                                    <div style={{width: '100%'}}>
                                        {errors.taskTemplateValue ? (
                                            <span className="text-danger">Template cannot be empty</span>
                                        ) : (
                                            <label>Template List</label>
                                        )}
                                        <Controller
                                            name="taskTemplateValue"
                                            control={control}
                                            // defaultValue={templateOptions[0]} // Set default value
                                            rules={{
                                                required: 'Empty not allowed', // Validation rule
                                            }}
                                            render={({field}) => (
                                                <Select
                                                    options={templateOptions}
                                                    {...field}
                                                    onChange={(selectedOption) => {
                                                        handleSelectChangeRhk(templateOptions, field, 'taskTemplateValue', setValue, trigger)(selectedOption);
                                                    }}
                                                    onMenuOpen={() => console.log(templateOptions)} // Optional: Define onMenuOpen explicitly if needed
                                                    value={watch('taskTemplateValue')}
                                                    placeholder="Select a template"
                                                />
                                            )}
                                        />
                                    </div>
                                </div>
                            </Form.Group>
                            <Form.Group className="mt-3">
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
                                            <label>Сomplexity</label>
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
                            <div className="spacer"/>
                            {/* Buttons container */}
                            <div className="d-flex justify-content-end align-items-center mt-5">
                                <Button type="button" className="btn btn-secondary general-btn">
                                    Cancel
                                </Button>
                                <Button type="submit" className="btn btn-success general-btn"
                                        style={{marginLeft: "12px"}}>
                                    Submit
                                </Button>
                            </div>
                        </Form>
                    </Modal.Body>
                </Modal.Dialog>
            </Modal>
        </div>
    )
}

export default NewTaskTemplateModal