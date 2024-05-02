const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');

// دالة handleCloseTicket
async function handleCloseTicket(interaction) {
    if (interaction.customId === 'confirm_close') {
        // الكود الخاص بإغلاق التذكرة ونقلها وتغيير اسمها
        const channel = interaction.channel;
        try {
            // جلب قائمة الأشخاص الذين تم إضافتهم إلى permissionOverwrites
            const permissionOverwrites = channel.permissionOverwrites.cache.filter(overwrite => overwrite.type === 'member');

            // إزالة الأشخاص من الصلاحيات باستثناء الذين لديهم صلاحية الإدارة (ADMINISTRATOR)
            permissionOverwrites.forEach(async (overwrite) => {
                const member = await channel.guild.members.fetch(overwrite.id);
                if (!member.permissions.has('ADMINISTRATOR')) {
                    await overwrite.delete();
                }
            });

            // تحديد الفئة المستهدفة بواسطة معرفها
            const categoryId = '1234981469848604824'; // معرف الفئة المستهدفة
            const category = interaction.guild.channels.resolve(categoryId);

            // نقل الروم إلى الفئة
            await channel.setParent(category);

            // تغيير اسم الروم
            await channel.setName(`${channel.name}-closed`);

            // تأخير إرسال الـ Embed لمدة 3 ثواني
            setTimeout(async () => {
                const closedEmbed = new MessageEmbed()
                    .setColor('#2c2c34')
                    .setTitle('The Ticket Is Closed')
                    .setDescription('the person who owned the ticket has closed this ticket. Do you want to delete it?');
                
                // إنشاء زر "delete ticket"
                const deleteButton = new MessageButton()
                    .setCustomId('delete_ticket')
                    .setLabel('Delete Ticket')
                    .setStyle('DANGER');
                
                // إضافة الزر إلى صف الأزرار
                const row = new MessageActionRow().addComponents(deleteButton);
                
                // إرسال الـ Embed مع الزر
                await channel.send({ embeds: [closedEmbed], components: [row] });
            }, 500);
            
            await interaction.reply({ content: `> **Ticket Closed by : ${interaction.member}**`, ephemeral: true });
        } catch (error) {
            console.error('Error closing ticket:', error.message);
            await interaction.reply({ content: 'Failed to close the ticket.', ephemeral: true });
        }
    }
}

// تصدير الدالة handleCloseTicket
module.exports = {
    handleCloseTicket
};
