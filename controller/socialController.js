const Social = require('../model/social');

function extractInfoFromLink(postLink) {
  const parsedUrl = new URL(postLink);
  const user = parsedUrl.searchParams.get('user');
  const imageUrl = parsedUrl.searchParams.get('imageurl');

  return { user, imageUrl };
}

exports.createPost = async (req, res) => {
  const { postLink, postDescription } = req.body;

  // Logic to parse postLink and extract image and user information
  const { imageUrl, user } = extractInfoFromLink(postLink);

  try {
    const post = await Social.create({
      postLink,
      postDescription,
      image: imageUrl,
      user,
      comment: []
    });

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getPosts = async (req, res) => {
  try {
    const posts = await Social.findAll();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.addComment = async (req, res) => {
  const postId = req.params.postId;
  const { comment } = req.body;

  try {
    const post = await Social.findByPk(postId);

    if (!post) {
      res.status(404).json({ error: 'Post not found' });
      return;
    }

    // Ensure comments is an array
    post.comments = post.comments || [];
    
    // Add the comment to the post
    post.comments.push(comment);
    await post.save();

    res.status(200).json({ message: 'Comment added successfully' });
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};