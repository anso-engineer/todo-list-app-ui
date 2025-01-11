import {Button, Form, Modal} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {selectIsShown, setIsModalShown} from "./newTaskModalSlice.js";
import {Controller, useForm} from "react-hook-form";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import './dropdownStyle.css'
import './newTaskModal.css'
import Select from "react-select/base";
import {useState} from "react";
import {handleDropdownChangeRhk, handleSelectChangeRhk} from "../../utils/handlers.js";

function NewTaskModal() {

    const isShown = useSelector(selectIsShown)
    const dispatch = useDispatch();
    // const [selectedPriorityOption, setSelectedPriorityOption] = useState(null);


    const priorityOptions = [
        {value: 'Low', label: 'Low'},
        {value: 'High', label: 'High'},
    ]


    const complexityOptions = [
        {value: 'Easy', label: 'Easy'},
        {value: 'Moderate', label: 'Moderate'},
        {value: 'High', label: 'High'}
    ]

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
        dirtyFields,
        handleSubmit,
        formState: {errors}
    } = form;


    // Custom submit handler
    const onSubmit = data => {
        console.log('Form Data:', data);
        // Handle form data here (e.g., dispatch an action or make an API call)
    };

    // Prevent form submission by default and use handleSubmit for controlled submission
    const handleFormSubmit = handleSubmit(onSubmit);

    function handleClose() {
        dispatch(setIsModalShown(false))
    }


    return (
        <div>
            <Modal show={isShown}
                   onHide={handleClose}
                // dialogClassName="add-price-modal-win"
                contentClassName="add-task-modal-content"
                   centered>
                <Modal.Dialog
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Plan your next task</Modal.Title>
                    </Modal.Header>
                    <Modal.Body
                    >
                        <Form onSubmit={handleFormSubmit}>
                            <Form.Group >
                                <div style={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>

                                    <div style={{width:'48%'}}>
                                        <label>Priority</label>
                                        <Controller
                                            name="priorityValue"
                                            control={control}
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
                                    <div style={{width:'48%'}}>
                                        <label>Complexity</label>
                                        <Controller
                                            name="complexityValue"
                                            control={control}
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
                                        required: "Enter is mandatory",
                                        pattern: {
                                            value: /^.{5,10}$/,
                                            message: "Please enter name"
                                        }
                                    })}
                                    className="form-control border-primary"
                                    type="text"
                                    placeholder="Name for the future task"
                                />
                                {errors.price && <span className="text-danger">{errors.price.message}</span>}
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <label className="mb-2">Description</label>
                                <textarea
                                    style={{height: "350px"}}
                                    {...register("description", {
                                        required: "Enter description",
                                        pattern: {
                                            value: /^.+$/, // Only Ukrainian letters, spaces, and dashes
                                            message: "Тільки українські літери, пробіли та тире"
                                        }
                                    })}
                                    className="form-control border-primary align-top"
                                    placeholder="Your original description"
                                />
                                {errors.shop && <span className="text-danger">{errors.shop.message}</span>}



                            </Form.Group>
                            {/* Spacer div for spacing between form and buttons */}
                            <div className="spacer"/>
                            {/* Buttons container */}
                            <div className="d-flex justify-content-end align-items-center mt-3">
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

export default NewTaskModal