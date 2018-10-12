exports.run = async (client, message, args, ops) => {

    let fetched = ops.active.get(message.guild.id);

    if (!fetched) return message.channel.send('No songs in queue! This ain\'t good...');

    if (message.member.voiceChannel !== message.guild.me.voiceChannel) return message.channel.send(`**HOLD UP!** You\'re not even listening to bot music, you can't do this!`);

    //get user num on the voice channel
    let userCount = message.member.voiceChannel.members.size;

    //calculate successfull vote num
    let requiredNum = Math.ceil(userCount / 2);

    //update Fetched
    if (!fetched.queue[0].voteSkips) fetched.queue[0].voteSkips = [];

    //check if user already voted
    if (fetched.queue[0].voteSkips.includes(message.member.id)) return essage.channel.send(`**HOLD UP!** You\'re already voted to skip! ${fetched.queue[0].voteSkips.length}/${requiredNum} required...`);

    //add user to voteSkips
    fetched.queue[0].voteSkips.push(message.member.id);

    //update map
    ops.active.set(message.guild.id, fetched);

    //check vote num, if is it enough already
    if (fetched.queue[0].voteSkips.length>=requiredNum){
        //SKIP song
        message.channel.send('Successfully skipped song!');

        //emit finish event
        return fetched.dispatcher.emit('end');
    }
    
    //otherwise tell the channel the vote has been added
    message.channel.send(`Vote added to skip! ${fetched.queue[0].voteSkips.length}/${requiredNum} required...`);
}