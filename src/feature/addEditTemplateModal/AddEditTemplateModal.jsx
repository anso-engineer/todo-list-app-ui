import React, {useEffect} from 'react'
import {useForm, Controller} from 'react-hook-form'
import {Modal} from 'react-bootstrap'
import Select from 'react-select'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import 'bootstrap/dist/css/bootstrap.min.css'

const cityOptions = [
    {value: 'kyiv', label: 'Kyiv'},
    {value: 'lviv', label: 'Lviv'},
    {value: 'odesa', label: 'Odesa'},
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
            isStudent: false,
            city: null,
            birthDate: null,
        },
    })

    //todo - 2: define data to be retested
    useEffect(() => {
        if (isShown) {
            reset({
                id: initialData?.id || '',
                name: initialData?.name || '',
                description: initialData?.description || '',
                isStudent: initialData?.isStudent || false,
                city: initialData?.city
                    ? cityOptions.find((opt) => opt.value === initialData.city)
                    : null,
                birthDate: initialData?.birthDate ? new Date(initialData.birthDate) : null,
            })
        }
    }, [isShown]) // no reset inside deps, avoids infinite loop


    //todo - 3: define to be sent
    const onSubmit = (data) => {
        const formatted = {
            ...data,
            city: data.city?.value || null,
            birthDate: data.birthDate?.toISOString() || null,
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
                            {...register('description', {required: 'Description is required'})}
                            className={`form-control border border-primary ${errors.description ? 'is-invalid' : ''}`}
                        />
                        {errors.description && (
                            <div className="invalid-feedback">{errors.description.message}</div>
                        )}
                    </div>

                    {/* Checkbox */}
                    <div className="form-check mb-3">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            id="isStudent"
                            {...register('isStudent')}
                        />
                        <label className="form-check-label" htmlFor="isStudent">
                            Is Student
                        </label>
                    </div>

                    {/* Select with react-select */}
                    <div className="mb-3">
                        <label className="form-label">City</label>
                        <Controller
                            name="city"
                            control={control}
                            rules={{required: 'City is required'}}
                            render={({field}) => (
                                <Select
                                    {...field}
                                    options={cityOptions}
                                    classNamePrefix="react-select"
                                    styles={{
                                        control: (baseStyles, state) => ({
                                            ...baseStyles,
                                            borderColor: state.isFocused ? '' : '#007bff',
                                        }),
                                    }}

                                />
                            )}
                        />
                        {errors.city && <div className="text-danger">{errors.city.message}</div>}
                    </div>

                    {/* Date Picker */}
                    <div className="mb-3">
                        <label className="form-label w-100">Birth Date</label>
                        <Controller
                            name="birthDate"
                            control={control}
                            rules={{required: 'Birth date is required'}}
                            render={({field}) => (
                                <DatePicker
                                    selected={field.value}
                                    onChange={field.onChange}
                                    className="form-control border border-primary w-100"
                                    dateFormat="dd.MM.yyyy"
                                    placeholderText="Select date"
                                />

                            )}
                        />
                        {errors.birthDate && <div className="text-danger">{errors.birthDate.message}</div>}
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
