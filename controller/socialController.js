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