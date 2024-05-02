const { Client, Modal, version, Intents, MessageButton, TextInputComponent, DiscordAPIError, MessageSelectMenu, MessageAttachment, MessageEmbed, MessageActionRow } = require('discord.js');
const Discord = require('discord.js');
const { loadImage, Canvas} = require("canvas-constructor/cairo");
const Keyv = require('keyv');
const { inviteTracker } = require("discord-inviter");
const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const moment = require('moment');
require("moment-duration-format");
const db = new Keyv('sqlite://./storage/database.sqlite');
const express = require('express');
const app = express();
const path = require("path");
//تعريفات ملف interactions
const { handleDeleteTicket } = require('./interactions/handleDeleteTicket');
const { handleCloseMinu } = require('./interactions/handleCloseMinu');
const { handleCloseTicket } = require('./interactions/handleCloseTicket');
const { handleAddMemKikMem } = require('./interactions/handleAddMemKikMem');
const { handleMsgSendControl } = require('./interactions/handleMsgSendControl');
const { handleMsgControl } = require('./interactions/handleMsgControl');
const { handleSendMemberId } = require('./interactions/handleSendMemberId');
const { handleSendMsgEmbed } = require('./interactions/handleSendMsgEmbed');
const { handleSendMsgPost } = require('./interactions/handleSendMsgPost');
const { handleMsgDeleted } = require('./interactions/handleMsgDeleted');
const { handleRenameTicket } = require('./interactions/handleRenameTicket');
const { handleAddNote } = require('./interactions/handleAddNote');
const { handleSendOwnTick } = require('./interactions/handleSendOwnTick');
const { handleClaimTicket } = require('./interactions/handleClaimTicket');
const { handleAddMember } = require('./interactions/handleAddMember');
const { handleRemoveMember } = require('./interactions/handleRemoveMember');
const { handleTranscript } = require('./interactions/handleTranscript');
const { handleSendMsgDisabled } = require('./interactions/handleSendMsgDisabled');
const rules = require('./rules.json');
// قائمة الملفات والدوال المستوردة
const filesAndFunctions = [
    { name: 'handleDeleteTicket', fn: handleDeleteTicket },
    { name: 'handleCloseMinu', fn: handleCloseMinu },
    { name: 'handleCloseTicket', fn: handleCloseTicket },
    { name: 'handleAddMemKikMem', fn: handleAddMemKikMem },
    { name: 'handleMsgSendControl', fn: handleMsgSendControl },
    { name: 'handleMsgControl', fn: handleMsgControl },
    { name: 'handleSendMemberId', fn: handleSendMemberId },
    { name: 'handleSendMsgEmbed', fn: handleSendMsgEmbed },
    { name: 'handleSendMsgPost', fn: handleSendMsgPost },
    { name: 'handleMsgDeleted', fn: handleMsgDeleted },
    { name: 'handleRenameTicket', fn: handleRenameTicket },
    { name: 'handleAddNote', fn: handleAddNote },
    { name: 'handleSendOwnTick', fn: handleSendOwnTick },
    { name: 'handleClaimTicket', fn: handleClaimTicket },
    { name: 'handleAddMember', fn: handleAddMember },
    { name: 'handleRemoveMember', fn: handleRemoveMember },
    { name: 'handleTranscript', fn: handleTranscript },
    { name: 'handleSendMsgDisabled', fn: handleSendMsgDisabled }
];

// فحص حالة كل ملف
// فحص حالة كل ملف
console.log('Files Status:');
filesAndFunctions.forEach(item => {
    try {
        // قم بتحميل الملف واستدعاء الدالة الموجودة فيه
        require(`./interactions/${item.name}`);
        console.log(`✅ ${item.name}`);
    } catch (error) {
        console.error(`❌ ${item.name}`);
    }
});
//تعريف ملف config.json
const {
    token,
    prefix,
} = require('./config.json');
//منع ظهور الاخطاء البسيطه في console log
process.on("uncaughtException" , err => {
return;
})
 
process.on("unhandledRejection" , err => {
return;
})
 
process.on("rejectionHandled", error => {
  return;
});
// يمكنك استخدام mergedConfig في الشيفرة الخاصة بك الآن
let canvax = require('canvas')
canvax.registerFont("./storage/Uni Sans Heavy.otf", { family: 'Discord' })
canvax.registerFont("./storage/DejaVuSansCondensed-Bold.ttf", { family: 'Discordx' })
const client = new Client({
intents: [
  Intents.FLAGS.GUILDS,
  Intents.FLAGS.GUILD_MEMBERS,
  Intents.FLAGS.GUILD_VOICE_STATES,
  Intents.FLAGS.GUILD_MESSAGES,
  Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
  Intents.FLAGS.MESSAGE_CONTENT
],
}); // Declare client to be a new Discord Client (bot)
require('http').createServer((req, res) => res.end(`
</> Dveloper Bot : Ahmed Clipper
</> Server Support : https://dsc.gg/clipper-tv
</> Servers : ${client.guilds.cache.size}
</> Users : ${client.users.cache.size}
</> channels : ${client.channels.cache.size}
</> Name : ${client.user.username}
`)).listen(3000) //Dont remove this 
  /*
  Code Below provides info about the bot 
  once it's ready
  */


const { EventEmitter } = require('events');
EventEmitter.defaultMaxListeners = 30; // أو أي قيمة تعتقد أنها مناسبة
require("events").EventEmitter.defaultMaxListeners = 30;

client.on('ready', () => {
  console.log(``);
  console.log(`</> Logged in as : ${client.user.tag}!`);
  console.log(`</> Servers : ${client.guilds.cache.size}`);
  console.log(`</> Users : ${client.users.cache.size}`);
  console.log(`</> channels : ${client.channels.cache.size}`);
  console.log(`</> Name : ${client.user.username}`);
  client.user.setStatus('idle');///dnd/online/idle
  let status = [`/help`];
  setInterval(()=>{
  client.user.setActivity(status[Math.floor(Math.random()*status.length)]);
  },5000)
})

