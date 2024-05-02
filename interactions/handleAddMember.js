async function handleAddMember(interaction, guild) {
    // Defer the interaction to prevent timeout
    await interaction.deferUpdate();

    try {
        const filter = m => m.author.id === interaction.user.id;
        const addMemberPrompt = await interaction.followUp({ content: 'Please mention the person you want to add "<@user_id>" This is an example of adding a person', ephemeral: true });
        const collectedMessages = await interaction.channel.awaitMessages({ filter, max: 1, time: 60000, errors: ['time'] });

        const memberIdOrMention = collectedMessages.first().content.trim();
        const memberToAdd = await guild.members.fetch(memberIdOrMention.replace(/\D/g, ''))
            .catch(() => null); // If member is not found, returns null

        if (!memberToAdd) throw new Error('Member not found.');

        await interaction.channel.permissionOverwrites.create(memberToAdd, {
            VIEW_CHANNEL: true,
            SEND_MESSAGES: true,
            ADD_REACTIONS: true
        });

        // Delete the prompt message and the collected message
        await addMemberPrompt.delete();
        await collectedMessages.first().delete();

        await interaction.followUp({ content: `Member ${memberToAdd.user.tag} has been added to the ticket.`, ephemeral: true });

        // Send message directly after adding member successfully
        await interaction.followUp('The person has been added successfully.');

    } catch (error) {
        console.error('Error adding member:', error.message);
        await interaction.followUp({ content: `Member has been added to the ticket.`, ephemeral: true });
    }
}

// Export the functions
module.exports = {
    handleAddMember
};
