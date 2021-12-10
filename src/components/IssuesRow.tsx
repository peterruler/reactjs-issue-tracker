import React, { useState, useEffect } from "react"
import { REST_URI } from './Config';

export const IssuesRow = (props: any) => {
    const [checked1, setChecked1] = useState(false);

    useEffect(() => {
        setChecked1(props.done);
    }, [props.done])

    const onChange = (e: React.FormEvent) => {
        let element = (e.target as HTMLInputElement);
        let checked = element.checked;
        let id = element.getAttribute("data-id");
        let issueTitle = element.getAttribute("data-title");
        let dueDate = element.getAttribute("data-due-date");
        let priority = element.getAttribute("data-priority");
        let currentProjecId = localStorage.getItem("selectedProjectId");
        const putData = {
            "client_id": id,
            "done": checked,
            "project_id": currentProjecId,
            "title": issueTitle,
            "due_date": dueDate,
            "priority": priority + ""
        }
        //addLoader();
        fetch(`${REST_URI}/${currentProjecId}/issues/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify(putData),
        })
            .then((response) => {
                return response.json();
            })
            .then((result) => {
                if (result) {
                    let issues = localStorage.getItem("Issues");
                    if (issues) {
                        let arr1: any = [];
                        const allIssues = JSON.parse(issues);
                        allIssues.filter((elem: any) => {

                            if (elem.id == id) {
                                result.done = checked;
                                arr1.push(result);
                            } else {
                                arr1.push(elem);
                            }
                            return elem;
                        });
                        localStorage.setItem("Issues", JSON.stringify(arr1));
                        let issuesSelected = localStorage.getItem("IssuesFiltered");
                        if (issuesSelected) {
                            let arr: any = [];
                            const allIssues2 = JSON.parse(issuesSelected);
                            allIssues2.filter((elem: any) => {
                                if (elem.id == id) {
                                    result.done = checked;
                                    arr.push(result);
                                } else {
                                    arr.push(elem);
                                }
                                return elem;
                            });
                            localStorage.setItem("IssuesFiltered", JSON.stringify(arr));
                        }
                        document.getElementById("updateIssuesList")?.click();
                    }
                }
            });
        setChecked1(checked);
    }
    const handleDeleteClick = (e: React.FormEvent) => {
        let button = (e.currentTarget as HTMLInputElement);
        let id: any = button.getAttribute('data-id');

        if (!id) {
            console.error("Delete id= " + id + " " + document.getElementById(button.id)?.getAttribute("data-id"))
            return;
        }
        let project_id = localStorage.getItem("selectedProjectId");
        //addLoader();
        fetch(`${REST_URI}/${project_id}/issues/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
        })
            .then((response) => {
                return response.json();
            })
            .then((result) => {
                let issues = localStorage.getItem("Issues");
                if (issues) {
                    let arr1: any = [];
                    const allIssues = JSON.parse(issues);
                    allIssues.filter((elem: any) => {
                        if (elem.id != id) {
                            arr1.push(elem);
                        }
                        return elem;
                    });
                    localStorage.setItem("Issues", JSON.stringify(arr1));
                }

                let issuesFiltered = localStorage.getItem("IssuesFiltered");
                if (issuesFiltered) {
                    let arr2: any = [];
                    const allIssues = JSON.parse(issuesFiltered);
                    allIssues.filter((elem: any) => {
                        if (elem.id != id) {
                            arr2.push(elem);
                        }
                        return elem;
                    });
                    localStorage.setItem("IssuesFiltered", JSON.stringify(arr2));
                }
                document.querySelector("#btn-" + id)?.parentElement?.parentElement?.remove();
                document.getElementById("updateIssuesList")?.click();
            });

    }
    const formatDate = (input: string) => {
        if (typeof input === 'undefined') {
            return '';
        }
        let datePart = input.split("-");
        let day = datePart[datePart.length - 1];
        let month = datePart[datePart.length - 2];
        let year = datePart[0];
        return day + '.' + month + '.' + year;
    }

    const CheckedCheck = (props: any, checked: any) => {
        let formattedDate = formatDate(props.argument.duedate);
            return (<>
                {(props.priority !== 'undefined') && (
                    <>
                        <div className={props.checked ? 'rTableCell  strikethrough-done-row' : 'rTableCell '}> {props.argument.title} </div>
                        <div className={props.checked ? 'rTableCell  strikethrough-done-row' : 'rTableCell '}> {props.argument.priority} </div>
                        <div className={props.checked ? 'rTableCell due-date-output strikethrough-done-row' : 'rTableCell due-date-output'}>{formattedDate}</div>
                    </>
                )
                }
            </>
            )
    }
    return (
        <>
            <div className="rTable issues-ul">
                <div className="rTableRow list-item " id={'checked-' + props.id}>
                    {(typeof props.priority !== 'undefined') && (
                        <div className="rTableCell">
                            <input type="checkbox"
                                onChange={onChange} checked={checked1} className="checkbox" name="done-list"
                                data-id={props.id}
                                data-priority={props.priority}
                                data-due-date={props.duedate}
                                data-title={props.title}
                            />
                        </div>
                    )}
                    <CheckedCheck argument={props} checked={checked1 || props.checked} />

                    {(typeof props.priority !== 'undefined') && (
                        <div className="rTableCell lastCell">
                            <button type="button" id={`btn-${props.id}`} data-id={props.id} onClick={handleDeleteClick} className="delete_issue">
                                <i className="fa fa-trash fa-3" aria-hidden="true"></i>
                            </button>
                        </div>

                    )}
                    <div className="rTableCell "> </div>
                    <input type="hidden" id="id" name="id" value={props.id} />
                    <input type="hidden" id="title" name="title" value="tst" />
                    <input type="hidden" id="client_id" name="client_id" value={props.client_id} />
                    <input type="hidden" id="project_id" name="project_id" value={props.project_id} />
                    <input type="hidden" id="priority" name="priority" value={props.priority} />
                    <input type="hidden" id="due_date" name="due_date" value={props.duedate} />
                </div>
            </div>
        </>
    )
}
