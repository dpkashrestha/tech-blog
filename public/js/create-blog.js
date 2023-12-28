const createFormHandler = async (event) => {
    // Stop the browser from submitting the form so we can do so with JavaScript
    event.preventDefault();
  
    // Gather the data from the form elements on the page
    const title = document.getElementById('blog-title').value.trim();
    const content = document.getElementById('blog-content').value.trim();
  
    if (title && content) {
      
      const response = await fetch('/api/blogs/', {
        method: 'POST',
        body: JSON.stringify({
            title, 
            content,
            user_id: 4,
            posted_date: "2023-12-10T12:45:00Z",
        }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      console.log('Response status:', response.status);
      console.log('Response status text:', response.statusText);

      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to create blog');
      }
    }
  };

  
  document
    .querySelector('.create-form')
    .addEventListener('submit', createFormHandler);


  