document.addEventListener('DOMContentLoaded', function() {
    const submitButton = document.querySelector('.submit-btn');
    const oldIdInput = document.querySelector('#oldId');
    const taskIdInput = document.querySelector('#taskId');
    const taskInput = document.querySelector('#task');
    const taskOwnerInput = document.querySelector('#taskOwner');
    const taskStatusInput = document.querySelector('#taskStatus');

    submitButton.addEventListener('click', function(event) {
        event.preventDefault();

        const oldId = oldIdInput.value.trim();
        const taskId = taskIdInput.value.trim();
        const task = taskInput.value.trim();
        const taskOwner = taskOwnerInput.value.trim();
        const taskStatus = taskStatusInput.value.trim(); // assuming the input value is either "true" or "false"

        // Your endpoint URL to update todo
        const updateTodoUrl = `http://molndaltodolist-env.eba-ej3fe9gt.eu-north-1.elasticbeanstalk.com/todo/update/${oldId}`;

        const updatedTodo = {
            id: taskId,
            task: task,
            taskOwner: taskOwner,
            completed: (taskStatus === 'true') // Convert string to boolean
        };

        fetch(updateTodoUrl, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedTodo)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to update todo');
            }
            return response.json();
        })
        .then(data => {
            console.log('Todo updated successfully:', data);
            // Optionally, perform any actions upon successful update
        })
        .catch(error => {
            console.error('Error updating todo:', error.message);
            // Optionally, display an error message to the user
        });
    });
});
