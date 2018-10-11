// const http = require('http');
// const express = require('express');
// const app = express();
// app.get("/", (request, response) =>{
//     console.log(Date.now() + "Ping Received");
//     response.sendStatus(200);
// });
// app.listen(process.env.PORT);
// setInterval(() =>{
//     http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me`);
// }, 280000);

const Discord = require('discord.js');
const client = new Discord.Client();
//const play = require('./play.js')

//bot settings
const prefix = '!';

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

client.login('token_here');