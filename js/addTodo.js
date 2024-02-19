document.addEventListener('DOMContentLoaded', function() {
    const submitButton = document.querySelector('.submit-btn');
    const taskIdInput = document.querySelector('#taskId');
    const taskInput = document.querySelector('#task');
    const taskOwnerInput = document.querySelector('#taskOwner');
    const taskStatusInput = document.querySelector('#taskStatus');

    const addTodoUrl = 'http://molndaltodolist-env.eba-ej3fe9gt.eu-north-1.elasticbeanstalk.com/todo/add';

    submitButton.addEventListener('click', function(event) {
        event.preventDefault();

        const taskId = taskIdInput.value;
        const task = taskInput.value;
        const taskOwner = taskOwnerInput.value;
        const isCompleted = taskStatusInput.value; // No need to check for 'true/false' here

        if (task === '' || taskOwner === '' || taskId === '' || isCompleted === '') {
            alert('Please fill out all fields.');
            return;
        }

        const todoData = {
            id: taskId,
            task: task,
            taskOwner: taskOwner,
            isCompleted: isCompleted === 'true'  // Convert string to boolean
        };

        fetch(addTodoUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(todoData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to add todo');
            }
            return response.json();
        })
        .then(data => {
            console.log('Todo added successfully:', data);
            // Optionally, perform any actions upon successful addition
        })
        .catch(error => {
            console.error('Error adding todo:', error.message);
            // Optionally, display an error message to the user
        });
    });
});
