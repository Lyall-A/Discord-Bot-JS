module.exports = string => {
    const splits = {
        "://": string.split("://"),
        ":": string.split(":"),
        "/": string.split("/"),
        "?": string.split("?")
    }

    // protocol
    const protocol = splits["://"][1] ? splits["://"][0] : null;

    // port
    const port = parseInt(splits[":"][protocol ? 2 : 1]?.split("/")[0]) || null;

    // domain
    const domain = protocol ? splits["://"][1].split(port ? ":" : "/")[0] : (port ? splits[":"] : splits["/"])[0] || null;

    // path
    const path = "/" + splits["/"].slice(protocol ? 3 : 1).join("/").split("?")[0];

    // query
    // TODO: fix error when no query is in URL
    const query = Object.fromEntries(splits["?"][1].split("&").map(i => i.split("=")));

    return {
        protocol,
        domain,
        port,
        path,
        query
    };
}