client.commands = new Discord.Collection();

// قراءة الملفات داخل المجلد "commands"
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

const commands = new Map();

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    commands.set(command.name, command);
}

// قراءة الملفات داخل المجلد "slashcommand"
const slashCommandFiles = fs.readdirSync('./slashcommand').filter(file => file.endsWith('.js'));

const slashCommands = [];

for (const file of slashCommandFiles) {
    const command = require(`./slashcommand/${file}`);
    slashCommands.push(command);
}

client.once('ready', async () => {
    try {
        await client.application?.commands.set(slashCommands);
        console.log('Slash commands registered successfully!');
    } catch (error) {
        console.error('Error registering slash commands:', error);
    }

    // طباعة الأوامر التي تم تسجيلها والتي لم يتم تسجيلها
    console.log('Registered Commands:');
    commands.forEach(command => {
        const status = commands.has(command.name) ? '✅' : '❌';
        console.log(`${status} ${command.name}`);
    });

    console.log('Unregistered Slash Commands:');
    slashCommandFiles.forEach(file => {
        const commandName = file.split('.')[0];
        const status = slashCommands.find(cmd => cmd.name === commandName) ? '✅' : '❌';
        console.log(`${status} ${commandName}`);
    });
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const command = slashCommands.find(cmd => cmd.name === interaction.commandName);
    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error('Error executing command:', error);
        await interaction.reply({ content: 'There was an error executing that command!', ephemeral: true });
    }
});

client.on('messageCreate', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    if (!commands.has(commandName)) return;

    const command = commands.get(commandName);

    try {
        command.execute(message, args, client, prefix, Discord); // تمرير client و prefix و Discord إلى ملف الأمر
    } catch (error) {
        console.error(error);
        message.reply('There was an error executing this command!');
    }
});

let nextAzkarIndex = 0;

let background2 = ''; // Initialize background2 variable

client.on('messageCreate', async message => {
  if (message.content.startsWith('st!setimagerules')) {
    if (message.member.permissions.has("ADMINISTRATOR")) {
      const args = message.content.split(' ');
      if (args.length !== 2) {
        await message.reply({ content: "Please provide a valid image URL.", ephemeral: true });
        return;
      }
      background2 = args[1];
      await message.reply({ content: "Server rules image has been set successfully.", ephemeral: true });
    } else {
      await message.reply({ content: "You need to be an administrator to use this command.", ephemeral: true });
    }
  }
  
  if (message.content === 'r!r3rules') {
    if (message.member.permissions.has("ADMINISTRATOR")) {
      const row = new MessageActionRow()
        .addComponents(
          new MessageSelectMenu()
            .setCustomId('select')
            .setPlaceholder('List of Laws')
            .addOptions(rules.map(rule => ({
              label: rule.title,
              value: rule.id,
            }))),
        );

      const embed = new MessageEmbed()
        .setThumbnail(message.guild.iconURL({ dynamic: true, size: 4096 }))
        .setTitle("<a:3_:1089615585232556204> Server Rules Community <a:12:1150947511146664017>")
        .setDescription(`<a:11:1150943009442107523> to read the laws, choose from the list below \n<a:11:1150943009442107523> please do not violate server rules \n\n <:921703781027184660:1089615608154431579> **Developer BOT <@803873969168973855> <:911751899324239902:1089615602471141416>**`)
        .setImage(background2);

      const sentMessage = await message.channel.send({ embeds: [embed], components: [row] });
      await message.delete();
    } else {
      await message.reply({ content: "You need to be an administrator to use this command.", ephemeral: true });
    }
  }
});

client.config = {
    prefix: "st!" // قم بتعيين بادئة الأمر هنا
};

