const { MessageActionRow, MessageButton } = require('discord.js');

// تعريف الدالة handleCloseMinu
async function handleCloseMinu(interaction) {
    if (interaction.customId === 'close_ticket2') {
        // إرسال رسالة لتأكيد الإغلاق
        await interaction.reply({
            content: 'Are you sure you want to close this ticket?',
            ephemeral: true,
            components: [
                new MessageActionRow().addComponents(
                    new MessageButton().setCustomId('confirm_close').setLabel('Close').setStyle('DANGER'),
                    new MessageButton().setCustomId('cancel_close').setLabel('Cancel').setStyle('SECONDARY')
                )
            ]
        });
    }
}

module.exports = {
    handleCloseMinu
};