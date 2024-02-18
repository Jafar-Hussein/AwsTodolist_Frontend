const title = document.querySelector('#title-content');
const idInput = document.querySelector('#id-input');
const taskInput = document.querySelector('#task-input');
const isCompletedInput = document.querySelector('#isCompleted');
const taskOwnerInput = document.querySelector('#taskOwner');
const addBtn = document.querySelector('#add-btn');
const todoList = document.querySelector('#todos');


// urls
const title_url = 'http://localhost:5000/todo';
const addTodo_url = 'http://localhost:5000/todo/add';

async function getTitle(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const data = await response.json();
        title.textContent = data.title;
      } else {
        const text = await response.text();
        title.textContent = text;
      }
    } catch (error) {
      console.error('Error fetching title:', error.message);
      // Handle error gracefully, e.g., display a message to the user
    }
  }

addBtn.addEventListener('click', async () => {
    const id = idInput.value;
    const task = taskInput.value;
    const isCompleted = isCompletedInput.checked;
    const taskOwner = taskOwnerInput.value;
  
    const data = { id, task, isCompleted, taskOwner };
  
    try {
      const response = await fetch(addTodo_url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error('Failed to add todo');
      }
      const savedTodo = await response.json();
      console.log('Todo saved:', savedTodo);
      idInput.value = '';
      taskInput.value = '';
      isCompletedInput.checked = false || true;
      taskOwnerInput.value = '';
      // Add the new todo to the list
      const newTodo = document.createElement('li');
      newTodo.textContent = `${savedTodo.id}: ${savedTodo.task} - ${savedTodo.taskOwner}`;
      todoList.appendChild(newTodo);
    } catch (error) {
      console.error('Error adding todo:', error.message);
      // Handle error gracefully, e.g., display a message to the user
    }
});
  

getTitle(title_url);