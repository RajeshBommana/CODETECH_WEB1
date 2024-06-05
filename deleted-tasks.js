// Wait for the DOM to fully load before executing the script
document.addEventListener('DOMContentLoaded', () => {
  // Retrieve the array of deleted tasks from localStorage, or initialize an empty array if not found
  const deletedTasksArray = JSON.parse(localStorage.getItem('deletedTasksArray')) || [];
  // Select the container element for displaying deleted tasks
  const deletedTasksContainer = document.querySelector('.deletedTasks');

  // Function to render the deleted tasks on the page
  function renderDeletedTasks() {
    // Clear the existing content of the container
    deletedTasksContainer.innerHTML = '';
    // Iterate over the deleted tasks array and create list items for each task
    deletedTasksArray.forEach((task, index) => {
      const li = document.createElement('li');
      // Set the text content of the list item to include the task item and time
      li.innerText = `${task.toDoItem} - ${task.toDoTime}`;
      // Add a data attribute to store the task ID
      li.setAttribute('data-id', task.itemId);

      // Create a restore button for each task
      const restoreButton = document.createElement('button');
      restoreButton.innerText = 'Restore';
      // Add an event listener to the restore button to handle task restoration
      restoreButton.addEventListener('click', () => restoreTask(index));

      // Append the restore button to the list item
      li.appendChild(restoreButton);
      // Append the list item to the container
      deletedTasksContainer.appendChild(li);
    });
  }

  // Function to restore a deleted task back to the main to-do list
  function restoreTask(index) {
    // Remove the task from the deleted tasks array
    const task = deletedTasksArray.splice(index, 1)[0];
    // Update the deleted tasks array in localStorage
    localStorage.setItem('deletedTasksArray', JSON.stringify(deletedTasksArray));

    // Retrieve the to-do list array from localStorage, or initialize an empty array if not found
    let toDoListArray = JSON.parse(localStorage.getItem('toDoListArray')) || [];
    // Add the restored task to the to-do list array
    toDoListArray.push(task);
    // Update the to-do list array in localStorage
    localStorage.setItem('toDoListArray', JSON.stringify(toDoListArray));

    // Re-render the deleted tasks to reflect the changes
    renderDeletedTasks();
  }

  // Initial render of the deleted tasks when the page loads
  renderDeletedTasks();
});
