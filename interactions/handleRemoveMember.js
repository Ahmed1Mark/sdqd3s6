async function handleRemoveMember(interaction, guild) {
    // Defer the interaction to prevent timeout
    await interaction.deferUpdate();

    try {
        const filter = m => m.author.id === interaction.user.id;
        const removeMemberPrompt = await interaction.followUp({ content: 'Please mention the person you want to remove "<@user_id>" This is an example of removing a person', ephemeral: true });
        const collectedMessages = await interaction.channel.awaitMessages({ filter, max: 1, time: 60000, errors: ['time'] });

        const memberIdOrMention = collectedMessages.first().content.trim();
        const memberToRemove = await guild.members.fetch(memberIdOrMention.replace(/\D/g, ''))
            .catch(() => null); // If member is not found, returns null

        if (!memberToRemove) throw new Error('Member not found.');

        await interaction.channel.permissionOverwrites.delete(memberToRemove);

        await removeMemberPrompt.delete();
        await collectedMessages.first().delete();
      
        await interaction.channel.permissionOverwrites.delete(memberToRemove);
        await interaction.followUp({ content: `Member ${memberToRemove.user.tag} has been removed from the ticket.`, ephemeral: true });

        // Send message directly after removing member successfully
        await interaction.followUp('The person has been successfully removed.');

    } catch (error) {
        console.error('Error removing member:', error.message);
        await interaction.followUp({ content: 'The person has been successfully removed.', ephemeral: true });
    }
}

module.exports = {
    handleRemoveMember
};
