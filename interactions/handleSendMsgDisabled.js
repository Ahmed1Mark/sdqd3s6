// interactions/sendmsgdisabled.js
async function handleSendMsgDisabled(interaction) {
    try {
        await interaction.reply({
            content: `Under maintenance. Sending messages disabled.`, ephemeral: true
        });
    } catch (error) {
        console.error(error);
        await interaction.reply({
            content: 'An error occurred while disabling sending messages.', ephemeral: true
        });
    }
}

// Export the function to handle the sendmsgdisabled interaction
module.exports = {
    handleSendMsgDisabled
};
