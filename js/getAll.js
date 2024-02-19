    const allBtn = document.querySelector('.allBtn');
    const allList = document.querySelector('.all-list');

    const getAllTodosUrl = 'http://molndaltodolist-env.eba-ej3fe9gt.eu-north-1.elasticbeanstalk.com/todo/todos';

    allBtn.addEventListener('click', function() {
        fetch(getAllTodosUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch todos');
                }
                return response.json();
            })
            .then(data => {
                // Clear the list before adding new items
                allList.innerHTML = '';

                // Loop through the todos and add them to the list
                data.forEach(todo => {
                    const listItem = document.createElement('li');
                    listItem.textContent = `Task id: ${todo.id}, Task: ${todo.task}, Task Owner: ${todo.taskOwner}, Task Status: ${todo.completed}`;

                    allList.appendChild(listItem);
                });
            })
            .catch(error => {
                console.error('Error fetching todos:', error.message);
                // Optionally, display an error message to the user
            });
    });

