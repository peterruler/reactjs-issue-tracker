import React from 'react'
import CSS from 'csstype';
import Util from './Util'
import {REST_URI} from './Config';

const makeSelected = (project_id: string | null) => {
    if (project_id == null) return;
    console.log("new project id= " + project_id);
    document.getElementById("updateProjectList")?.click();
    let select = (document.querySelector("#projectSelect") as HTMLSelectElement);
    select.selectedIndex = select.options.length - 1;
    localStorage.setItem("selectedProjectId",project_id);
    select.setAttribute("selected","selected");
}

const handleNewProject = () => {
    makeSelected(localStorage.getItem("selectedProjectId"));
    const util = new Util();
    let inputValue = (document.querySelector(".form-control") as HTMLInputElement).value;
    if (inputValue.length < 3) {
        alert("Bitte Projektname mit mindestens drei Zeichen wählen!")
        return;
    }
    const postData = {
        "client_id": util.uuid(),
        "title": inputValue != null ? inputValue : "",
        "active": true
    }
    //addLoader();
    fetch(REST_URI, {
        method: 'POST', // or 'PUT'
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(postData),
    })
        .then((response) => {
            return response.json();
        })
        .then((result) => {
            //removeLoader();
            if (result) {
                const projects = localStorage.getItem("Projects");
                if (projects) {
                    const proj = JSON.parse(projects);
                    proj.push(result)
                    localStorage.setItem("Projects", JSON.stringify(proj));
                } else {
                    let arr = [];
                    arr.push(result);
                    localStorage.setItem("Projects", JSON.stringify(arr));
                }
                console.log("New project Id = " + result.id);
                localStorage.setItem("selectedProjectId", result.id);
                makeSelected(result.id);
            } else {
                console.error("Request didn't return a result!");
            }
        })

}

export const CreateProject = () => {
    return (
        <>
            <div className="input-group mb-3">
                <input type="text" className="form-control" aria-label="Project Name" id="new-project" name="title" placeholder="" />
                <span onClick={handleNewProject} className="input-group-text input-group-addon btn-success fa fa-plus save_project"></span>
            </div>
        </>
    )
}
