const { Client, Intents, MessageEmbed } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

module.exports = {
    name: 'share-code',
    description: 'Share code snippets',
    options: [
        {
            name: 'name',
            type: 'STRING',
            description: 'The name of the code',
            required: true
        },
        {
            name: 'description',
            type: 'STRING',
            description: 'The description of the code',
            required: true
        },
        {
            name: 'version',
            type: 'STRING',
            description: 'The version of the code',
            required: true,
            choices: [
                { name: 'v14', value: 'v14' },
                { name: 'v13', value: 'v13' },
                { name: 'v12', value: 'v12' },
                { name: 'v11', value: 'v11' }
            ]
        },
        {
            name: 'language',
            type: 'STRING',
            description: 'The language of the code',
            required: true,
            choices: [
                { name: 'javascript', value: 'javascript' },
                { name: 'python', value: 'python' },
                { name: 'html', value: 'html' }
            ]
        },
        {
            name: 'code',
            type: 'STRING',
            description: 'The code of the code',
            required: true,
            parse: (value, interaction) => {
                if (value.length > 6000) {
                    // If code length exceeds 6000 characters, send an error message
                    interaction.reply({ content: 'You can only enter up to 6000 characters.', ephemeral: true });
                    return null;
                }
                // Limit the code to 6000 characters
                return value.slice(0, 6000);
            }
        },
        {
            name: 'library',
            type: 'STRING',
            description: 'The library used in the code',
            required: true,
            choices: [
                { name: 'discord.js', value: 'discord.js' },
                { name: 'discord.py', value: 'discord.py' },
                { name: 'discord.jda', value: 'discord.jda' },
                { name: 'discord.net', value: 'discord.net' },
                { name: 'discord.eris', value: 'discord.eris' }
            ]
        },
        {
            name: 'display_name',
            type: 'STRING',
            description: 'Do you want to display your name?',
            required: true,
            choices: [
                { name: 'Yes', value: 'yes' },
                { name: 'No', value: 'no' }
            ]
        }
    ],
    execute: async (interaction) => {
        const name = interaction.options.getString('name');
        const description = interaction.options.getString('description');
        const version = interaction.options.getString('version');
        const language = interaction.options.getString('language');
        const code = interaction.options.getString('code');
        const library = interaction.options.getString('library');
        const displayName = interaction.options.getString('display_name');
        
        let roomId;
        switch(language) {
            case 'javascript':
                roomId = '1230592253483946035';
                break;
            case 'python':
                roomId = '1230592839570821140';
                break;
            case 'html':
                roomId = '1230592954109001779';
                break;
            default:
                roomId = 'DEFAULT_ROOM_ID'; // If none of the specified languages are selected
                break;
        }

        const formattedContent = "```" + language + "\n" + code + "\n```";

        const embed = new MessageEmbed()
            .setColor('#2c2c34')
            .setDescription(formattedContent)
            .addFields(
                { name: 'Name Code', value: name, inline: true },
                { name: 'Description', value: description, inline: true },
                { name: 'Version', value: version, inline: true },  
                { name: 'Language', value: language, inline: true },
                { name: 'Library', value: library, inline: true },
                { name: 'Coded By', value: displayName === 'yes' ? interaction.user.toString() : 'Unknown', inline: true }
            )

        const channel = await interaction.client.channels.fetch(roomId);
        if (channel && channel.isText()) {
            const sentMessage = await channel.send({ embeds: [embed] });
            await sentMessage.react('🟢');
            await sentMessage.react('🔴');
            await interaction.reply("Code shared successfully!");
        } else {
            await interaction.reply("Error: Invalid channel!");
        }
    },
};
