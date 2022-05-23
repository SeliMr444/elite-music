module.exports = async (client) => {
    client.user.setActivity(client.config.activity);
    client.user.setStatus(client.config.status);
    console.log(`- ${client.user.username}`);
};