async function handleFormSubmit(event) {
    event.preventDefault();
  
    const postLink = document.getElementById('postLink').value;
    const postDescription = document.getElementById('postDescription').value;
  
    if (!postLink || !postDescription) {
      alert('Please fill in both post link and description.');
      return;
    }
  
    const response = await fetch('/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ postLink, postDescription })
    });
  
    if (response.ok) {
      alert('Post created successfully!');
      fetchPosts();
    } else {
      alert('Error creating post.');
    }
  }
  
  // Function to handle comment submission
  async function handleCommentSubmit(postId, event) {
    event.preventDefault();
  
    const commentInput = document.getElementById(`commentInput-${postId}`);
    const comment = commentInput.value;
  
    if (!comment) {
      alert('Please enter a comment.');
      return;
    }
  
    const response = await fetch(`/comments/${postId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ comment })
    });
  
    if (response.ok) {
      alert('Comment added successfully!');
      fetchPosts();
    } else {
      alert('Error adding comment.');
    }
  }
  
  // Function to fetch and display posts
  async function fetchPosts() {
    const response = await fetch('/posts');
    const data = await response.json();
    const postsDiv = document.getElementById('posts');
    postsDiv.innerHTML = '';
    data.forEach(post => {
      const postDiv = document.createElement('div');
      postDiv.classList.add('post-container');
      postDiv.innerHTML = `
        <h3>Post Link: <a href="${post.postLink}" target="_blank">${post.postLink}</a></h3>
        <p>Description: ${post.postDescription}</p>
        <img src="${post.image}" alt="Post Image">
        <p>User: ${post.user}</p>
        <form id="commentForm-${post.id}">
          <label for="commentInput-${post.id}">Add a Comment (Anonymous):</label><br>
          <textarea id="commentInput-${post.id}" name="commentInput" rows="3"></textarea><br><br>
          <button onclick="handleCommentSubmit(${post.id}, event)">Add Comment</button>
        </form>
        <div id="comments-${post.id}">
          <h4>Comments:</h4>
          ${post.comments.map(comment => `<p>${comment}</p>`).join('')}
        </div>
        <hr>
      `;
      postsDiv.appendChild(postDiv);
    });
  }
  
  // Fetch posts on page load
  fetchPosts();
  
  // Attach event listener to the form
  const form = document.getElementById('postForm');
  form.addEventListener('submit', handleFormSubmit);