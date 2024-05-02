// interactions/msg_sendcontrol.js

// استيراد المكتبات الضرورية
const { MessageActionRow, MessageButton } = require('discord.js');

// دالة لمعالجة التفاعل msg_sendcontrol
async function handleMsgSendControl(interaction, hasClaimPermission) {
    if (!hasClaimPermission(interaction.member)) {
        await interaction.reply({ content: 'You do not have the authority to take this action', ephemeral: true });
        return;
    }
    // إرسال رسالة لتحديد الإجراء المطلوب
    await interaction.reply({
        content: 'Determine the required action', ephemeral: true,
        components: [
            new MessageActionRow().addComponents(
                new MessageButton().setCustomId('sendowntick').setLabel('Send a message to the ticket owner').setStyle('SECONDARY'),
                new MessageButton().setCustomId('sendmemberid').setLabel('Send a message to a specific user').setStyle('SECONDARY')
            )
        ]
    });
}

// تصدير الدالة لمعالجة التفاعل msg_sendcontrol
module.exports = {
    handleMsgSendControl
};
