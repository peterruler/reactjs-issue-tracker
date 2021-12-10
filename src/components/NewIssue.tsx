import CSS from 'csstype';
import { Issue } from './Issues.type';
import Util from './Util'
import { REST_URI } from './Config';

const addToIssueList = (result: (Issue | null)) => {
    if (result) {
        const issues = localStorage.getItem("IssuesFiltered");
        if (issues) {
            const allIssues = JSON.parse(issues);
            allIssues.push(result)
            localStorage.setItem("IssuesFiltered", JSON.stringify(allIssues));
        } else {
            let arr = [];
            arr.push(result);
            localStorage.setItem("IssuesFiltered", JSON.stringify(arr));
        }
        document.getElementById("updateIssuesList")?.click();
    }
}

const handleNewIssue = () => {
    let selectedDate = (document.querySelector("#datepicker") as HTMLInputElement).value;
    let selectedProjectId = localStorage.getItem("selectedProjectId");
    let priority = (document.getElementById("priority") as HTMLInputElement).value;
    let date = (document.getElementById("datepicker") as HTMLInputElement).value;
    let issueTitle = (document.getElementById("new-issue") as HTMLInputElement).value;
    let util = new Util();

    if (!priority || !issueTitle || !util.isValidDate(date)) {
        alert("Bitte Issue Formular ausfüllen.");
        return;
    }
    const postData = {
        "client_id": util.uuid(),
        "project_id": selectedProjectId,
        "done": false,
        "title": issueTitle,
        "due_date": selectedDate,
        "priority": priority + ""
    }
    if (!selectedProjectId || parseInt(selectedProjectId) < 1) {
        alert("Bitte erst Projekt erstellen oder auswählen! ID= " + selectedProjectId);
        return;
    }
    //addLoader();
    fetch(`${REST_URI}/${selectedProjectId}/issues`, {
        method: 'POST', // or 'PUT'
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(postData),
    })
        .then((response) => {
            if (response === undefined) {
                alert("Due to an error, issue wasn't saved");
            }
            return response.json();
        })
        .then((result) => {
            //removeLoader();
            if (result) {
                const issues = localStorage.getItem("Issues");
                if (issues) {
                    const allIssues = JSON.parse(issues);
                    allIssues.push(result)
                    localStorage.setItem("Issues", JSON.stringify(allIssues));
                } else {
                    let arr = [];
                    arr.push(result);
                    localStorage.setItem("Issues", JSON.stringify(arr));
                }
                addToIssueList(result);

                emptyNewIssueInputs();

            } else {
                console.error("Request didn't return a result!");
            }
        });
    const emptyNewIssueInputs = () => {
        (document.getElementById("priority") as HTMLInputElement).value = "";
        (document.getElementById("datepicker") as HTMLInputElement).value = "";
        (document.getElementById("new-issue") as HTMLInputElement).value = ""
    }
}
export const NewIssue = () => {
    const newIssueStyle: CSS.Properties = {
        paddingTop: 0,
    };
    return (
        <div style={newIssueStyle}>
            <div className="newIssue d-flex">
                <div className="checkbox d-none"><label>
                    <input className="checkbox" name="done" placeholder="" /> Erledigt </label>
                </div>
                <div className="col-sm-12 col-md-2">
                    <div className="input-group mb-1">
                        <label className="white-txt pull-left sr-only priority" htmlFor="priority">Wähle Priorität</label>
                        <select name="priority" id="priority" className="form-control">
                            <option value="">Prio...</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                        </select>
                    </div>
                </div>
                <div className="col-sm-12 col-md-4">
                    <div className="form-group datepicker-div">
                        <label htmlFor="datepicker" className="sr-only">Datepicker</label>
                        <input name="due_date" type="date" data-date-format="YYYY-MM-DD" title="This field is required" className="form-control hasDatepicker" id="datepicker" placeholder="" />
                    </div>
                </div>
                <div className="col-sm-12 col-md-6">
                    <div className="input-group mb-3">
                        <input type="text" className="form-control issueTitle" aria-label="Project Name" id="new-issue" name="title" placeholder="Issuename" />
                        <span onClick={handleNewIssue} className="input-group-text input-group-addon btn-success fa fa-plus save_project"></span>
                    </div>
                </div>
            </div>
        </div>
    )
}
