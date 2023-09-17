async function handleFormSubmit(event) {
  event.preventDefault();

  const postLink = document.getElementById('postLink').value;
  const postDescription = document.getElementById('postDescription').value;

  if (!postLink || !postDescription) {
    alert('Please fill in both post link and description.');
    return;
  }

  try {
    const response = await axios.post('/create', {
      postLink,
      postDescription
    });

    if (response.status === 201) {
      alert('Post created successfully!');
      fetchPosts();
    } else {
      alert('Error creating post.');
    }
  } catch (error) {
    console.error('Error creating post:', error);
    alert('An error occurred while creating the post.');
  }
}

async function fetchPosts() {
  try {
    const response = await axios.get('/posts');
    const data = response.data;
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
          <div id="commentsList-${post.id}">
            ${Array.isArray(post.comments) ? post.comments.map(comment => `<p>${comment}</p>`).join('') : ''}
          </div>
        </div>
        <hr>
      `;

      postsDiv.appendChild(postDiv);
    });
  } catch (error) {
    console.error('Error fetching posts:', error);
    alert('An error occurred while fetching posts.');
  }
}
// Fetch posts on page load
fetchPosts();

// Attach event listener to the form
const form = document.getElementById('postForm');
form.addEventListener('submit', handleFormSubmit);

async function handleCommentSubmit(postId, event) {
  event.preventDefault();

  const commentInput = document.getElementById(`commentInput-${postId}`);
  const comment = commentInput.value;

  if (!comment) {
    alert('Please enter a comment.');
    return;
  }

  try {
    const response = await axios.post(`/comments/${postId}`, { comment });

    if (response.status === 200) {
      alert('Comment added successfully!');
      fetchPosts();
    } else {
      alert('Error adding comment.');
    }
  } catch (error) {
    console.error('Error adding comment:', error);
    alert('An error occurred while adding the comment.');
  }
}