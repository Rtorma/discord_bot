// ping pong commmand - super simple

exports.run = (client, message, args) => {

    //sends a message to the chanenel: Pong!
    message.channel.send('Pong!');
}