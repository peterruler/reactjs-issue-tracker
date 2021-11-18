import { useState } from 'react'
import CSS from 'csstype';
import { IssuesRow } from './IssuesRow'
import { Issues } from './Issues.type';

export const IssuesList = () => {

    const hiddenBtn: CSS.Properties = {
        display: "none",
    };

    let defaultIssuesList = [{
        "project_id": 0,
        "due_date": "",
        "id": -1,
        "title": "",
        "priority": "",
        "done": false,
        "client_id": "",
        "project_client_id": ""
    }]
    const [, setIssuesList] = useState(defaultIssuesList);
    let issuesArray: Issues;
    let arr: Issues = [];

    const updateIssueList = () => {
        let issuesArray: Issues;
        issuesArray = JSON.parse(localStorage.getItem("Issues") || "[{}]");
        let currentProjecId = localStorage.getItem("selectedProjectId");
        if (issuesArray == null) {
            issuesArray = defaultIssuesList;
        } else {
            issuesArray.filter((elem) => {
                if (elem.project_id + "" === currentProjecId + "") {
                    arr.push(elem);
                }
                return elem;
            });
        }
        localStorage.setItem("IssuesFiltered", JSON.stringify(arr));
        setIssuesList(arr);
        console.info("Managed Issue List View has been updated")
    }
    issuesArray = JSON.parse(localStorage.getItem("IssuesFiltered") || "[{}]");
    return (
        <>
            <div className="rTable headings">
                <div className="rTableRow">
                    <div className="rTableHead">Erledigt</div>
                    <div className="rTableHead">Name</div>
                    <div className="rTableHead">Priorität</div>
                    <div className="rTableHead">Fällig am</div>
                    <div className="rTableCell invisible"></div>
                </div>
            </div>
            <div className="listWrapper">
                {issuesArray.map((e, index) => {
                    return <IssuesRow
                        key={index}
                        project-id={e.project_id}
                        duedate={e.due_date}
                        id={e.id}
                        title={e.title}
                        priority={e.priority}
                        done={e.done}
                        client-id={e.client_id}
                        project-client-id={e.project_client_id}
                        checked={e.done}
                        onClick={updateIssueList}
                    />;
                })}
            </div>
            <button id="updateIssuesList" onClick={updateIssueList} style={hiddenBtn}></button>

        </>
    )
}
