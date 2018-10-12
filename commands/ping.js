// ping pong commmand - super simple

exports.run = (client, message, args, ops) => {

    //sends a message to the chanenel: Pong!
    message.channel.send('Pong!');
}