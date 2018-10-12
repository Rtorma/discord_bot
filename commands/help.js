//command list
exports.run = (client, message, args, ops) => {

    message.channel.send(`
    __**Commands:**__\n
    *!ping* - Pong\n
    *!play link* - Play Youtube link audio or add it to queue\n
    *!skip* - Skip the currently playing song\n
    *!pause* - Pause playing music\n
    *!resume* - Resume playing music\n
    *!queue* - Song list\n
    *!help* - Commands list\n
    *!leave* - Stop playing music, bot leaves channel \n
    `);
}