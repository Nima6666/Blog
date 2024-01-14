const post = require("../model/post");

module.exports.getPosts = async (req, res) => {
    try {
        const posts = await post.find({ published: true });
        const postsWithUrl = posts.map((post) => ({
            ...post,
            url: post.url,
        }));
        res.json(postsWithUrl);
    } catch (error) {
        console.log("error finding posts");
        res.json({ error });
    }
};
