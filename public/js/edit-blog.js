const editFormHandler = async (event) => {
    // Stop the browser from submitting the form so we can do so with JavaScript
    event.preventDefault();
  
    // Gather the data from the form elements on the page
    const posted_date = new Date();
    const id = document.getElementById('blog-id').value.trim();
    const title = document.getElementById('blog-title').value.trim();
    const content = document.getElementById('blog-content').value.trim();
  
    if (title && content) {
      
      const response = await fetch(`/api/blogs/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ id, title, content, posted_date }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to update blog');
      }
    }
  };

  const deleteFormHandler = async (event) => {
    event.preventDefault();
    const id = document.getElementById('blog-id').value.trim();

    const response = await fetch(`/api/blogs/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to delete blog');
      }

  };
  
  document
    .querySelector('.edit-form')
    .addEventListener('submit', editFormHandler);

    document
    .getElementById('delete-btn')
    .addEventListener('click', deleteFormHandler);
  