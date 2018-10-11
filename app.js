const Discord = require('discord.js');
const client = new Discord.Client();
//const play = require('./play.js')

//bot settings
const prefix = '!';
const ownerID = '498917866956128286';

client.on('message', message =>{

    //variables
    let args = message.content.slice(prefix.length).trim().split(' ');
    let cmd = args.shift().toLocaleLowerCase();

    //returns
    if(message.author.bot) return; //ignore bots
    if(!message.content.startsWith(prefix)) return;

    //command handler
    try{

        //auto reload
        delete require.cache[require.resolve(`./commands/${cmd}.js`)];

        let commandFile = require(`./commands/${cmd}.js`);
        commandFile.run(client, message, args);

    }catch(e){ //catch errors
        console.log(e.stack);
    }

});

client.on('ready', () => {
    console.log('Bot started');
});

client.login('NDk4OTE3ODY2OTU2MTI4Mjg2.Dp1dOg.9FqxsIzWkT7J-E8OYa3GsCYWc_c');