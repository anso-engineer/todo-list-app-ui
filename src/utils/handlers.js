export const handleSelectChangeRhk = (field, propName, setValueFunc, triggerFunc) => (event) => {
    const value = event.target.value;
    field.onChange(event.target.value)
    setValueFunc(propName, value); // Update the form state
    triggerFunc(propName); // Trigger validation
};


export const handleDropdownChangeRhk = (drowndoanList, field, propName, setValueFunc, triggerFunc) => (eventKey)  => {
    const value = Object.keys(drowndoanList).find(key => drowndoanList[key] === eventKey);
    field.onChange(value)
    setValueFunc(propName, value); // Update the form state
    triggerFunc(propName); // Trigger validation
};
