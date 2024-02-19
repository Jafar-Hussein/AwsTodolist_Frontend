
    const btn = document.querySelector('.oneBtn');
    const input = document.querySelector('#taskId');

    btn.addEventListener('click', async () => {
        console.log('Deleting task' + input.value.trim());
        const taskId = input.value.trim();

        if (!taskId) {
            console.error('Task ID is empty');
            return;
        }

        console.log('Deleting task:', taskId);

        try {
            const response = await fetch(`http://molndaltodolist-env.eba-ej3fe9gt.eu-north-1.elasticbeanstalk.com/todo/delete/${taskId}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error('Failed to delete task');
            }

            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error('Error deleting task:', error.message);
        }
    });
