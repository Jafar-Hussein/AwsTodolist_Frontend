document.addEventListener('DOMContentLoaded', function() {
    const oneBtn = document.querySelector('.oneBtn');
    const taskIdInput = document.querySelector('#taskId');
    const allListItems = document.querySelectorAll('.all-list-item');

    oneBtn.addEventListener('click', function(event) {
        console.log('oneBtn clicked');
        event.preventDefault();

        const taskId = taskIdInput.value.trim();

        // Your endpoint URL to fetch one todo by ID
        const getOneTodoUrl = `http://molndaltodolist-env.eba-ej3fe9gt.eu-north-1.elasticbeanstalk.com/todo/getById/${taskId}`;

        fetch(getOneTodoUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch todo');
                }
                return response.json();
            })
            .then(data => {
                // Update list items with todo data
                allListItems[0].textContent = `Task id: ${data.id}`;
                allListItems[1].textContent = `Task: ${data.task}`;
                allListItems[2].textContent = `Task Owner: ${data.taskOwner}`;
                allListItems[3].textContent = `Task Status: ${data.completed}`;
            })
            .catch(error => {
                console.error('Error fetching todo:', error.message);
                // Optionally, display an error message to the user
            });
    });
});
