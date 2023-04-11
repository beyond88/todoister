// async function cacheData(req, res, next) {
const redis = require("redis");
module.exports = async (req, res, next) => {

    let redisClient;
    (async () => {
        redisClient = redis.createClient();
        redisClient.on("error", (error) => console.error(`Error : ${error}`));
        await redisClient.connect();
    })();

    const user_id = req.params.user_id;
    let results;
    try {
        const cacheResults = await redisClient.get(user_id);
        if (cacheResults) {
        results = JSON.parse(cacheResults);
        res.send({
            fromCache: true,
            data: results,
        });
        } else {
        next();
        }
    } catch (error) {
        console.error(error);
        res.status(404);
    }
}