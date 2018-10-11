const ytdl = require('ytdl-core');

exports.run = async(client, message, args) =>{

    if(!message.member.voiceChannel) return message.channel.send('connect to voice channel');

    if(message.guild.me.voiceChannel) return message.channel.send('bot already connected');

    if(!args[0]) return message.channel.send('url needed');

    let validate = await ytdl.validateURL(args[0]);

    let info = await ytdl.getInfo(args[0]);

    let connection = await message.member.voiceChannel.join();

    let dispacher = await connection.playStream(ytdl(args[0], {filter: 'audioonly'}));

    message.channel.send(`Now playing: ${info.title}`);
}