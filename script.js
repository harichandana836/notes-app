document.addEventListener("DOMContentLoaded", loadNotes);
function addNote() {
    const input = document.getElementById("noteInput");

    if (input.value.trim() === "") return;

    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes.push(input.value);
    localStorage.setItem("notes", JSON.stringify(notes));

    createNoteElement(input.value, notes.length - 1);

    input.value = "";
}
function createNoteElement(text, index) {
    const notesContainer = document.getElementById("notesContainer");

    const noteDiv = document.createElement("div");
    noteDiv.classList.add("note");

    noteDiv.innerHTML = `
        <span contenteditable="false">${text}</span>
        <div>
            <button onclick="editNote(this, ${index})">Edit</button>
            <button onclick="deleteNote(${index})">Delete</button>
        </div>
    `;

    notesContainer.appendChild(noteDiv);
}
function loadNotes() {
    const notesContainer = document.getElementById("notesContainer");
    notesContainer.innerHTML = "";

    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes.forEach((note, index) => createNoteElement(note, index));
}
function deleteNote(index) {
    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notes));
    loadNotes();
}
function editNote(button, index) {
    const noteDiv = button.closest(".note");
    const span = noteDiv.querySelector("span");

    if (button.textContent === "Edit") {
        span.contentEditable = true;
        span.focus();
        button.textContent = "Save";
        button.style.background = "#16a34a";
    } else {
        span.contentEditable = false;

        let notes = JSON.parse(localStorage.getItem("notes")) || [];
        notes[index] = span.textContent;
        localStorage.setItem("notes", JSON.stringify(notes));

        button.textContent = "Edit";
        button.style.background = "#2563eb";
    }
}
function clearAllNotes() {
    localStorage.removeItem("notes");
    loadNotes();
}