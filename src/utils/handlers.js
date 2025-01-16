export const handleSelectChangeRhk = (selectList, field, propName, setValueFunc, triggerFunc) => (eventKey) => {
    const foundKey = Object.keys(selectList).find((key) => selectList[key].value === eventKey.value);
    field.onChange(selectList[foundKey]);
    setValueFunc(propName, selectList[foundKey]); // Update form state
    triggerFunc(propName); // Trigger validation
};

export const handleDropdownChangeRhk = (drowndoanList, field, propName, setValueFunc, triggerFunc) => (eventKey)  => {
    const foundKey = Object.keys(drowndoanList).find(key => drowndoanList[key].value === eventKey.value);
    field.onChange(drowndoanList[foundKey])
    setValueFunc(propName, drowndoanList[foundKey]); // Update the form state
    triggerFunc(propName); // Trigger validation
};
