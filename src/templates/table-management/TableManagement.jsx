import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { Button, Form, InputGroup } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import "./talbeManagement.css";

function TableManagement({
                             tableObj,
                             addHandler,
                             editHandler,
                             removeHandler,
                             doubleClickHandler,  // New prop for handling double-click
                             isFilter = false,
                             filterFields = [],
                             columnConfigs = [], // Custom column configs passed as props
                             excludedFields = [], // <<< new
                         }) {
    const [filterText, setFilterText] = useState("");

    // Filter data based on filterFields and filterText
    const filteredData = React.useMemo(() => {
        if (!isFilter || !filterText) return [...tableObj];
        return tableObj.filter((item) =>
            filterFields.some((field) =>
                item[field]?.toString().toLowerCase().includes(filterText.toLowerCase())
            )
        );
    }, [tableObj, filterText, filterFields, isFilter]);

    const handleRowDoubleClick = (row) => {
        if (doubleClickHandler) {
            doubleClickHandler(row); // Call the handler passed from the parent component
        }
    };

    const baseColumns = Object.keys(tableObj[0])
        .filter((key) => !excludedFields.includes(key)) // <<< exclude specified fields
        .map((key) => {
            const columnConfig = columnConfigs.find(
                (config) => config.name.toLowerCase() === key.toLowerCase()
            );

            return {
                name: key.toUpperCase(),
                selector: row => row[key],
                sortable: true,
                wrap: true,
                width: columnConfig?.width || 'auto',
            };
        });

    // Action column if edit/delete available
    const actionsColumn = {
        name: "Actions",
        cell: (row) => (
            <div className="d-flex gap-2">
                {editHandler && (
                    <Button
                        className="action-button"
                        variant="outline-primary"
                        size="sm"
                        onClick={() => editHandler(row)}
                    >
                        <i className="bi bi-pencil"></i>
                    </Button>
                )}
                {removeHandler && (
                    <Button
                        className="action-button"
                        variant="danger"
                        size="sm"
                        onClick={() => removeHandler(row)}
                    >
                        <i className="bi bi-trash"></i>
                    </Button>
                )}
            </div>
        ),
        ignoreRowClick: true,
        allowOverflow: true,
        button: true,
    };

    const columns = [...baseColumns];
    if (editHandler || removeHandler) {
        columns.push(actionsColumn);
    }

    // Dynamically create customStyles for width and growth
    const customStyles = columns.reduce((acc, col, index) => {
        acc.headCells = acc.headCells || {};
        acc.cells = acc.cells || {};

        // If column has a 'width' property, set both minWidth and maxWidth
        if (col.width) {
            acc.headCells.style = acc.headCells.style || {};
            acc.cells.style = acc.cells.style || {};
            acc.headCells.style.minWidth = col.width;
            acc.headCells.style.maxWidth = col.width;
            acc.cells.style.minWidth = col.width;
            acc.cells.style.maxWidth = col.width;
        }

        return acc;
    }, {});


    return (
        <div className="p-4 table-outline">
            <div className="d-flex justify-content-between align-items-center mb-3">
                {isFilter && (
                    <InputGroup style={{ maxWidth: "300px" }}>
                        <Form.Control
                            placeholder="Filter..."
                            value={filterText}
                            onChange={(e) => setFilterText(e.target.value)}
                        />
                    </InputGroup>
                )}

                {addHandler && (
                    <Button style={{ marginRight: "20px" }}
                            className="action-button"
                            size="sm"
                            variant="success" onClick={addHandler}>
                        <i className="bi bi-plus"></i>
                    </Button>
                )}
            </div>

            <DataTable
                columns={columns}
                data={filteredData}
                pagination
                highlightOnHover
                dense
                customStyles={customStyles}
                onRowDoubleClicked={doubleClickHandler}
            />
        </div>
    );
}

export default TableManagement;
