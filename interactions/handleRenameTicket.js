// interactions/rename_ticket.js
const { MessageActionRow } = require('discord.js');
const discordModals = require('discord-modals');
const { Modal, TextInputComponent, showModal } = discordModals;
// تعريف مصفوفة لتخزين الأعضاء والأوقات المتعلقة بهم
let lastUsageTimes = {};

async function handleRenameTicket(interaction, hasClaimPermission) {
    // التحقق من صلاحيات المستخدم
    if (!hasClaimPermission(interaction.member)) {
        await interaction.reply({ content: 'You do not have the authority to take this action', ephemeral: true });
        return;
    }
  
  try {
    if (interaction.isButton()) {
      if (interaction.customId === 'rename-ticket-button') {
        const currentTime = Date.now();
        const userId = interaction.user.id;

        // التحقق من مرور 2 دقيقة منذ الاستخدام الأخير للشخص
        if (lastUsageTimes[userId] && currentTime - lastUsageTimes[userId] < 100) {
          const remainingTime = 100 - (currentTime - lastUsageTimes[userId]);
          const remainingMinutes = Math.floor(remainingTime / 60000); // تحويل الوقت المتبقي إلى دقائق
          const remainingSeconds = Math.floor((remainingTime % 60000) / 1000); // تحويل الوقت المتبقي إلى ثواني

          await interaction.reply({ content: `Please wait ${remainingMinutes} minutes and ${remainingSeconds} seconds to use the command again.`, ephemeral: true });
          return;
        }

        // إعادة تعيين الوقت الأخير للشخص للحالي
        lastUsageTimes[userId] = currentTime;

        const modal = new Modal()
          .setCustomId('rename-ticket-modal')
          .setTitle('Rename Ticket')
          .addComponents([
            new MessageActionRow().addComponents(
              new TextInputComponent()
                .setCustomId('rename-ticket-input')
                .setLabel('Enter the name of the new ticket')
                .setStyle('SHORT')
                .setMaxLength(12)
                .setPlaceholder('Enter Name Ticket')
                .setRequired(true),
            ),
          ]);

        await interaction.showModal(modal);
      }
    }

    if (interaction.isModalSubmit()) {
      if (interaction.customId === 'rename-ticket-modal') {
        const response = interaction.fields.getTextInputValue('rename-ticket-input');
        const userId = interaction.user.id;

        // Check if the bot has permissions to manage channels
        if (interaction.member.permissions.has('MANAGE_CHANNELS')) {
          // Change the name of the ticket channel
          await interaction.channel.setName(response);
          
          await interaction.reply({ content: `The ticket name has been changed to : "${response}"`, ephemeral: true });
        } else {
          await interaction.reply({ content: "I don't have permission to rename channels!", ephemeral: true });
        }

        // إعادة تعيين الوقت الأخير للشخص للحالي بعد استخدام الأمر
        lastUsageTimes[userId] = Date.now();
      }
    }
  } catch (error) {
    console.error('An error occurred:', error);
    // يمكنك تغيير الرسالة المطبوعة حسب ما تريد
    await interaction.reply('An error occurred while processing your request. Please try again later.');
  }
}

module.exports = {
  handleRenameTicket
};

/*
// دالة لمعالجة التفاعل rename_ticket
async function handleRenameTicket(interaction, hasClaimPermission) {
    // التحقق من صلاحيات المستخدم
    if (!hasClaimPermission(interaction.member)) {
        await interaction.reply({ content: 'You do not have the authority to take this action', ephemeral: true });
        return;
    }

    // تأجيل الرد حتى يتم معالجة التفاعل
    await interaction.deferUpdate();

    // إرسال رسالة لطلب اسم جديد للتذكرة
    const newNamePrompt = await interaction.followUp({ content: 'Please enter a new ticket name', ephemeral: true });

    // استجابة للرسالة القادمة من المستخدم
    const filter = m => m.author.id === interaction.user.id;
    try {
        const collectedMessages = await interaction.channel.awaitMessages({ filter, max: 1, time: 15000, errors: ['time'] });

        const newName = collectedMessages.first().content.trim();
        await interaction.channel.setName(newName);

        // حذف الرسائل التي تم جمعها ورسالة الطلب الأصلية
        await collectedMessages.first().delete();
        await newNamePrompt.delete();

        // رد برسالة تأكيد تغيير اسم القناة
        await interaction.reply({ content: 'Channel renamed successfully.', ephemeral: true });
    } catch (error) {
        // التعامل مع الأخطاء ورد الرسالة المناسبة
        console.error('Error:', error.message);
        await interaction.reply({ content: 'Channel renaming has timed out.', ephemeral: true });
    }
}

// تصدير الدالة لمعالجة التفاعل rename_ticket
module.exports = {
    handleRenameTicket
};
*/