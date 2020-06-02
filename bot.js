
var auth = require("./auth.json"); //token key name
//Modules Required------
const Discord = require('discord.js');
const Cron = require('node-cron');
//----------------------
const bot = new Discord.Client();
const Doggif = new Discord.MessageAttachment("./doggif.gif");
const SortArray = [
  "Lovely Person",
  "Smelly Person",
  "Vegan... Ew",
  "Dinosaur"
];
const HelpEmbed = new Discord.MessageEmbed()
  .setColor('#EA33FF')
	.setTitle('Commands')
	//.setURL('https://discord.js.org')
	//.setAuthor('Olsens.Ca', './SortingHat.png', "http://olsens.ca/")
	.setDescription('Here are my commands')
	//.setThumbnail('./SortingHat.png')
	.addFields(
		{ name: '!cmds', value: 'Opens This Page' },
		//{ name: '\u200B', value: '\u200B' }, this adds a blank space
		{ name: 'sort', value: 'Gives you some random fun', inline: false },
		{ name: '!dog', value: 'woof woof', inline: false },
    { name: '!odds', value: 'say !odds # in # to play a game of chance', inline: false },
    { name: '!json', value: 'to print specific add args else print all', inline: false },
	)

	//.setImage('https://i.imgur.com/wSTFkRM.png')
	.setTimestamp()
	//.setFooter('WIP', './SortingHat.png');

