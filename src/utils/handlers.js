export const handleSelectChangeRhk = (field, propName, setValueFunc, triggerFunc) => (event) => {
    const value = event.target.value;
    field.onChange(event.target.value)
    setValueFunc(propName, value); // Update the form state
    triggerFunc(propName); // Trigger validation
};


export const handleDropdownChangeRhk = (drowndoanList, field, propName, setValueFunc, triggerFunc) => (eventKey)  => {
    const foundKey = Object.keys(drowndoanList).find(key => drowndoanList[key].value === eventKey.value);
    field.onChange(drowndoanList[foundKey])
    setValueFunc(propName, drowndoanList[foundKey]); // Update the form state
    triggerFunc(propName); // Trigger validation
};
