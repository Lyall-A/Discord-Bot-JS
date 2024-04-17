// TODO: get list of global commands from api and compare with local commands, register if necessary
// TODO: ^ easier to do bulk overwrite, but thinking of deleting this function entirely
// TODO: dont use api function, i wanna put a shit ton of functions in client class
const { utils, commands, secret } = globals;

module.exports = async () => {
    const cmds = Object.values(commands).map(i => ({
        name: i.commandName,
        description: i.commandDescription,
        options: i.commandOptions,
        ...i.additionalFields
    }));

    // utils.discord.api(`/applications/${utils.getIdFromToken(secret.discord.token)}/commands`, {
    //     method: "PUT",
    //     json: cmds
    // }).then(i => i.json()).then(i => console.log(i));

    utils.discord.api(`/applications/${utils.getIdFromToken(secret.discord.token)}/commands`, {
        // method: "PUT",
        // json: cmds
    }).then(i => i.json()).then(i => console.log(i.map(i => ({ name: i.name, description: i.description }))));

    // const gl = await utils.discord.getGlobalCommands(utils.getIdFromToken(secret.discord.token));
    // console.log(gl)
}