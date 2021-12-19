import React, { useState, useEffect } from 'react'
import CSS from 'csstype';
import { Project } from './Issues.type';

export const ProjectsDropdown = () => {
    function getInitialState() {
        return ['select']
    }
    const [state, setState] = useState(getInitialState());

    useEffect(()=> {
        const project_id = localStorage.getItem("selectedProjectId");
        let select = (document.querySelector("#projectSelect") as HTMLSelectElement);
        if(project_id) {
            select.value = project_id;
            select.setAttribute("selected","selected");
        }
        let valueExists = false;
        for (let i = 0; i < select.length; ++i){//Check if value exists as option
            if (select.options[i].value === project_id){
              valueExists = true;
            }
        }
        if(!valueExists){//case value in storage doen't exist in select option
            select.selectedIndex = select.options.length - 1;//set last element selected
            select.setAttribute("selected","selected");
        }
    });

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