/////////////////////////////////
client.on('messageCreate', async message => {
    if (!message.content.startsWith(client.config.prefix) || message.author.bot) return;

    const args = message.content.slice(client.config.prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    if (commandName === 'ping') {
        let msg = await message.channel.send({
            embeds: [
                new MessageEmbed()
                    .setDescription("> ⚙ **Please Wait...**")
            ],
        });

        let zap = "⚡";
        let green = "🟢";
        let red = "🔴";
        let yellow = "🟡";

        var botState = zap;
        var apiState = zap;
        var timediff = zap;

        let apiPing = client.ws.ping;
        let botPing = Math.floor(msg.createdAt - message.createdAt);

        if (apiPing >= 40 && apiPing < 200) {
            apiState = green;
        } else if (apiPing >= 200 && apiPing < 400) {
            apiState = yellow;
        } else if (apiPing >= 400) {
            apiState = red;
        }

        if (botPing >= 40 && botPing < 200) {
            botState = green;
        } else if (botPing >= 200 && botPing < 400) {
            botState = yellow;
        } else if (botPing >= 400) {
            botState = red;
        }
      
        if (botPing >= 40 && botPing < 200) {
            timediff = green;
        } else if (botPing >= 200 && botPing < 400) {
            timediff = yellow;
        } else if (botPing >= 400) {
            timediff = red;
        }

        setTimeout(() => {
            msg.delete();
            message.channel.send({
                embeds: [
                    new MessageEmbed()
                        .setTitle("📊 | Bot Statuss")
                        .addFields(
                            {
                                name: "API Latency",
                                value: `**\`\`\`yml\n${apiState} | ${apiPing}ms\`\`\`**`,
                                inline: true,
                            },
                            {
                                name: "Bot Latency",
                                value: `**\`\`\`yml\n${botState} | ${botPing}ms\`\`\`**`,
                                inline: true,
                            },
                            {
                                name: "API Latency",
                                value: `**\`\`\`yml\n${timediff} | ${(Date.now() - message.createdTimestamp)}ms\`\`\`**`,
                                inline: true,
                            }
                          
                        )
                        .setColor(client.config.embedColor)
                ],
            });
        }, 1000); // تأخير العملية لثانية واحدة (1000 مللي ثانية)
    }
});
/////////////////////////////////



// زيادة الحد الأقصى لعدد مستمعي الأحداث لعميل Discord
client.setMaxListeners(30); // تعيين العدد الذي ترغب فيه للحد الأقصى




let ticketOpenerId;


client.on('messageCreate', async message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'ticketpanel') {
const ticketOpenerId = message.author.id;   
const selectMenuOptions = [
    {
        label: 'Buy Robux',
        value: 'ticket_1',
        description: 'Buy Robux In Roblox Game.',
        emoji: '<:G7:1151244037517488159>'
    },
    {
        label: 'Buy UC For PUBG MOBILE',
        value: 'ticket_2',
        description: 'Buy UC in PUBG Mobile Game.',
        emoji: '<:pubgmobile:1102769748518916146>'
    },
    {
        label: 'Buy Project Bot Discord',
        value: 'ticket_3',
        description: 'Purchase Bot Projects Or Code.',
        emoji: '<:921703781027184660:1089615608154431579>'
    },
    {
        label: 'Photoshop Designer',
        value: 'ticket_4',
        description: 'Creating Designs Or Backgrounds',
        emoji: '🖼'
    },
    {
        label: 'Editing Discord Server',
        value: 'ticket_5',
        description: 'Modifying Organizing Discord Servers.',
        emoji: '📈'
    },
    {
        label: 'Support Team',
        value: 'ticket_6',
        description: 'Talk To The Management Staff',
        emoji: '<:911751899324239902:1089615602471141416>'
    },
  /*/
    {
        label: 'تقديم صانع محتوى',
        value: 'ticket_7',
        description: 'تقديم طلب صانع محتوى',
        emoji: '♾️'
    },
    {
        label: 'المواقع',
        value: 'ticket_8',
        description: 'للإبلاغ عن مشكلة في الموقع',
        emoji: '🌐'
    },
    {
        label: 'وزارة الداخلية',
        value: 'ticket_9',
        description: 'قسم الشؤون الداخلية',
        emoji: '👮‍♀️'
    },
    {
        label: 'وزارة الصحة والسكان',
        value: 'ticket_10',
        description: 'قسم الصحة والسكان',
        emoji: '👨‍🔬'
    },
    {
        label: 'وزارة الدفاع',
        value: 'ticket_11',
        description: 'قسم الدفاع والأمان',
        emoji: '💂'
    },
    {
        label: 'شركة السحب والصيانة',
        value: 'ticket_12',
        description: 'قسم الصيانة والدعم الفني',
        emoji: '👨‍🔧'
    }
    /*/
];
        const selectMenu = new MessageSelectMenu()
            .setCustomId('ticket_panel')
            .setPlaceholder('Please Choose The Specialty You Desire')
            .addOptions(selectMenuOptions);

        const row = new MessageActionRow().addComponents(selectMenu);

        const embed = new MessageEmbed()
            .setTitle("<a:3_:1089615585232556204> Welcome To Server __Ra'ad__ Community <a:12:1150947511146664017>")
            .setDescription(`<a:11:1150943009442107523> Please choose the section you want \n<a:11:1150943009442107523> God willing, you will find what you want on the server \n\n <:921703781027184660:1089615608154431579> **Developer BOT <@803873969168973855> <:911751899324239902:1089615602471141416>**`);

        message.channel.send({ embeds: [embed], components: [row] });
    }
  
});



// Counter for ticket numbers
let ticketCounter = 1;
const userTickets = new Map();

// Define a set to store roles with permission to claim
const claimPermissions = new Set();

// Function to check if a member has permission to claim
function hasClaimPermission(member) {
    return member.roles.cache.some(role => claimPermissions.has(role.id));
}

// Add roles with permission to claim
// Replace 'role_id_1', 'role_id_2', etc. with the actual role IDs
claimPermissions.add('1230590351430123690');
claimPermissions.add('1230590349890551910');
claimPermissions.add('1230590347072110723');
claimPermissions.add('1230590348456231013');
claimPermissions.add('1230590345222553702');
claimPermissions.add('1230590353199992933');
// Add more roles as needed






