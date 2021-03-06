exports.run = async (client, message, args, ops) => {

    let fetched = ops.active.get(message.guild.id);

    if(!fetched) return message.channel.send('No songs in queue! This ain\'t good...' );

    if (message.member.voiceChannel !== message.guild.me.voiceChannel) return message.channel.send(`**HOLD UP!** You\'re not even listening to bot music, you can't pause it!`);

    //check if music is paused
    if (fetched.dispatcher.paused) return message.channel.send('This music is already paused.');

    //pause the music
    fetched.dispatcher.pause();

    message.channel.send(`Paused => ${fetched.queue[0].songTitle}`);
}