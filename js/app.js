const title = document.querySelector('#header');
const clearBtn = document.querySelector('.clear-btn');


// urls
const title_url = 'http://molndaltodolist-env.eba-ej3fe9gt.eu-north-1.elasticbeanstalk.com/todo';
const clear_url = 'http://molndaltodolist-env.eba-ej3fe9gt.eu-north-1.elasticbeanstalk.com/todo/clearAll';

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

getTitle(title_url);

clearBtn.addEventListener('click', async () => {
    try {
        const response = await fetch(clear_url, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Failed to clear tasks');
        }
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Error clearing tasks:', error.message);
    }
});