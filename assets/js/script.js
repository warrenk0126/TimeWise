
const quotesApiKey = '6hjR+Z+iplIV9VL+StaaLg==jQnN6wcPkiNSWZDy';



async function loadWeatherAndQuote() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async position => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            const weatherData = await getWeatherDataByLocation(latitude, longitude);
            displayCurrentWeather(weatherData);

            const category = 'happiness';
            const quoteResponse = await fetch(`https://api.api-ninjas.com/v1/quotes?category=${category}`, {
                headers: {
                    'X-Api-Key': quotesApiKey
                }
            });

            if (quoteResponse.ok) {
                const quoteData = await quoteResponse.json();
                const quote = quoteData[0].quote;
                const author = quoteData[0].author;
                /* document.getElementById("motivationalQuote").textContent = `"${quote}" - ${author}`; */
                document.getElementById("motivationalQuote").innerHTML =
                                         `<p>Quote:</p>
                                         <q>${quote}</q> <cite>- ${author}</cite>`;
            } else {
                console.error('Error en la respuesta de la API de citas:', quoteResponse.statusText);
            }
        }, error => {
            console.error(error);
        });
    } else {
        console.error('La geolocalización no es compatible con este navegador.');
    }
}


const addTaskButton = document.getElementById("addTaskButton");
const modal = document.getElementById("modal");
const saveTaskButton = document.getElementById("saveTask");
const taskNameInput = document.getElementById("taskName");
const prioritySelect = document.getElementById("priority");
const statusSelect = document.getElementById("status");
const taskList = document.getElementById("taskList");


addTaskButton.addEventListener("click", () => {
    modal.classList.remove("hidden");
});

saveTaskButton.addEventListener("click", () => {
    const taskName = taskNameInput.value;
    const priority = prioritySelect.value;
    const status = statusSelect.value;

    if (taskName) {
        const taskElement = document.createElement("div");
        taskElement.classList.add("bg-white", "p-4", "rounded", "shadow-md", "flex", "justify-between");
        taskElement.innerHTML = `
            <div>
                <h3 class="text-lg font-semibold">${taskName}</h3>
                <p class="text-sm">${priority}</p>
                <p class="text-sm">${status}</p>
            </div>
            <button class="bg-blue-500 text-white py-1 px-2 rounded edit-button">Edit</button>
            <button class="bg-red-500 text-white py-1 px-2 rounded delete-button">Delete</button>
        `;
        taskList.appendChild(taskElement);

        modal.classList.add("hidden");
        taskNameInput.value = "";
        prioritySelect.value = "most_important";
        statusSelect.value = "not_started";
    }
});

taskList.addEventListener("click", (event) => {
    if (event.target.classList.contains("edit-button")) {
        console.log("Edit button clicked");
    } else if (event.target.classList.contains("delete-button")) {
        const taskElement = event.target.parentElement;
        taskList.removeChild(taskElement);
    }
});

taskList.addEventListener("click", (event) => {
    if (event.target.classList.contains("edit-button")) {
        const taskElement = event.target.parentElement;
        const taskName = taskElement.querySelector("h3").textContent;
        const priority = taskElement.querySelector(".text-sm:nth-child(2)").textContent;
        const status = taskElement.querySelector(".text-sm:last-child").textContent;

        const editTaskNameInput = document.getElementById("editTaskName");
        const editPrioritySelect = document.getElementById("editPriority");
        const editStatusSelect = document.getElementById("editStatus");

        editTaskNameInput.value = taskName;
        editPrioritySelect.value = priority.toLowerCase().replace(' ', '_');
        editStatusSelect.value = status.toLowerCase().replace(' ', '_');

        const editModal = document.getElementById("editModal");
        editModal.classList.remove("hidden");

        const updateTaskButton = document.getElementById("updateTask");
        updateTaskButton.addEventListener("click", () => {
            const updatedTaskName = editTaskNameInput.value;
            const updatedPriority = editPrioritySelect.value;
            const updatedStatus = editStatusSelect.value;

            if (updatedTaskName) {
                taskElement.querySelector("h3").textContent = updatedTaskName;
                taskElement.querySelector(".text-sm:nth-child(2)").textContent = updatedPriority.replace('_', ' ');
                taskElement.querySelector(".text-sm:last-child").textContent = updatedStatus.replace('_', ' ');


                editModal.classList.add("hidden");
            }
        });
    } else if (event.target.classList.contains("delete-button")) {
        const taskElement = event.target.parentElement;
        taskList.removeChild(taskElement);
    }
});


window.addEventListener('load', loadWeatherAndQuote);

const addNoteButton = document.getElementById("addNoteButton");
const noteModal = document.getElementById("noteModal");
const saveNoteButton = document.getElementById("saveNote");
const noteTextarea = document.getElementById("noteTextarea");
const typeSelect = document.getElementById("type");
const notesAndIdeasList = document.getElementById("notesAndIdeasList");

addNoteButton.addEventListener("click", () => {
    noteModal.classList.remove("hidden");
});

saveNoteButton.addEventListener("click", () => {
    const noteText = noteTextarea.value;
    const type = typeSelect.value;

    if (noteText) {
        const noteElement = document.createElement("div");
        noteElement.classList.add("bg-white", "p-4", "rounded", "shadow-md", "flex", "justify-between");
        noteElement.innerHTML = `
            <div>
                <p class="text-lg">${noteText}</p>
                <p class="text-sm">${type}</p>
            </div>
            <button class="bg-blue-500 text-white py-1 px-2 rounded edit-button">Edit</button>
            <button class="bg-red-500 text-white py-1 px-2 rounded delete-button">Delete</button>
        `;
        notesAndIdeasList.appendChild(noteElement);

        noteModal.classList.add("hidden");
        noteTextarea.value = "";
        typeSelect.value = "note";
    }
});

notesAndIdeasList.addEventListener("click", (event) => {
    if (event.target.classList.contains("edit-button")) {
        const noteElement = event.target.parentElement;
        const noteTextElement = noteElement.querySelector(".text-lg");
        const typeElement = noteElement.querySelector(".text-sm");

        const editNoteTextarea = document.getElementById("editNoteTextarea");
        const editTypeSelect = document.getElementById("editType");

        editNoteTextarea.value = noteTextElement.textContent;
        editTypeSelect.value = typeElement.textContent;

        const editNoteModal = document.getElementById("editNoteModal");
        editNoteModal.classList.remove("hidden");

        const updateNoteButton = document.getElementById("updateNote");
        updateNoteButton.addEventListener("click", () => {
            const updatedNoteText = editNoteTextarea.value;
            const updatedType = editTypeSelect.value;

            if (updatedNoteText) {
                noteTextElement.textContent = updatedNoteText;
                typeElement.textContent = updatedType;

                editNoteModal.classList.add("hidden");
            }
        });
    } else if (event.target.classList.contains("delete-button")) {
        const noteElement = event.target.parentElement;
        notesAndIdeasList.removeChild(noteElement);
    }
});