// Map to store user ticket count
client.on('interactionCreate', async interaction => {
    if (!interaction.isSelectMenu() && !interaction.isButton()) return;

    const { member, guild } = interaction;

   // استدعاء الدالة المناسبة بناءً على customId
    switch (interaction.customId) {
        case 'delete_ticket':
            await handleDeleteTicket(interaction, hasClaimPermission);
            break;
        case 'close_ticket2':
            await handleCloseMinu(interaction, hasClaimPermission);
            break;
        case 'confirm_close':
            await handleCloseTicket(interaction, hasClaimPermission);
            break;
        case 'msg_control':
            await handleMsgControl(interaction, hasClaimPermission);
            break;
        case 'addmem_kikmem':
            await handleAddMemKikMem(interaction, hasClaimPermission);
            break;
        case 'msg_sendcontrol':
            await handleMsgSendControl(interaction, hasClaimPermission);
            break;
        case 'sendmemberid':
            await handleSendMemberId(interaction, hasClaimPermission);
            break;
        case 'sendmsgembed':
            await handleSendMsgEmbed(interaction, hasClaimPermission);
            break;
        case 'sendmsgdisabled':
            await handleSendMsgDisabled(interaction, hasClaimPermission);
            break;
        case 'sendmsgpost':
            await handleSendMsgPost(interaction, hasClaimPermission); // استدعاء دالة لإرسال رسالة عادية
            break;
        case 'msgdeleted':
            await handleMsgDeleted(interaction, hasClaimPermission);
            break;
        case 'rename-ticket-button':
            await handleRenameTicket(interaction, hasClaimPermission);
            break;
        case 'add_note':
            await handleAddNote(interaction, hasClaimPermission); // تأكد من تمرير دالة التحقق من الصلاحية هنا
            break;
        case 'sendowntick':
            await handleSendOwnTick(interaction, hasClaimPermission); // Call the function for handling sendowntick interaction
            break;
        case 'claim_ticket':
            await handleClaimTicket(interaction, hasClaimPermission);
            break;
        case 'add_member':
            await handleAddMember(interaction, guild); // قم بتمرير ال guild الخاص بك هنا
            break;
        case 'remove_member':
            await handleRemoveMember(interaction, guild); // قم بتمرير ال guild الخاص بك هنا
            break;
        case 'transscript':
            await handleTranscript(interaction, guild); // قم بتمرير ال guild الخاص بك هنا
            break;
    }


// دالة لإرسال رسالة بـ Embed
async function sendEmbedMessage(interaction, content) {
    // إنشاء الـ Embed بناءً على النص المستلم
    const embed = {
        description: content,
        color: "#2c2c34", // يمكنك تعيين اللون كما تشاء
    };
    await interaction.channel.send({ embeds: [embed] });
}

// دالة لإرسال رسالة عادية
async function sendMessage(interaction, content) {
    await interaction.followUp({ content: content, ephemeral: true });
}


if (interaction.customId === 'rate_1_star' || interaction.customId === 'rate_2_star' || interaction.customId === 'rate_3_star' || interaction.customId === 'rate_4_star' || interaction.customId === 'rate_5_star') {
    // احتساب تقييم المستخدم
    const rating = interaction.customId.split('_')[1]; // الحصول على عدد النجوم من customId
    await interaction.reply({ content: `شكرا لتقييمك. لقد قيمت التذكرة بـ ${rating} نجمة.`, ephemeral: true });
}


  
  const selectMenuOptions = [
    {
        label: 'Buy Robux',
        value: 'ticket_1',
        rolesupport: '<@&1230590351430123690>',
        roleticketid: '1230590351430123690',
        emoji: '⛔'
    },
    {
        label: 'Buy UC',
        value: 'ticket_2',
        rolesupport: '<@&1230590349890551910>',
        roleticketid: '1230590349890551910',
        emoji: '⛔'
    },
    {
        label: 'Buy Project',
        value: 'ticket_3',
        rolesupport: '<@&1230590347072110723>',
        roleticketid: '1230590347072110723',
        emoji: '⛔'
    },
    {
        label: 'Photoshop',
        value: 'ticket_4',
        rolesupport: '<@&1230590348456231013>',
        roleticketid: '1230590348456231013',
        emoji: '⛔'
    },
    {
        label: 'Editing',
        value: 'ticket_5',
        rolesupport: '<@&1230590345222553702>',
        roleticketid: '1230590345222553702',
        emoji: '⛔'
    },
    {
        label: 'Support',
        value: 'ticket_6',
        rolesupport: '<@&1230590353199992933>',
        roleticketid: '1230590353199992933',
        emoji: '☑️'
    }
    /*
    {
        label: 'تقديم صانع محتوى',
        value: 'ticket_7',
        rolesupport: '<@&1223814666543697971>',
        roleticketid: '1223814666543697971',
        emoji: '♾️'
    },
    {
        label: 'المواقع',
        value: 'ticket_8',
        rolesupport: '<@&1223814665356705823>',
        roleticketid: '1223814665356705823',
        emoji: '🌐'
    },
    {
        label: 'وزارة الداخلية',
        value: 'ticket_9',
        rolesupport: '<@&1218325891361538201>',
        roleticketid: '1218325891361538201',
        emoji: '👮‍♀️'
    },
    {
        label: 'وزارة الصحة والسكان',
        value: 'ticket_10',
        rolesupport: '<@&1218333911839543316>',
        roleticketid: '1218333911839543316',
        emoji: '👨‍🔬'
    },
    {
        label: 'وزارة الدفاع',
        value: 'ticket_11',
        rolesupport: '<@&1218613841785782413>',
        roleticketid: '1218613841785782413',
        emoji: '💂'
    },
    {
        label: 'شركة السحب والصيانة',
        value: 'ticket_12',
        rolesupport: '<@&1218348609926332516>',
        roleticketid: '1218348609926332516',
        emoji: '👨‍🔧'
    }
    */
];
  
    const selectedOption = interaction.values[0]; // القيمة المحددة من القائمة

    // ابحث عن الخيار المحدد في selectMenuOptions
    const selectedDepartment = selectMenuOptions.find(option => option.value === selectedOption);

    if (!selectedDepartment) return;



const categoryIDs = {
    'ticket_1': '1230590520561107014', //   
    'ticket_2': '1230590520561107014', //
    'ticket_3': '1230590520561107014', // 
    'ticket_4': '1230590520561107014', // 
    'ticket_5': '1230590520561107014', // 
    'ticket_6': '1230590520561107014', // 
    'ticket_7': '1230590520561107014', // 
    'ticket_8': '1230590520561107014', // 
    'ticket_9': '1230590520561107014', // 
    'ticket_10': '1230590520561107014', // 
    'ticket_11': '1230590520561107014', // 
    'ticket_12': '1230590520561107014', // 
};
  

const ticketType = selectedOption.split('_')[1]; // يستخرج نوع التذكرة من القيمة المحددة في القائمة المنسدلة
const categoryID = categoryIDs[selectedOption]; // يحدد معرف الفئة بناءً على القيمة المحددة في القائمة المنسدلة

/*/
if (userTickets.has(member.id) && userTickets.get(member.id) >= 3) {
    await interaction.reply({ content: 'You have already opened three tickets.', ephemeral: true });
    return;
}
/*/
const ticket_open_member = member.id;
const channel = await guild.channels.create(`${selectedDepartment.label}-${ticketCounter}`, {
    type: 'text',
    permissionOverwrites: [
        {
            id: guild.roles.everyone,
            deny: ['VIEW_CHANNEL']
        },
        {
            id: member.id, //صلحية الشخص اللي بيفتح 
            allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ADD_REACTIONS']
        },
        {
            id: client.user.id, // صلحية البوت اللي هتكون في التيكت
            allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ADD_REACTIONS']
        },
        {
            id: selectedDepartment.roleticketid, //صلحيات الرولات اللي هتكون في التيكت
            allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ADD_REACTIONS']
        }
    ],
    parent: categoryID
  
});



// قم بتعديل الرسالة الراجعة لتحتوي على الزر
const replyMessage = `✔ Ticket Created <#${channel.id}> Ticket Number \`${ticketCounter}\``;

// قم بإنشاء صف واحد يحتوي على زر واحد
const row = new MessageActionRow()
	.addComponents(
		new MessageButton()
			.setLabel('Ticket Link')
			.setStyle('LINK') // يجعل الزر يفتح رابطًا
			.setURL(`https://discord.com/channels/740299333697536061/${channel.id}`)
	)

const egyptianDate = new Date().toLocaleDateString('en-US', { timeZone: 'Africa/Cairo' });
const startTimestamp = Math.floor(Date.now() / 1000) - 32;
let count = channelCounts.get(channel.parentId) || 0;
count++;
const user = member.user;
await interaction.reply({ content: replyMessage, components: [row], ephemeral: true });
const embed = new MessageEmbed()
    .setTitle("<a:3_:1089615585232556204> Welcome To Server __Ra'ad__ Community <a:12:1150947511146664017>")
    .setDescription(`**Please Write Your Request**`)
    .setColor('#1c1c24')
    .addFields(
        { name: '> Ticket By', value: `<@${ticket_open_member}>`, inline: true },
        { name: '> Support Required', value: `${selectedDepartment.rolesupport}`, inline: true },
        { name: '> Claimed By', value: `**Not Found**`, inline: true },
        { name: '> Section', value: `**\`\`\`${selectedDepartment.label}\`\`\`**`, inline: true },
        { name: '> Ticket Date', value: `**\`\`\`${egyptianDate}\`\`\`**`, inline: true },
        { name: '> Username', value: `**\`\`\`${member.user.username}\`\`\`**`, inline: true },
        { name: '> Ticket Since', value: `**┕<t:${startTimestamp}:R>**`, inline: true },
        { name: '> Joined Discord', value: `**┕<t:${Math.floor(user.createdTimestamp / 1000)}:R>**`, inline: true },
        { name: '> Joined Server', value: `**┕<t:${Math.floor(member.joinedTimestamp / 1000)}:R>**`, inline: true },
    );
  
    const closeButton = new MessageButton()
        .setCustomId('close_ticket2')
        .setLabel('🔒 Close')
        .setStyle('DANGER');

    const renameButton = new MessageButton()
        .setCustomId('rename-ticket-button')
        .setLabel('🔄 Rename')
        .setStyle('PRIMARY');

    const addMemberButton = new MessageButton()
        .setCustomId('addmem_kikmem')
        .setLabel('👥 Member Control')
        .setStyle('PRIMARY');
  
    const transcButton = new MessageButton()
        .setCustomId('transscript')
        .setLabel('📜 Transcript')
        .setStyle('PRIMARY');

    const claimButton = new MessageButton()
        .setCustomId('claim_ticket')
        .setLabel('🔖 Claim')
        .setStyle('SUCCESS');

    const noteButton = new MessageButton()
        .setCustomId('add_note')
        .setLabel('📌 Add Note')
        .setStyle('PRIMARY');
  
    const sendNotificationButton = new MessageButton()
        .setCustomId('msg_sendcontrol')
        .setLabel('✉️ Send Message')
        .setStyle('PRIMARY');
  
    const msgcontrolButton = new MessageButton()
        .setCustomId('msg_control')
        .setLabel('🛠️ Messages Control')
        .setStyle('PRIMARY');
  
    const row1 = new MessageActionRow()
    .addComponents(closeButton, renameButton, addMemberButton, transcButton, claimButton);
const row2 = new MessageActionRow()
    .addComponents(noteButton, sendNotificationButton, msgcontrolButton);
    channel.send({ content: `**||${member} - ${selectedDepartment.rolesupport}||**`, embeds: [embed], components: [row1, row2] });

    ticketCounter++;

    if (userTickets.has(member.id)) {
        userTickets.set(member.id, userTickets.get(member.id) + 1);
    } else {
        userTickets.set(member.id, 1);
    }
});
const channelCounts = new Map();

