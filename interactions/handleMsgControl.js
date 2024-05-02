// interactions/msg_control.js

const { MessageActionRow, MessageButton } = require('discord.js');

// دالة لمعالجة التفاعل msg_control
async function handleMsgControl(interaction, hasClaimPermission) {
    if (!hasClaimPermission(interaction.member)) {
        await interaction.reply({ content: 'You do not have the authority to take this action', ephemeral: true });
        return;
    }
    // إرسال رسالة لتحديد الإجراء المطلوب
    await interaction.reply({
        content: 'Determine the required action', ephemeral: true,
        components: [
            new MessageActionRow().addComponents(
                new MessageButton().setCustomId('msgdeleted').setLabel('Delete message').setStyle('DANGER'),
                new MessageButton().setCustomId('sendmsgdisabled').setLabel('Disable sending messages').setStyle('DANGER'),
                new MessageButton().setCustomId('sendmsgpost').setLabel('Send a regular message').setStyle('SECONDARY'),
                new MessageButton().setCustomId('sendmsgembed').setLabel('Send a message with Embed').setStyle('SECONDARY')
            )
        ]
    });
}

// تصدير الدالة لمعالجة التفاعل msg_control
module.exports = {
    handleMsgControl
};
