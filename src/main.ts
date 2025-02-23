import "bootstrap/dist/js/bootstrap.bundle.js"
import "bootstrap/dist/css/bootstrap.min.css"
import { departmentList, positionList, personnelMap, 
  renderDepartmentList, renderPositionList, renderPersonnelMap} from "./dataRetrieval"
import { selectedPerson, setSelectedPerson, onDeleteEmployeeClick, onButtonUpdateClick } from "./crudActions"

// Data and Types
type Person = {
  id: number
  firstName: string
  lastName: string
  departmentId: number
  positionId: number
}

const table = <HTMLTableElement>document.getElementById("employeeDataTable"); // Retrieves the table element
let firstNameInput:string|null = (<HTMLInputElement>document.getElementById("employeeFirstName")).value // Used to get the value of the firstName Input
let lastNameInput:string = (<HTMLInputElement>document.getElementById("employeeLastName")).value // Used to get the value of the lastName Input
let departmentInput:number = parseInt((<HTMLSelectElement>document.getElementById("department")).value) // Used to get the option value of the department Select
let positionInput:number = parseInt((<HTMLSelectElement>document.getElementById("position")).value) // Used to get the option value of the position Select

// Table Rendering Functions
function renderTableData() {
    setSelectedPerson(null);
    // Clear the Form
    firstNameInput = ""
    lastNameInput = ""
    departmentInput = 1
    positionInput = 1
    // Clear the table
    table.innerHTML =
        `<tr>
            <th>Department</th>
            <th>Position</th>
            <th>Employee Id</th>
            <th>Name</th>
            <th>Options</th>
        </tr>`;
    personnelMap.forEach((person) => { // Iterates through each object within the personnelMap array
        // creates, inserts, and populates a row with the relevant data
        const newRow:HTMLTableRowElement = table.insertRow(1);
        newRow.setAttribute('id', `row${person.id}`);
        newRow.insertCell(0).innerHTML = matchDepartment(person.departmentId);
        newRow.insertCell(1).innerHTML = matchPosition(person.positionId);
        newRow.insertCell(2).innerHTML = person.id.toString();
        newRow.insertCell(3).innerHTML = fullName(person.firstName, person.lastName);
        let opt = newRow.insertCell(4);
        opt.appendChild(addDeleteBtn(person));
        opt.appendChild(addUpdateBtn(person));;
    })
    console.log("Table Data Successfully Rendered") // Used to show functionality
}

function matchDepartment(departmentId:number) { // Used to find the new departmentList index
  let id = departmentId - 1;
  return departmentList[id];
}

function matchPosition(positionId:number) { // Used to find the new positionList index
  let id = positionId - 1;
  return positionList[id];
}

function fullName(firstName:string, lastName:string) { // Used to concatenate the first and last names for the table
  let fullName = firstName + " " + lastName;
  return fullName;
}

function addDeleteBtn(person:Person) { // Creates a button element to be placed within the "Options" column of the table
    let btnD = document.createElement("button");
    btnD.className = "btn btn-danger mx-2";
    btnD.id = `btnD${person.id}`;
    btnD.innerHTML = "Terminate";
    btnD.onclick = () => {
        setSelectedPerson(person);
        console.log(`Deleting Employee with id = ${selectedPerson!.id}`);
        onDeleteEmployeeClick();
        let elementToDelete = <HTMLTableRowElement>document.getElementById(`row${selectedPerson!.id}`);
        elementToDelete.parentNode!.removeChild(elementToDelete);
    }

    return btnD;
}

function addUpdateBtn(person:Person) { // Creates a button element to be placed within the "Options" column of the table
    let btnU = document.createElement("button");
    btnU.className = "btn btn-secondary mx-2";
    btnU.id = `btnU${person.id}`;
    btnU.innerHTML = "Update";
    btnU.onclick = () => {
        setSelectedPerson(person);
        onButtonUpdateClick();
    }

    return btnU;
}

export async function renderTable() { // Renders the Table
    await renderPersonnelMap();
    renderTableData();
}

// Application
async function startApp() {
    await renderDepartmentList();
    await renderPositionList();
    await renderTable();
}

startApp();