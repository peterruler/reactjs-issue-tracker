const href = window.location.href;
//non https
let resturi = "http://ps007server.herokuapp.com/api/projects";
//https
if (href.indexOf("https://keepitnative.herokuapp.com") > -1) {
    resturi = "https://ps007server.herokuapp.com/api/projects";
} else if (href.indexOf("http://localhost:3000") > -1) {
    //local testing
    resturi = "http://localhost:5000/api/projects";
}
export const REST_URI = resturi;
