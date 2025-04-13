import {Button, Form, Modal} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {
    dropState,
    selectIsShown,
} from "./templateMainModalSlice.js";
import {Controller, useForm} from "react-hook-form";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import './templateMainModal.css'
import TableManagement from "../../templates/table-management/TableManagement.jsx";



function TemplateMainModal() {

    const isShown = useSelector(selectIsShown)
    const dispatch = useDispatch();


    const users = [
        { id: 1, name: "Jose", role: "Admin" },
        { id: 2, name: "Yuana", role: "User" },
        { id: 3, name: "Christina", role: "User" },
    ];

    // Define column configurations with at least 30px width for each column
    const columnConfigs = [
        {
            name: 'id',
            width: '60px', // Single width for id column
        },
        {
            name: 'name',
            width: '300px', // Single width for name column
        },
        {
            name: 'role',
            width: '280px', // Single width for role column
        },
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
                        <TableManagement
                            tableObj={users}
                            addHandler={() => console.log("Add")}
                            editHandler={(item) => console.log("Edit", item)}
                            removeHandler={(item) => console.log("Remove", item)}
                            isFilter={true}
                            filterFields={["name", "role"]}
                            columnConfigs={columnConfigs} // Pass custom column configurations here
                        />
                    </Modal.Body>
                {/*</Modal.Dialog>*/}
            </Modal>
        </div>
    )
}

export default TemplateMainModal