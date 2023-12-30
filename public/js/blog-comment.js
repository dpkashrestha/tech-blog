const submitCommentFormHandler = async (event) => {
  // Stop the browser from submitting the form so we can do so with JavaScript
  event.preventDefault();

  // Gather the data from the form elements on the page
  const posted_date = new Date();
  const user_id = document.getElementById('user-id').value;
  const blog_id = document.getElementById("blog-id").value.trim();
  const commentData = document.getElementById("comment-content").value.trim();

  if (commentData) {
    // Send the username and password to the server
    const response = await fetch("/api/comments/", {
      method: "POST",
      body: JSON.stringify({
        content: commentData,
        blog_id,
        user_id,
        posted_date,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace(`/blog/${blog_id}`);
    } else {
      alert("Failed to create comment");
    }
  }
};

document
  .querySelector(".comment-form")
  .addEventListener("submit", submitCommentFormHandler);
