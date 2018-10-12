const ytdl = require('ytdl-core');

exports.run = async (client, message, args, ops) => {

    if (!message.member.voiceChannel) return message.channel.send('Connect to voice channel bro');

    if (!args[0]) return message.channel.send('Can\'t see sh*t there m8');

    let validate = await ytdl.validateURL(args[0]);

    if (!validate) return message.channel.send('Not a valid link');

    //get song info here
    let info = await ytdl.getInfo(args[0]);

    //fetch active
    let data = ops.active.get(message.guild.id) || {}; // {} if not defined already

    //update data
    if (!data.connection) data.connection = await message.member.voiceChannel.join(); //create connection if there is none
    if (!data.queue) data.queue = []; // create queue array if not defined
    data.guildID = message.guild.id; //set this id every time this is calles

    //add song to the queue
    data.queue.push({
        songTitle: info.title,
        requester: message.author.tag,
        url: args[0],
        announceChannel: message.channel.id
    });

    if (!data.dispatcher) play(client, ops, data); //play song, if there is nothing in queue
    else {
        //else add song to queue
        message.channel.send(`Added to queue: ${info.title} | Requested By: ${message.author}`);
    }

    //finaly, update the map

    ops.active.set(message.guild.id, data);

    // let info = await ytdl.getInfo(args[0]);

    // let connection = await message.member.voiceChannel.join();

    // let dispatcher = await connection.playStream(ytdl(args[0], {filter: 'audioonly'}));

    // message.channel.send(`Now playing: ${info.title}`);
}

//define play function

async function play(client, ops, data) {

    //notify the channel, new song is being played
    client.channels.get(data.queue[0].announceChannel).send(`Now Playing: ${data.queue[0].songTitle} | Requested By: ${data.queue[0].requester}`);

    //update dispatcher data
    data.dispatcher = await data.connection.playStream(ytdl(data.queue[0].url, { filter: 'audioonly' }));
    data.dispatcher.guildID = data.guildID;

    //listener when the song ends
    data.dispatcher.once('end', function () {
        //in this case, run the finish function
        finish(client, ops, this); //also 3 parameters there as well
    });
}

function finish(client, ops, dispatcher) {

    //fetch guild object with map
    let fetched = ops.active.get(dispatcher.guildID);

    //remove first item in queue
    fetched.queue.shift();

    //check if queue is empty
    if (fetched.queue.length > 0) {
        //if not empty update the map with the new queue
        ops.active.set(dispatcher.guildID, fetched);

        //run the play function with the next song in the queue
        play(client, ops, fetched);
    }
    else {
        //if  the queue is empty, delete guild object from the map
        ops.active.delete(dispatcher.guildID);

        //leave voice channel
        let vc = client.guilds.get(dispatcher.guildID).me.voiceChannel; //get the voiceChannel where the bot is right now
        if (vc) vc.leave();
    }
}
