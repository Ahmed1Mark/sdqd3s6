const { MessageEmbed } = require('discord.js');

// Function to handle the add_note interaction
async function handleAddNote(interaction, hasClaimPermission) {
    // Check for the required permission to use the command
    if (!hasClaimPermission(interaction.member)) {
        await interaction.reply({ content: 'You do not have the authority to take this action', ephemeral: true });
        return;
    }

    // Defer the response until the interaction is handled
    await interaction.deferUpdate();

    try {
        const filter = m => m.author.id === interaction.user.id;
        const addNotePrompt = await interaction.followUp({ content: 'Please write your comment', ephemeral: true });
        const collectedMessages = await interaction.channel.awaitMessages({ filter, max: 1, time: 15000, errors: ['time'] });

        const note = collectedMessages.first().content.trim();

        // Check for the existence of the embed and add the note to it
        let embed = interaction.message.embeds[0];
        if (!embed) {
            embed = new MessageEmbed();
        }
        embed.addFields({ name: `Note (By @${interaction.user.username})`, value: `\`\`\`${note}\`\`\`` }); // Add the user's name

        // Update the message with the new embed
        await interaction.editReply({ embeds: [embed], ephemeral: true });

        await collectedMessages.first().delete();
        await addNotePrompt.delete();
    } catch (error) {
        await interaction.reply({ content: 'Adding note failed. Please try again.', ephemeral: true });
    }
}

// Export the function to handle the add_note interaction
module.exports = {
    handleAddNote
};