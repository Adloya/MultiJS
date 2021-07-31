const Discord = require('discord.js');
const default_embeds_color = require('../../lists/colors.json');
const emojis = require("../../lists/emojis.json")
const db = require("../../db.json");
const language = require("../../lists/language.json");

module.exports = {
    name: 'ping',
    description: "Pings the bot and the DiscordJS APIs",
    category: '🛠️ - Utilities',    run: async(client, message, args) => {
        const guildLang = db[message.guild.id]["language"]
        const msg = await message.channel.send(`Pong!`);
        const ping_embed = new Discord.MessageEmbed()
            .setColor(`${default_embeds_color}`)
            .setAuthor("Toaster", "http://adloteam.42web.io/adloteam/Toaster/MULTI.png")
            .setDescription(`${language[guildLang]["PingLatency"]}`)
            .setFooter("Toaster - Created by Adloya")
            .setTitle("🏓 | Pong !")
            .setTimestamp()
            .addFields(
                {name: `${emojis["lag"]} | ${language[guildLang]["PingLatency"]} : `, value: `\`\`${msg.createdTimestamp - message.createdTimestamp}ms\`\``},
                {name: `${emojis["discordJs"]} | ${language[guildLang]["APILatency"]} : `, value: `\`\`${Math.round(client.ws.ping)}ms\`\``}
            );
            msg.edit(
                ping_embed
            )

            
    }
}