//Global Variables
//-------------------------------------
var EricsServer = "346782457187663885" //fun server`
var ECEDServer = "706880180878049313" //school Server
var BotTestServer = "709896630375153754"//school Server
var CuntServer = "297787975910031370"//fun Server
var Jsontest = require("./Test.json");
var EricsGenChat = "346782457187663886"
//------------------------------------
var Spam = Cron.schedule('*/10 * * * * *',() => {
  bot.emit("schedule");
});
bot.on("schedule",() =>{
  //needs to be a text channel to do channel.send("message")
  bot.channels.cache.get(EricsGenChat).send(SortArray[Math.floor(Math.random()*SortArray.length)]);
  console.log("Cron Job Executed");
}, {
  scheduled: false
});
bot.on('ready', () => {
  //Bot Config
  //------------------------------------
  bot.user.setUsername("Sexton").then(console.log("Updated Name")).catch(console.error);
  bot.user.setActivity("Online Learning", {type: "PLAYING"});

  //------------------------------------
  console.log("Bot Online");
  Spam.stop();
  var GuildList = bot.guilds.cache.map(x=>x.name);
  var GuildIDList = bot.guilds.cache.map(x=>x.id);
  GuildList.forEach((item, i) => {
    console.log(GuildList[i] + "---" + GuildIDList[i]);
    console.log("Members");
    console.log(bot.guilds.cache.get(GuildIDList[i]).members.cache.map(x=>x.displayName));
    console.log("Roles");
    console.log(bot.guilds.cache.get(GuildIDList[i]).roles.cache.map(x=>x.name));
  });
  console.log("\n\n")
  console.log("Bot now looking for Commands!")
    //loop through GuildIds
    //for each GuildIds loop its GuildMembers
  //go to next GuildIds
});
//------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------
bot.on("guildMemberAdd", member =>{
  if (member.guild.id == ECEDServer || EricsServer  || BotTestServer){
    console.log("Somone Has Joined School server");
    const welcome = member.guild.channels.cache.find(channel => channel.name == "general" || "Genenral");
    welcome.send("Hey <@" + member.id + "> are you Computer or Electrical? type !Electrical or !Computer");
  }
});
//------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------
bot.on("message", message => {
  console.log("A Message was sent by " + message.author.username + " in channel " + message.channel.name + " in guild " + message.channel.guild.name)
  var Input = message.content;
  var RolesList = message.guild.roles.cache.map(x=>x.name);
  var RolesIDList = message.guild.roles.cache.map(x=>x.id);
  const Args = message.content.split(' ');
  const Command = Args.shift().toLowerCase();
  if(message.author.id != bot.user.id){
    if (message.author.id == "143169630003789824" ){ //this is Tom Places ID
      console.log("\x1b[36m%s\x1b[0m","Tom Spoke!");
      if (Math.random()>0.75){
        message.react(message.guild.emojis.cache.get('644937932037160981'));
        console.log("\x1b[36m%s\x1b[47m%s\x1b[0m","And We Reacted!");
      };
    };
    if (message.author.id == "194981337399164937"){ //This is Zack Tomlinsons ID
      message.react('💯');
    };
    //------------------------------------------------------------------------------------------------------------
    //------------------------------------------------------------------------------------------------------------
    //------------------------------------------------------------------------------------------------------------
    //------------------------------------------------------------------------------------------------------------
    //------------------------------------------------------------------------------------------------------------
    if (message.channel.guild.id == ECEDServer || message.channel.guild.id == BotTestServer){

      switch(Command) {
        case "!electrical":
          RolesList.forEach((item, i) => {
            if (RolesList[i] == "Electrical"){
              message.member.roles.set([RolesIDList[i]]);
              console.log(message.author.username + " is now Electrical");
            }
            if (message.member.roles.cache.some(role=> role.name == "Electrical") == false){
              console.log("That Role no exist");
            };
          });
        break;

        case "!computer":
          RolesList.forEach((item, i) => {
            if (RolesList[i] == "Computer"){
              console.log(message.author.username + " is now Electrical");
              message.member.roles.set([RolesIDList[i]]);
              if (message.member.roles.cache.some(role=> role.name == "Computer") == false){
                console.log("That Role no exist");
              };
            };
          });
        break;
        default:
          console.log("\x1b[33m%s\x1b[0m","No Action has Been Taken in School Server");
      }
    }else {
      //------------------------------------------------------------------------------------------------------------
      //------------------------------------------------------------------------------------------------------------
      //------------------------------------------------------------------------------------------------------------
      //------------------------------------------------------------------------------------------------------------
      //------------------------------------------------------------------------------------------------------------
      //Do The for fun stuff
      switch(Command) {
        case "!test":
          //this is where i can print stuff to logs for ttesting
          console.log(message.guild.emojis.cache.map());
        break;
        case "!spam":
          if (Args.length > 1){
            message.channel.send("use !spam start OR !spam stop");
          }else{
            if (Args[0] == "start"){
              Spam.start();
              console.log("Started the spam");
            };
            if (Args[0] == "stop"){
              Spam.stop();
              console.log("stopped the spam");
            };
          };
        break;
        case "!json":
          if (Args.length != 0 && Args < Jsontest.length){
            message.channel.send(Jsontest[Args])
          }else{
            message.channel.send(Jsontest);
          }
        break;

        case "!args":
          message.channel.send(Args);
        break;

        case "!odds":
        case "!odd" :
          var First = Args[0];
          var Second = Args[2];
          console.log("The odds are ");
          //they say !odds 10 in 1, then i compute a random chance between 10 in 1 and output it
          //we can find hte chacne that a random number is less than the computed value
          if (Args[1] != "in" || Args.length >= 4){
            message.channel.send("Please use the form !odds # in #");
            return;
          }
          if (Args[1] = "in"){
            var Randy = Math.floor(Math.random()*Second) + 1;
            var Odds = First

            if (Randy < Odds){
              console.log(Randy + " < " + Odds);
              message.channel.send(Randy + " < " + Odds + " You lost the odds!");
            }
            if (Randy > Odds){
              console.log(Randy + " > " + Odds);
              message.channel.send(Randy + " > " + Odds + " You Won the odds!");
            };
            if (Randy == Odds){
              console.log(Randy + " = " + Odds);
              message.channel.send(Randy + " = " + Odds + " Its a Tie!");
            };
          };
        break;
        case "!quote" :
          console.log(message.author.username + "has called for a quote on ______ in " + message.channel.guild.name +"!");
          //Prmoises are always truthy apperntly
          var ChannelMessages = message.channel.messages.fetch({limit: 1}).then(a=>a.filter(x=>x.author.username === message.author.username).map(z=>z.content));
          message.channel.send(message.author.username + " once said '" + ChannelMessages + "'");
          console.log("A Random Quote from " + message.author.username + " has been sent");
        break;

        case "!cmds":
        case "!cmd" :
          console.log(message.author.username + " has requested the commands in " + message.channel.guild.name + "!");
          message.channel.send(HelpEmbed);
        break;

        case "sort":
          console.log("Sort Has Been summoned");
          message.channel.send(message.author.username + " is a " + SortArray[Math.floor(Math.random()*SortArray.length)]);
        break;

        case "!dog":
          console.log("Dog Has Been Summoned");
          message.channel.send("Woof Woof Bitch");
          message.channel.send(Doggif);
        break;

        default:
          console.log("\x1b[32m%s\x1b[0m","No Action has Been Taken in Fun Servers");
          //------------------------------------------------------------------------------------------------------------
          //------------------------------------------------------------------------------------------------------------
          //------------------------------------------------------------------------------------------------------------
          //------------------------------------------------------------------------------------------------------------
          //------------------------------------------------------------------------------------------------------------
        };
      };
    };
  });


bot.on("messageDelete", message => {
  console.log("\x1b[41m%s\x1b[0m","'"+message.content+"' has been deleted"); //can only delete messsages that were sent when bot was online
});

bot.on("messageUpdate", (oldmsg, newmsg) =>{
  console.log("\x1b[43m%s\x1b[0m", "'"+oldmsg.content+"' was changed to '"+newmsg.content+"'");
});

bot.login(auth.token);
console.log("Logging in...");
