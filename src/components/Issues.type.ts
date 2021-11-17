export type Issues = Issue[];

export type Issue = {
    "project_id":number,
    "due_date":string,
    "id":number,
    "title":string,
    "priority":string,
    "done":boolean,
    "client_id":string,
    "project_client_id":string
    
};

export type Project = {
    title: string,
    id: number,
    active: boolean;
    client_id: string
}[]