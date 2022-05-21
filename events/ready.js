module.exports = async (client) => {
    client.user.setActivity(client.config.playing);
    console.log(`- ${client.user.username}`);
};