// تعريف الدالة handleDeleteTicket
async function handleDeleteTicket(interaction) {
    if (interaction.customId === 'delete_ticket') {
        // حذف التذكرة إذا تم النقر على زر "delete ticket"
        const channel = interaction.channel;
        try {
            await channel.delete();
        } catch (error) {
            console.error('Error deleting ticket:', error.message);
        }
    }
}

// تصدير الدالة handleDeleteTicket
module.exports = {
    handleDeleteTicket
};
