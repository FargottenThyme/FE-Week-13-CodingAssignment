import { personnelMap } from "./dataRetrieval"
import { renderTable, } from "./main"

// Data and Types
type Person = {
    id: number
    firstName: string
    lastName: string
    departmentId: number
    positionId: number
}

export let selectedPerson: Person|null = null; // Used to hold the selected Person object
let firstNameInput: string = (<HTMLInputElement>document.getElementById("employeeFirstName")).value // Used to get the value of the firstName Input
let lastNameInput: string = (<HTMLInputElement>document.getElementById("employeeLastName")).value // Used to get the value of the lastName Input
let departmentInput: number = parseInt((<HTMLSelectElement>document.getElementById("department")).value) // Used to get the option value of the department Select
let positionInput: number = parseInt((<HTMLSelectElement>document.getElementById("position")).value) // Used to get the option value of the position Select

// Buttons
const newPersonBtn = <HTMLButtonElement>document.getElementById("createNewEmployee");
const updatePersonBtn = <HTMLButtonElement>document.getElementById("updateEmployee");

// CRUD Functions
async function onCreateEmployeeClick() { // Posts selectedPerson to the DB and Table
    let newId = personnelMap.length;
    const newPerson = { id: newId, firstName: firstNameInput, lastName: lastNameInput, departmentId: departmentInput, positionId: positionInput }
    await fetch("http://localhost:3000/personnel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPerson)
    })
    renderTable(); // Syncs the Data
}

async function onUpdateEmployeeClick() { // Updates selectedPerson in the DB and Table
    let newFirstName = firstNameInput;
    let newLastName = lastNameInput;
    let newDepartment = departmentInput;
    let newPosition = positionInput;
    console.log(newDepartment + " " + newPosition);
    const updatedPerson = { id: selectedPerson!.id, firstName: newFirstName, lastName: newLastName, departmentId: newDepartment, positionId: newPosition }
    await fetch("http://localhost:3000/personnel/" + selectedPerson!.id, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedPerson)
    })
    newPersonBtn.style.display = "initial";
    updatePersonBtn.style.display = "none";
    setSelectedPerson(null);
    renderTable(); // Syncs the Data
}

export async function onDeleteEmployeeClick() { // Deletes selectedPerson from the DB and Table
    console.log(selectedPerson?.id)
    await fetch("http://localhost:3000/personnel/" + selectedPerson!.id, {
        method: "DELETE"
    })
    personnelMap.splice(selectedPerson!.id, 1);
    setSelectedPerson(null);
    renderTable(); // Syncs the Data
}

// Secondary Functions
export function onButtonUpdateClick() { // Switches button visibility and inserts selected person data into the form
    newPersonBtn.style.display = "none";
    updatePersonBtn.style.display = "initial";
    (<HTMLInputElement>document.getElementById("employeeFirstName")).value = selectedPerson!.firstName;
    (<HTMLInputElement>document.getElementById("employeeLastName")).value = selectedPerson!.lastName;
    (<HTMLSelectElement>document.getElementById("department")).selectedIndex = (selectedPerson!.departmentId - 1);
    (<HTMLSelectElement>document.getElementById("position")).selectedIndex = (selectedPerson!.positionId - 1);
}

export function setSelectedPerson(input:Person|null) { // Sets selectedPerson to the Input
    selectedPerson = input;
}

// Event Listeners
newPersonBtn.addEventListener('click', (event) => {
    onCreateEmployeeClick();
})

updatePersonBtn.addEventListener('click', (event) => {
    onUpdateEmployeeClick();
})

document.getElementById("employeeFirstName")?.addEventListener('change', (event) => {
    firstNameInput = (<HTMLInputElement>document.getElementById("employeeFirstName")).value;
})

document.getElementById("employeeLastName")?.addEventListener('change', (event) => {
    lastNameInput = (<HTMLInputElement>document.getElementById("employeeLastName")).value;
})

document.getElementById("department")?.addEventListener('change', (event) => {
    departmentInput = parseInt((<HTMLSelectElement>document.getElementById("department")).value);
})

document.getElementById("position")?.addEventListener('change', (event) => {
    positionInput = parseInt((<HTMLSelectElement>document.getElementById("position")).value);
})