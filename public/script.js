

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

async function fetchPosts() {
  try {
    const response = await axios.get('/posts');
    const data = response.data;  // Access response data directly
    const postsDiv = document.getElementById('posts');
    postsDiv.innerHTML = '';
    data.forEach(post => {
      // ... (rest of the code remains the same)
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