const submitCommentFormHandler = async (event) => {
  // Stop the browser from submitting the form so we can do so with JavaScript
  event.preventDefault();

  // Gather the data from the form elements on the page
  const blogId = document.querySelector("#blog-id").value.trim();
  const commentData = document.querySelector("#comment-content").value.trim();

  if (commentData) {
    // Send the username and password to the server
    const response = await fetch("/api/comments/", {
      method: "POST",
      body: JSON.stringify({
        content: commentData,
        blog_id: blogId,
        user_id: 4,
        posted_date: "2023-12-10T12:45:00Z",
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace(`/blog/${blogId}`);
    } else {
      alert("Failed to create comment");
    }
  }
};

document
  .querySelector(".comment-form")
  .addEventListener("submit", submitCommentFormHandler);
