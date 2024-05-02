const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'msg-react',
    description: 'React to a message with a specified reaction.',
    options: [
        {
            name: 'message_id',
            type: 'STRING',
            description: 'The ID of the message to react to.',
            required: true,
        },
        {
            name: 'reaction',
            type: 'STRING',
            description: 'The reaction to add to the message.',
            required: true,
        },
    ],
    async execute(interaction) {
        const messageId = interaction.options.getString('message_id');
        const reaction = interaction.options.getString('reaction');

        try {
            const message = await interaction.channel.messages.fetch(messageId);

            await message.react(reaction);
            
            await interaction.reply({ content: `Reacted with ${reaction} to the message with ID: ${messageId}` });
        } catch (error) {
            console.error('Error reacting to message:', error);
            await interaction.reply({ content: 'An error occurred while reacting to the message.', ephemeral: true });
        }
    },
};
