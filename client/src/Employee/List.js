import React, { useState } from 'react';
import { OrganizationChart } from 'primereact/organizationchart';
import { Button, Dialog, InputText } from 'primereact';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primereact/resources/primereact.min.css";
import './List.css'; // Import custom styles

export default function List() {
    const [selection, setSelection] = useState([]);
    const [data, setData] = useState([
        {
            expanded: true,
            type: 'person',
            data: {
                image: 'https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png',
                name: 'Amy Elsner',
                title: 'CEO'
            },
            children: [
                {
                    expanded: true,
                    type: 'person',
                    data: {
                        image: 'https://primefaces.org/cdn/primereact/images/avatar/annafali.png',
                        name: 'Anna Fali',
                        title: 'CMO'
                    },
                    children: [
                        {
                            type: 'person',
                            data: {
                                image: 'https://primefaces.org/cdn/primereact/images/avatar/xuxuefeng.png',
                                name: 'Xu Xuefeng',
                                title: 'Head of Sales'
                            }
                        },
                        {
                            type: 'person',
                            data: {
                                image: 'https://primefaces.org/cdn/primereact/images/avatar/johnnycash.png',
                                name: 'Johnny Cash',
                                title: 'Head of Marketing'
                            }
                        }
                    ]
                },
                {
                    expanded: true,
                    type: 'person',
                    data: {
                        image: 'https://primefaces.org/cdn/primereact/images/avatar/stephenshaw.png',
                        name: 'Stephen Shaw',
                        title: 'CTO'
                    },
                    children: [
                        {
                            type: 'person',
                            data: {
                                image: 'https://primefaces.org/cdn/primereact/images/avatar/jennyjones.png',
                                name: 'Jenny Jones',
                                title: 'Lead Developer'
                            }
                        },
                        {
                            type: 'person',
                            data: {
                                image: 'https://primefaces.org/cdn/primereact/images/avatar/lilychang.png',
                                name: 'Lily Chang',
                                title: 'UI/UX Designer'
                            }
                        }
                    ]
                }
            ]
        }
    ]);

    const [showDialog, setShowDialog] = useState(false);
    const [newEmployee, setNewEmployee] = useState({
        name: '',
        title: '',
        image: ''
    });

    const handleAddEmployee = () => {
        const newData = { ...newEmployee, expanded: true, type: 'person' };
        const updatedData = [...data];
        updatedData[0].children.push({
            ...newData
        });

        setData(updatedData);
        setShowDialog(false); // Close the dialog after adding the employee
    };

    const nodeTemplate = (node) => {
        if (node.type === 'person') {
            return (
                <div className="node-card">
                    <img alt={node.data.name} src={node.data.image} className="node-image" />
                    <div className="node-details">
                        <span className="node-name">{node.data.name}</span>
                        <br />
                        <span className="node-title">{node.data.title}</span>
                    </div>
                </div>
            );
        }

        return <span>{node.label}</span>;
    };

   
    return (
        <div className="card overflow-x-auto organization-chart">
            {/* Fixed Add Employee button */}
            <Button 
                label="Add Employee" 
                icon="pi pi-plus" 
                className="add-employee-button"
                onClick={() => setShowDialog(true)} 
            />

            <OrganizationChart
                value={data}
                selectionMode="multiple"
                selection={selection}
                onSelectionChange={(e) => setSelection(e.data)}
                nodeTemplate={nodeTemplate}
                draggable
               
            />

            {/* Dialog for Adding Employee */}
            <Dialog header="Add New Employee" visible={showDialog} onHide={() => setShowDialog(false)}>
                <div className="p-field">
                    <label htmlFor="name">Name</label>
                    <InputText
                        id="name"
                        value={newEmployee.name}
                        onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
                    />
                </div>
                <div className="p-field">
                    <label htmlFor="title">Title</label>
                    <InputText
                        id="title"
                        value={newEmployee.title}
                        onChange={(e) => setNewEmployee({ ...newEmployee, title: e.target.value })}
                    />
                </div>
                <div className="p-field">
                    <label htmlFor="image">Image URL</label>
                    <InputText
                        id="image"
                        value={newEmployee.image}
                        onChange={(e) => setNewEmployee({ ...newEmployee, image: e.target.value })}
                    />
                </div>
                <Button label="Add" icon="pi pi-check" onClick={handleAddEmployee} />
            </Dialog>
        </div>
    );
}
