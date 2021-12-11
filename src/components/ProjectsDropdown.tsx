import React, { useState } from 'react'
import CSS from 'csstype';
import { Project } from './Issues.type';

export const ProjectsDropdown = () => {
    function getInitialState() {
        return ['select']
    }
    const [state, setState] = useState(getInitialState());

    const updateProjectList = (e: React.FormEvent) => {
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

    return (
        <>
            {(proj != null) && (
                <>
                    <select onChange={updateProjectList} value={state} id="projectSelect" className="form-select" aria-label="select" multiple>
                        {proj.map((e) => {
                            return <option key={e.id} data-uuid={e.client_id} value={e.id}>{e.title}</option>;

                        })}
                    </select>
                    <button id="updateProjectList" onClick={updateProjectList} style={hiddenBtn}></button>
                </>
            )}
        </>
    )
}
