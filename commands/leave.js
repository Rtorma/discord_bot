// bot leaves the voice channel, if it is connected
exports.run = (client, message, args) => {
    
    if(!message.member.voiceChannel) return message.channel.send('connect to voice channel');

    if(!message.guild.me.voiceChannel) return message.channel.send('bot already connected');

    if(message.guild.me.voiceChannelID !== message.member.voiceChannelID) return message.channel.send('you aren\'t connected to the same channel')

    //leave channel
    message.guild.me.voiceChannel.leave();

    //send message
    message.channel.send('left voice channel');

}