// Data and Types
type Person = {
    id: number
    firstName: string
    lastName: string
    departmentId: number
    positionId: number
  }

  export let departmentList: Array<string> = []; // Holds the department names
  export let positionList: Array<string> = []; // Holds the position names
  export let personnelMap:Array<Person> = []; // Holds the personnel objects

  // Fetch Functions (self explanatory)
async function fetchDepartments() {
    const response = await fetch("http://localhost:3000/departments")
    return response.json()
}

async function fetchPositions() {
    const response = await fetch("http://localhost:3000/positions");
    return response.json();
}

async function fetchPersonnel() {
    const response = await fetch("http://localhost:3000/personnel");
    return response.json();
}

// Rendering Functions
// These are used to fill the List/Map arrays with related variables or objects
export async function renderDepartmentList() {
    const data = await fetchDepartments();
    for (let i = 0; i < data.length; i++) {
        departmentList.push(data[i].name)
    }
}

export async function renderPositionList() {
    const data = await fetchPositions();
    for (let i = 0; i < data.length; i++) {
        positionList.push(data[i].name)
    }
}

export async function renderPersonnelMap() {
    const data = await fetchPersonnel();
    data.forEach((person:Person) => {
        personnelMap[person.id] = person;
    })
}