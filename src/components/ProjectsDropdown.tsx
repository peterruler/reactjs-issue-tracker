import React, { useState } from 'react'
import CSS from 'csstype';
import {Project} from './Issues.type';

export const ProjectsDropdown = () => {
    function getInitialState() {
        return ['select']
    }
    const [state, setState] = useState(getInitialState());

    const handleChange = (e: React.FormEvent) => {
        let projectIdOptionValue = (e.target as HTMLTextAreaElement).value;
        setState([projectIdOptionValue]);
        localStorage.setItem("selectedProjectId", projectIdOptionValue);
        document.getElementById("updateIssuesList")?.click();
    }
    let proj: (Project | null);
    proj = JSON.parse(localStorage.getItem("Projects") || "[{}]");
    if (proj == null) {
        proj = [{
            title: "",
            id: 0,
            active: false,
            client_id: ""
        }];
    }
    const hiddenBtn: CSS.Properties = {
        display: "none",
    };
    const updateProjectList = (e: React.FormEvent) => {
        handleChange(e);
    }
    return (
        <>
            <select onChange={handleChange} value={state} id="projectSelect" className="form-select" multiple aria-label="multiple select example">
                <option key={-1} data-uuid="" value="0">Projekt wählen...</option>;
                {proj.map((e) => {
                    return <option key={e.id} data-uuid={e.client_id} value={e.id}>{e.title}</option>;

                })}
            </select>
            <button id="updateProjectList" onClick={updateProjectList} style={hiddenBtn}></button>
        </>
    )
}