client.on('interactionCreate', async (interaction) => {
  if (interaction.isSelectMenu()) {
    const rule = rules.find(r => r.id === interaction.values[0]);
    const text = fs.readFileSync(rule.description, 'utf-8');
    const ruleEmbed = new MessageEmbed()
      .setColor(`#2c2c34`)
      .setTitle(`> ${rule.title}`)
      .setDescription(text)
      .setImage(`https://cdn.discordapp.com/attachments/1060237323708682250/1234869148924903475/standard.gif?ex=66324d03&is=6630fb83&hm=fe004febeed172a52dad26026f416bb5222e4bb4358e337e19fc55cd41de96fe&`)

    const message = await interaction.reply({ embeds: [ruleEmbed], ephemeral: true });
    
    // Add reaction directly to the replied message
  }
});



client.on('messageCreate', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'bot') {
        const duration = moment.duration(message.client.uptime).format(" D[d], H[h], m[m]");
        const embed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle(`Stats from \`${client.user.username}\``)
            .setDescription(``)
            .addFields(
                { name: ':ping_pong: Ping', value: `┕\`${Math.round(client.ws.ping)}ms\``, inline: true },
                { name: ':file_cabinet: Memory', value: `┕\`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}mb\``, inline: true },
                { name: ':homes: Servers', value: `┕\`${client.guilds.cache.size}\``, inline: true },
                { name: ':busts_in_silhouette: Users', value: `┕\`${client.users.cache.size}\``, inline: true },
                { name: ':robot: Version', value: `┕\`v${require("./package.json").version}\``, inline: true },
                { name: ':blue_book: Discord.js', value: `┕\`v${version}\``, inline: true },
                { name: ':green_book: Node', value: `┕\`${process.version}\``, inline: true },
                { name: ':clock1: Uptime', value: `┕\`${duration}\``, inline: true },
                { name: ':control_knobs: API Latency', value: `┕\`${(message.client.ws.ping)}ms\``, inline: true }
            );
        message.reply({ embeds: [embed] });
    }
});



