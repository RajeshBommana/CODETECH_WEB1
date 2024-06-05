(() => {
  // Retrieve the to-do list array and deleted tasks array from localStorage, or initialize empty arrays if not found
  let toDoListArray = JSON.parse(localStorage.getItem('toDoListArray')) || [];
  let deletedTasksArray = JSON.parse(localStorage.getItem('deletedTasksArray')) || [];

  // Select the form, input fields, and the unordered list from the DOM
  const form = document.querySelector(".form");
  const input = form.querySelector("#todo");
  const timeInput = form.querySelector("#time");
  const ul = document.querySelector(".toDoList");

  // Add an event listener for form submission to handle adding new tasks
  form.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    let itemId = String(Date.now()); // Generate a unique ID for the new task
    let toDoItem = input.value; // Get the value from the task input field
    let toDoTime = timeInput.value; // Get the value from the time input field
    addItemToDOM(itemId, toDoItem, toDoTime); // Add the new task to the DOM
    addItemToArray(itemId, toDoItem, toDoTime); // Add the new task to the to-do list array
    input.value = ""; // Clear the task input field
    timeInput.value = ""; // Clear the time input field
  });

  // Add an event listener for clicking on tasks in the to-do list
  ul.addEventListener("click", (e) => {
    let id = e.target.getAttribute("data-id"); // Get the ID of the clicked task
    if (!id) return; // If no ID, exit the function
    removeItemFromDOM(id); // Remove the task from the DOM
    moveItemToDeletedArray(id); // Move the task to the deleted tasks array
  });

  // Function to add a task to the DOM
  function addItemToDOM(itemId, toDoItem, toDoTime) {
    const li = document.createElement("li"); // Create a new list item element
    li.setAttribute("data-id", itemId); // Set the data-id attribute to the task ID
    li.innerText = toDoTime ? `${toDoItem} - ${toDoTime}` : toDoItem; // Set the text content of the list item
    ul.appendChild(li); // Append the list item to the unordered list
  }

  // Function to add a task to the to-do list array and update localStorage
  function addItemToArray(itemId, toDoItem, toDoTime) {
    toDoListArray.push({ itemId, toDoItem, toDoTime }); // Add the new task to the array
    localStorage.setItem('toDoListArray', JSON.stringify(toDoListArray)); // Update the to-do list array in localStorage
  }

  // Function to remove a task from the DOM
  function removeItemFromDOM(id) {
    var li = document.querySelector('[data-id="' + id + '"]'); // Find the list item with the given ID
    ul.removeChild(li); // Remove the list item from the unordered list
  }

  // Function to move a task to the deleted tasks array and update localStorage
  function moveItemToDeletedArray(id) {
    const deletedTask = toDoListArray.find((item) => item.itemId === id); // Find the task with the given ID
    deletedTasksArray.push(deletedTask); // Add the task to the deleted tasks array
    localStorage.setItem('deletedTasksArray', JSON.stringify(deletedTasksArray)); // Update the deleted tasks array in localStorage
    toDoListArray = toDoListArray.filter((item) => item.itemId !== id); // Remove the task from the to-do list array
    localStorage.setItem('toDoListArray', JSON.stringify(toDoListArray)); // Update the to-do list array in localStorage
  }

  // Render the existing tasks in the to-do list array when the page loads
  toDoListArray.forEach(item => addItemToDOM(item.itemId, item.toDoItem, item.toDoTime));
})();
