exports.run = async (client, message, args, ops) => {

    let fetched = ops.active.get(message.guild.id);

    if (!fetched) return message.channel.send('No songs in queue! This ain\'t good...');

    //Variables
    let queue = fetched.queue;
    let nowPlaying = queue[0];

    //response text
    let resp = `__**Now Playing**__\n**${nowPlaying.songTitle}** -- **Requested By:** *${nowPlaying.requester}*\n\n__**Queue**__\n`;

    // go trough queue items
    if (queue.length === 1) {
        resp += `*Empty*\n`;
    }
    else {
        for (var i = 1; i < queue.length; i++) {
            resp += `${i}. **${queue[i].songTitle}** -- **Requested By:** *${queue[i].requester}*\n`;
        }
    }

    message.channel.send(resp);
}