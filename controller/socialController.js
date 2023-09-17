const Social = require('../model/social');

exports.createPost = async (req, res) => {
  const { postLink, postDescription } = req.body;

  // Logic to parse postLink and extract image and user information

  try {
    const post = await Social.create({
      postLink,
      postDescription,
      image: 'parsed_image_url',
      user: 'parsed_user',
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