client.on("messageCreate", (message) => {
  if (message.content === "مرحبا") {
    message.reply("مرحبا بك!");
  }
});

client.on("messageCreate", (message) => {
  if (message.content === "السلام عليكم") {
    message.reply("❤ عليكم السلام ياجميل منور السيرفر والله ❤");
  }
});
client.on("messageCreate", (message) => {
  if (message.content === "صلي علي النبي") {
    message.reply("❤ **عليه الصلاة والسلام** ❤");
  }
});
client.on("messageCreate", (message) => {
  if (message.content === "هلا") {
    message.reply("❤ هلا بيك شلونك حبيبي منور السيرفر ❤");
  }
});


client.on("messageCreate", (message) => {
  if (message.content.startsWith(prefix + "say")) {
    const args = message.content.slice(prefix.length + "say".length).trim();
    const user = message.author;
    if (!args) return message.reply("Please provide me a message! ⚠️");
    message.channel.send(args);
  }
});
client.on("messageCreate", async (message) => {
  if (message.content.startsWith(prefix + "edit")) {
    const args = message.content.slice(prefix.length + "edit".length).trim().split(' ');
    const messageId = args.shift(); // يستخرج معرف الرسالة من الوسائط
    const newContent = args.join(' '); // يجمع الباقي من الوسائط للحصول على النص الجديد
    if (!messageId || !newContent) return message.reply("Please provide a message ID and the new content to edit! ⚠️");
    
    try {
      const fetchedMessage = await message.channel.messages.fetch(messageId);
      
      if (fetchedMessage) {
        await fetchedMessage.edit(newContent);
        message.reply("Message edited successfully! ✅");
      } else {
        message.reply("Message not found or unable to edit! ⚠️");
      }
    } catch (error) {
      console.error("Error editing message:", error);
      message.reply("An error occurred while editing the message! ⚠️");
    }
  }
});


  /* Client when detects a message 
  then execute the code */
  client.on("messageCreate", async message => {
    if(message.author.bot) return;
    if(!message.content.startsWith(prefix)) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    if(command === "help") {
        message.reply({
          embeds: [ new MessageEmbed()
            .setDescription(`> **__All  Commands__** 
\n **!add** \n **!ping** \n **!role-list** \n **!channel** \n **!ruleschannel** \n  **!background** \n **!ruleslink** \n **!imagerules** \n **!setimagerules**  \n **!setruleslink** \n **!setchannel** \n **!setruleschannel** \n **!setbackground**`)
            .setColor("#2F3136")
          ]
        })
    }
    if(command === "add") {
     client.emit("guildMemberAdd", message.member)
    }
    if(command === "setchannel") {
      if(!message.member.permissions.has("MANAGE_GUILD")) return message.reply(":x: | Missing permissions, require `MANAGE_GUILD`")
      let channel = message.mentions.channels.first()
      if(!channel) return message.reply(`:x: | Missing arguments, required \`<channel>\`\n __Example__: ${prefix}setchannel ${message.channel}`)
      await db.set(`${message.guild.id}`, channel.id)
      message.reply({
        embeds: [ new MessageEmbed()
          .setDescription(`👍 | Successfully set the welcome channel to ${channel}`)
          .setColor("#2F3136")
          .setTimestamp()
        ]
      })
    }
    if(command === "channel") {
      let channel = await db.get(`${message.guild.id}`)
      if(channel) {
        message.reply({
          embeds: [ new MessageEmbed()
            .setDescription(`📝 | The welcome channel is set to ${message.guild.channels.cache.get(channel)}`)
            .setColor("#2F3136")
            .setTimestamp()
          ]
        })
      }
    }
    if(command === "setbackground"){
      if(!message.member.permissions.has("MANAGE_GUILD")) return message.reply(":x: | Missing permissions, require `MANAGE_GUILD`")
      if(args[0] && !args[0].startsWith("http")) return message.reply("Please provide a valid URL for an image **or** upload an image to set as background.")
      let background = message.attachments.first() ? message.attachments.first().url : args[0]
      if(!background) return message.reply(`:x: | Missing arguments, required \`<background>\`\n __Example__: ${prefix}setbackground <attachment> [ Can be URL or an uploaded image ]`)
      await db.set(`bg_${message.guild.id}`, background)
      message.reply({
        embeds: [ new MessageEmbed()
          .setDescription(`👍 | Successfully set the background to [this image](${background})`)
          .setImage(background)
          .setColor("#2F3136")
          .setTimestamp()
        ]
      })
    }
    if(command === "imagerules") {
    let background2 = await db.get(`bg_${message.guild.id}`)
    if(background2) {
      message.reply({
        embeds: [ new MessageEmbed()
          .setDescription(`📝 | The background is set to [this image](${background2})`)
          .setImage(background2)
          .setColor("#2F3136")
          .setTimestamp()
        ]
      })
    }
  }
    if(command === "background") {
    let background = await db.get(`bg_${message.guild.id}`)
    if(background) {
      message.reply({
        embeds: [ new MessageEmbed()
          .setDescription(`📝 | The background is set to [this image](${background})`)
          .setImage(background)
          .setColor("#2F3136")
          .setTimestamp()
        ]
      })
    }
  }
if(command === "setruleschannel"){
  if(!message.member.permissions.has("MANAGE_GUILD")) return message.reply(":x: | Missing permissions, require `MANAGE_GUILD`")
  if(!args[0]) return message.reply("Please provide a description to set.")

  let description = args.join(" ")
  
  // Save the description text instead of the image URL
  await db.set(`description_${message.guild.id}`, description)
  
  message.reply({
    embeds: [ new MessageEmbed()
      .setDescription(`👍 | Successfully set the description to: **${description}**`)
      .setColor("#2F3136")
      .setTimestamp()
    ]
  })
}
if(command === "setruleslink"){
  if(!message.member.permissions.has("MANAGE_GUILD")) return message.reply(":x: | Missing permissions, require `MANAGE_GUILD`")
  if(!args[0]) return message.reply("Please provide a description to set.")

  let description2 = args.join(" ")
  
  // Save the description text instead of the image URL
  await db.set(`description_${message.guild.id}`, description2)
  
  message.reply({
    embeds: [ new MessageEmbed()
      .setDescription(`👍 | Successfully set the description to: **${description2}**`)
      .setColor("#2F3136")
      .setTimestamp()
    ]
  })
}
if(command === "setimage"){
  if(!message.member.permissions.has("MANAGE_GUILD")) return message.reply(":x: | Missing permissions, require `MANAGE_GUILD`")
  if(!args[0]) return message.reply("Please provide a description to set.")

  let image = args.join(" ")
  
  // Save the description text instead of the image URL
  await db.set(`description_${message.guild.id}`, image)
  
  message.reply({
    embeds: [ new MessageEmbed()
      .setDescription(`👍 | Successfully set the description to: **${image}**`)
      .setColor("#2F3136")
      .setTimestamp()
    ]
  })
}
if(command === "image") {
  let image = await db.get(`description_${message.guild.id}`)
  if(image) {
    message.reply({
      embeds: [ new MessageEmbed()
        .setDescription(`📝 | The description is set to: **${image}**`)
        .setColor("#2F3136")
        .setTimestamp()
      ]
    })
  }
}

if(command === "ruleschannel") {
  let description = await db.get(`description_${message.guild.id}`)
  if(description) {
    message.reply({
      embeds: [ new MessageEmbed()
        .setDescription(`📝 | The description is set to: **${description}**`)
        .setColor("#2F3136")
        .setTimestamp()
      ]
    })
  }
}
if(command === "ruleslink") {
  let description2 = await db.get(`description_${message.guild.id}`)
  if(description2) {
    message.reply({
      embeds: [ new MessageEmbed()
        .setDescription(`📝 | The description is set to: **${description2}**`)
        .setColor("#2F3136")
        .setTimestamp()
      ]
    })
  }
}

}
);
/* Client when detects 
a new member join */
let tracker = "10";
  tracker = new inviteTracker(client);
	// "guildMemberAdd"  event to get full invite data
