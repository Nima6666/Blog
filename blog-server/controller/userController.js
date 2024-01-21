const post = require("../model/post");

module.exports.getPosts = async (req, res) => {
    try {
        const posts = await post.find({ published: true });
        const postsWithUrl = posts.map((post) => ({
            ...post,
            url: post.url,
        }));
        setTimeout(() => {
            res.json(postsWithUrl);
        }, 500);
    } catch (error) {
        console.log("error finding posts");
        res.json({ error });
    }
};
