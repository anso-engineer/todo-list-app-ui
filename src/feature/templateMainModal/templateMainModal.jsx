import {Button, Form, Modal} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {
    dropState, selectAllTemplates,
    selectIsShown,
} from "./templateMainModalSlice.js";
import {Controller, useForm} from "react-hook-form";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import './templateMainModal.css'
import TableManagement from "../../templates/table-management/TableManagement.jsx";
import {useEffect, useState} from "react";
import {deleteTask, getAllTasks} from "../tasks/taskActions.js";
import {getAllTemplates} from "./templateMainModalAction.js";


function TemplateMainModal() {

    const isShown = useSelector(selectIsShown)
    const dispatch = useDispatch();

    dispatch(getAllTemplates())
    const templates = useSelector(selectAllTemplates)
    const [renderedTemplates, setRenderedTemplates] = useState([])

    useEffect(() => {
        if (templates == []) return;

        const reorderedTasksObj = templates.map(({
                                                     id,
                                                     name,
                                                     is_template,
                                                     creation_date,
                                                     completion_date,
                                                     complexity,
                                                     priority,
                                                     description,
                                                     repeated
                                                 }) => ({
            id,
            name,
            description,
            is_template,
            complexity,
            priority,
            creation_date,
            completion_date,
            repeated
        }));


        setRenderedTemplates(reorderedTasksObj);
    }, [templates]);


    // Define column configurations with at least 30px width for each column
    const columnConfigs = [
        {
            name: 'ID',
            width: '60px', // Single width for id column
        },
        {
            name: 'name',
            width: '100px', // Single width for name column
        },
        {
            name: 'description',
            width: '150px', // Single width for role column
        },
        {
            name: 'is_template',
            width: '120px', // Single width for role column
        },
        {
            name: 'complexity',
            width: '120px', // Single width for role column
        },
        {
            name: 'priority',
            width: '120px', // Single width for role column
        },
        {
            name: 'creation_date',
            width: '130px', // Single width for role column
        },
        {
            name: 'completion_date',
            width: '130px', // Single width for role column
        },
        {
            name: 'repeated',
            width: '120px', // Single width for role column
        }
    ];

    function handleClose() {
        dispatch(dropState())
    }


    return (
        <div>
            <Modal show={isShown}
                   onHide={handleClose}
                   dialogClassName="template-main-modal-dialog"
                   contentClassName="template-main-modal-content"
                   hea
                   centered>
                {/*<Modal.Dialog>*/}
                <Modal.Header closeButton>
                    <Modal.Title>Manage templates</Modal.Title>
                </Modal.Header>
                <Modal.Body
                >
                    {renderedTemplates.length > 0 ? (
                        <TableManagement
                            tableObj={renderedTemplates}
                            addHandler={() => console.log("Add")}
                            editHandler={(item) => console.log("Edit", item)}
                            removeHandler={(item) => {
                                dispatch(deleteTask(item))
                                }
                            }
                            isFilter={true}
                            filterFields={["name", "description"]}
                            columnConfigs={columnConfigs}
                        />
                    ) : (
                        <div>No templates available</div>
                    )}
                </Modal.Body>
                {/*</Modal.Dialog>*/}
            </Modal>
        </div>
    )
}

export default TemplateMainModal