tracker.on("guildMemberAdd", async (member, inviter, invite, error) => {
  const startTimestamp = Math.floor(Date.now() / 1000) - 28;
  const memberCount = member.guild.memberCount;
  // return when get error
  if(error) return console.error(error);
  // get the channel
  let channel = member.guild.channels.cache.get("1230784484257959936"),
    Msg = (`
1. ${member.user} **- تم دعوة شخص جديد للسيرفر**
2. <@!${inviter.id}> **- تمت دعوته من قبل**
3. **عدد الدعوات -** **__${invite.count}__**
4. **العضو رقم -** **__${memberCount}__**
5. **<t:${startTimestamp}:R> -** **انضم للسيرفر منذ**`);
  // change welcome message when the member is bot
  if (member.user.bot)
        Msg = (`
1. ${member.user} **- تم دعوة بوت جديد جديد للسيرفر**
2. <@!${inviter.id}> **- تمت دعوته من قبل**
3. **عدد الدعوات -** **__${invite.count}__**
4. **العضو رقم -** **__${memberCount}__**
5. **<t:${startTimestamp}:R> -** **انضم للسيرفر منذ**`);
  // send welcome message
  channel.send(Msg);
});
  tracker = new inviteTracker(client);
// "guildMemberAdd"  event to get full invite data
tracker.on('guildMemberAdd', async (member, inviter, invite, error) => {
  let channelwelc = await db.get(`${member.guild.id}`)
  if(error) return console.error(error);
  if(!channelwelc) return;
  let channel = member.guild.channels.cache.get(channelwelc)
   let buffer_attach =  await generareCanvas(member)
   const attachment = new MessageAttachment(buffer_attach, 'welcome.png')
   const startTimestamp = Math.floor(Date.now() / 1000) - 27;
   const memberCount = member.guild.memberCount;


   // Fetch the description from the database
   let description = await db.get(`description_${member.guild.id}`);

   let embed = new MessageEmbed()
      .setTitle(`> <:TAG:1230615422852796566> Welcome to __${member.guild.name}__ Community`)
      .addFields(
        { name: '<:WELCOME:1230615431274958980> Welcome', value: `${member.user}`, inline: true },
        { name: '<:INVITED:1230615439844048958> Invited By', value: `<@!${inviter.id}>`, inline: true },
        { name: '<:READ:1230615413474328658> Rules', value: `${description}`, inline: true }, // Using the fetched description here
        { name: '<:USER_ID:1230615428376559749> User ID', value: `\`\`${member.user.id}\`\``, inline: true },
        { name: '<:NUMPER:1230615407602176020> Member Count', value: `**\`\`${memberCount}\`\`**`, inline: true },
        { name: '<:LINK2:1230615404481872034> Invite Number', value: `**\`\`${invite.count}\`\`**`, inline: true },
        { name: '<:TIME:1230615425834811454> Message Since', value: `<t:${startTimestamp}:R>`, inline: true },
        { name: '<:JOINED:1230615399012372571> Joined Discord', value: `<t:${Math.floor(member.user.createdAt / 1000)}:R>`, inline: true },
        { name: '<:SHARDS:1230615416141779105> Member User', value: `**\`\`${member.user.username}\`\`**`, inline: true },
        { name: '<:API:1230615434106245141> Node.js Version', value: `**__\`\`v21.7.2\`\`__**`, inline: true },
        { name: '<:PING:1230615410467016788> PING BOT', value: `**__\`\`${client.ws.ping}ms\`\`__**`, inline: true },
        { name: '<:DEVELOPER:1230615437042258002> Developer BOT ', value: `<@803873969168973855>`, inline: true },
        { name: '<:SUPPORT:1230615419572981871> Server Support ', value: `**[Click Here](https://dsc.gg/kn-server)**`, inline: true },
        { name: '<:LINK:1230615401394868225> Instagram ', value: `**[Click Here](https://www.instagram.com/ahm.depression)**`, inline: true },
        { name: '<:LINK2:1230615404481872034> Twitter', value: `**[Click Here](https://twitter.com/ahm_depression)**`, inline: true }
      )
    .setColor('#2F3136')
    .setImage("attachment://welcome.png")

    channel.send({ content: `||${member.user}||`, embeds: [embed], files: [attachment] })
});

