import React, {useEffect} from 'react'
import {useForm, Controller} from 'react-hook-form'
import {Modal} from 'react-bootstrap'
import Select from 'react-select'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import {getFormattedDateTime, parseDate} from "../../utils/datetime.js";


const complexityOptions = [
    {value: 'Low', label: 'Low'},
    {value: 'Moderate', label: 'Moderate'},
    {value: 'High', label: 'High'},
]

const priorityOptions = [
    {value: 'Low', label: 'Low'},
    {value: 'High', label: 'High'},
]


const booleanOptions = [
    {value: "0", label: 'False'},
    {value: "1", label: 'True'},
]


function AddEditTemplateModal({isShown, onClose, onSave, initialData = {}}) {
    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: {errors, isValid},
    } = useForm({
        //todo - 1: define expectable object
        mode: 'onChange',
        defaultValues: {
            id: '',
            name: '',
            description: '',
            complexity: '',
            priority: '',
            creationDate: new Date().toISOString(),
            completionDate: null,
            is_template: '',
            completed: 1,
            postponed_status: 0,
            repeated: '0'
        },
    })

    //todo - 2: define data to be retested
    useEffect(() => {
        if (isShown) {
            reset({
                id: initialData?.id || '',
                name: initialData?.name || '',
                description: initialData?.description || '',
                complexity: complexityOptions.find(opt =>
                    opt.value === (initialData?.complexity?.value || initialData?.complexity)
                ) || '',
                priority: priorityOptions.find(opt =>
                    opt.value === (initialData?.priority?.value || initialData?.priority)
                ) || '',
                creationDate: parseDate(initialData?.creation_date) || new Date().toISOString(),
                completionDate: parseDate(initialData?.completion_date) || null,
                is_template: initialData?.is_template || '',
                completed: booleanOptions.find(opt =>
                    opt.value == initialData?.completed) || 1,
                postponed_status: booleanOptions.find(opt =>
                    opt.value == initialData?.postponed_status) || '',
                repeated: initialData?.repeated ?? ''
            })
        }
    }, [isShown, initialData])




    //todo - 3: define to be sent
    const onSubmit = (data) => {
    const formatted = {
        ...data,
        complexity: data.complexity?.value || null,
        priority: data.priority?.value || null,
        postponed_status: data.postponed_status?.value || null,
        description: data.description || null,
        repeated: data.repeated ? parseInt(data.repeated) : 0,
        creation_date: data.creationDate ? getFormattedDateTime(data.creationDate, "D.M.YYYY HH:mm:ss") : null,
        completion_date: data.completionDate ? getFormattedDateTime(data.completionDate, "D.M.YYYY HH:mm:ss") : null,
        completed: data.completed?.value || null,
        is_template: '1'
    }
        onSave(formatted)
        onClose()
    }

    //todo - 4: define your own layout
    return (
        <Modal show={isShown} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>{initialData?.id ? 'Edit Object' : 'Create New Object'}</Modal.Title>
            </Modal.Header>

            <form onSubmit={handleSubmit(onSubmit)}>
                <Modal.Body>
                    {/* ID */}
                    <div className="mb-3">
                        <label className="form-label">ID</label>
                        <input
                            {...register('id')}
                            className="form-control border border-primary"
                            disabled
                        />
                    </div>

                    {/* Name */}
                    <div className="mb-3">
                        <label className="form-label">Name</label>
                        <input
                            {...register('name', {required: 'Name is required'})}
                            className={`form-control border border-primary ${errors.name ? 'is-invalid' : ''}`}
                        />
                        {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
                    </div>

                    {/* Description */}
                    <div className="mb-3">
                        <label className="form-label">Description</label>
                        <input
                            {...register('description')}
                            className={`form-control border border-primary ${errors.description ? 'is-invalid' : ''}`}
                        />
                        {errors.description && (
                            <div className="invalid-feedback">{errors.description.message}</div>
                        )}
                    </div>

                    {/*/!* Checkbox *!/*/}
                    {/*<div className="form-check mb-3">*/}
                    {/*    <input*/}
                    {/*        type="checkbox"*/}
                    {/*        className="form-check-input"*/}
                    {/*        id="isStudent"*/}
                    {/*        {...register('isStudent')}*/}
                    {/*    />*/}
                    {/*    <label className="form-check-label" htmlFor="isStudent">*/}
                    {/*        Is Student*/}
                    {/*    </label>*/}
                    {/*</div>*/}

                    {/* Select with react-select */}
                    <div className="mb-3">
                        <label className="form-label">Priority</label>
                        <Controller
                            name="priority"
                            control={control}
                            rules={{
                                required: 'Priority cannot be empty', // Validation rule
                            }}
                            render={({field}) => (
                                <Select
                                    {...field}
                                    options={priorityOptions}
                                    classNamePrefix="react-select"
                                    placeholder="Select priority"
                                    styles={{
                                        control: (baseStyles, state) => ({
                                            ...baseStyles,
                                            borderColor: state.isFocused ? '' : '#007bff',
                                        }),
                                    }}
                                />
                            )}
                        />
                        {errors.priority && <div className="text-danger">{errors.priority.message}</div>}
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Complexity</label>
                        <Controller
                            name="complexity"
                            control={control}
                            rules={{
                                required: 'Complexity cannot be empty', // Validation rule
                            }}
                            render={({field}) => (
                                <Select
                                    {...field}
                                    options={complexityOptions}
                                    classNamePrefix="react-select"
                                    placeholder="Select complexity"
                                    styles={{
                                        control: (baseStyles, state) => ({
                                            ...baseStyles,
                                            borderColor: state.isFocused ? '' : '#007bff',
                                        }),
                                    }}
                                />
                            )}
                        />
                        {errors.complexity && <div className="text-danger">{errors.complexity.message}</div>}
                    </div>


                    {/* Date Picker */}
                    <div className="mb-3">
                        <label className="form-label w-100">Creation Date</label>
                        <Controller
                            name="creationDate"
                            control={control}
                            // rules={{required: 'Creation date is required'}}
                            render={({field}) => (
                                <DatePicker
                                    selected={field.value}
                                    onChange={field.onChange}
                                    showTimeSelect // Show time selection
                                    timeFormat="HH:mm:ss" // Set time format to "HH:mm:ss"
                                    timeIntervals={1} // Time intervals (1 minute)
                                    dateFormat="dd.MM.yyyy HH:mm:ss" // Custom date and time format
                                    placeholderText="Select a date and time"
                                    className="form-control border border-primary w-100"
                                />

                            )}
                        />
                        {errors.birthDate && <div className="text-danger">{errors.birthDate.message}</div>}
                    </div>

                    <div className="mb-3">
                        <label className="form-label w-100">Completion Date</label>
                        <Controller
                            name="completionDate"
                            control={control}
                            // rules={{required: 'Completion date is required'}}
                            render={({field}) => (
                                <DatePicker
                                    selected={field.value}
                                    onChange={field.onChange}
                                    showTimeSelect // Show time selection
                                    timeFormat="HH:mm:ss" // Set time format to "HH:mm:ss"
                                    timeIntervals={1} // Time intervals (1 minute)
                                    dateFormat="dd.MM.yyyy HH:mm:ss" // Custom date and time format
                                    placeholderText="Select a date and time"
                                    className="form-control border border-primary w-100"
                                />
                            )}
                        />
                        {errors.birthDate && <div className="text-danger">{errors.birthDate.message}</div>}
                    </div>


                    <div className="mb-3">
                        <label className="form-label">Repeated</label>
                        <input
                            {...register('repeated')}
                            className="form-control border border-primary"
                        />
                    </div>


                    <div className="mb-3">
                        <label className="form-label">Completed</label>
                        <Controller
                            name="completed"
                            control={control}
                            render={({field}) => (
                                <Select
                                    {...field}
                                    options={booleanOptions} //simple true false
                                    classNamePrefix="react-select"
                                    placeholder="Select completion"
                                    styles={{
                                        control: (baseStyles, state) => ({
                                            ...baseStyles,
                                            borderColor: state.isFocused ? '' : '#007bff',
                                        }),
                                    }}
                                />
                            )}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Postponed</label>
                        <Controller
                            name="postponed_status"
                            control={control}
                            render={({field}) => (
                                <Select
                                    {...field}
                                    options={booleanOptions}
                                    classNamePrefix="react-select"
                                    placeholder="Select complexity"
                                    styles={{
                                        control: (baseStyles, state) => ({
                                            ...baseStyles,
                                            borderColor: state.isFocused ? '' : '#007bff',
                                        }),
                                    }}
                                />
                            )}
                        />
                    </div>

                </Modal.Body>

                <Modal.Footer>
                    <button type="button" className="btn btn-secondary" onClick={onClose}>
                        Cancel
                    </button>
                    <button type="submit" className="btn btn-primary" disabled={!isValid}>
                        Save
                    </button>
                </Modal.Footer>

            </form>
        </Modal>
    )
}

export default AddEditTemplateModal
