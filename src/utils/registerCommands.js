// TODO: get list of global commands from api and compare with local commands, register if necessary
// TODO: ^ easier to do bulk overwrite, but thinking of deleting this function entirely
const { utils, commands, secret } = globals;

module.exports = async () => {
    const gl = await utils.discord.getGlobalCommands(utils.getIdFromToken(secret.discord.token));
    console.log(gl)
}