client.on('guildMemberAdd', async member => {
  
    const egyptianDate = new Date().toLocaleDateString('en-US', { timeZone: 'Africa/Cairo' });
    let description = await db.get(`description_${member.guild.id}`);
    const startTimestamp = Math.floor(Date.now() / 1000) - 27;
  
    let description2 = await db.get(`description_${member.guild.id}`);
  
    const fourSeasonButton = new MessageButton()
        .setStyle('LINK')
        .setLabel('سيرفر راعد')
        .setURL('https://dsc.gg/clipper-tv'); // رابط موقع الـ 4 SEASON

    const instaButton = new MessageButton()
        .setStyle('LINK')
        .setLabel('الانستقرام')
        .setURL('https://www.instagram.com/ahm.depression'); // رابط موقع الـ 4 SEASON


    const buttonRow = new MessageActionRow()
        .addComponents([instaButton, fourSeasonButton]);

    const embed = new MessageEmbed()
        .setColor('#2c2c34')
        .setTitle(`> ${member.guild.name} اهلا بكم في سيرفر`)
        .setDescription(`**نحن سعداء بوجودك معنا في السيرفر نتمنى لكم يوما سعيدا \n\n**`)
        .addFields(
            { name: '**1. يرجى قراءة القوانين لتجنب المشاكل في السيرفر**', value: `${description}`, inline: false },
            { name: '**3. دخلت السيرفر منذ**', value: `**<t:${startTimestamp}:R>**`, inline: true },
            { name: '**2. تاريخ دخولك للسيرفر**', value: `**\`\`${egyptianDate}\`\`**`, inline: true }
          )    
        .setImage('https://cdn.discordapp.com/attachments/1144347868220620950/1232821773935054978/getty_177809840_65441.png?ex=662d7d3f&is=662c2bbf&hm=6119502bc695d684b42b1c0cbb16de723d82780437780d500ec5a1f3593f2b00&')
        .setThumbnail(member.user.displayAvatarURL({ size: 4096 }));

    member.send({ embeds: [embed], components: [buttonRow] })
        .catch(console.error);
});


async function generareCanvas(member) {
  const avatar = await loadImage(member.user.displayAvatarURL({ 'size': 2048, 'format': "png" }))
  const background = await loadImage(await db.get(`bg_${member.guild.id}`)) ?? await loadImage("https://cdn.discordapp.com/attachments/1144347868220620950/1232821773935054978/getty_177809840_65441.png?ex=662d7d3f&is=662c2bbf&hm=6119502bc695d684b42b1c0cbb16de723d82780437780d500ec5a1f3593f2b00&")
  const { weirdToNormalChars } = require('weird-to-normal-chars')
  const name = weirdToNormalChars(member.user.username)
  let canvas = new Canvas(1024, 450)
    .printImage(background, 0, 0, 1024, 450)
    .setColor("#FFFFFF")
    .printCircle(512, 155, 120)
    .printCircularImage(avatar, 512, 155, 115)
    .setTextAlign('center')
    .setTextFont('70px Discord')
    .printText(`Welcome`, 512, 355)
    .setTextAlign("center")
    .setColor("#FFFFFF")
    .setTextFont('45px Discordx')
    .printText(`${name}`, 512, 395)
    .setTextAlign("center")
    .setColor("#FFFFFF")
    .setTextFont('30px Discord')
    .printText(`To ${member.guild.name}`, 512, 430)
    // Adding "bot by ahmed" text above the image
    .setTextAlign('center')
    .setTextFont('bold 15px Arial')
    .setColor("#FFFFFF")
    .printText('</> Developer BOT Ahmed Clipper', 160, 25);
    // Adding "insta" text below the line
  canvas.setTextAlign('center')
    .setTextFont('bold 15px Arial')
    .setColor("#FFFFFF")
    .printText('</> instagram : ahm.depression', 150, 60);
  return canvas.toBufferAsync()
}



client.login(token)
