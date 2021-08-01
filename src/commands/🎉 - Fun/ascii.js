const Discord = require('discord.js');
const figlet = require("figlet")
const colors = require('../../lists/colors.json');
const default_embeds_color = colors["default_embed"];
const error_color = colors["error_embed"];

const emojis = require("../../lists/emojis.json")
const db = require("../../db.json");
const language = require("../../lists/language.json");


module.exports = {
    name: 'ascii',
    description: 'Transforms Text to ASCII',
    category: '🎉 - Fun',
    usage: "[text]",
    run: async(client, message) => {
        let args = message.content.trim().split(/ +/g)
        const guildLang = db[message.guild.id]["language"]

        if(args.join(" ").length > 17){

            const error_embed = new Discord.MessageEmbed()
                .setColor(`${error_color}`)
                .setAuthor("Toaster", "http://adloteam.42web.io/adloteam/Toaster/MULTI.png")
                .setTitle(`${emojis["no"]} | ${language[guildLang]["Error"]}`)
                .setFooter("Toaster - Created by Adloya")
                .setTimestamp();
                error_embed.addFields(
                    {
                        name: `${language[guildLang]["ErrorBasic"]}`,
                        value: `${language[guildLang]["MsgTooLong"]}`
                    }
                );
                message.channel.send(error_embed);
                error_embed.fields = [];
        }else{
            if(args.join(" ").length < 1){
                const error_embed = new Discord.MessageEmbed()
                    .setColor(`${error_color}`)
                    .setAuthor("Toaster", "http://adloteam.42web.io/adloteam/Toaster/MULTI.png")
                    .setTitle(`${emojis["no"]} | ${language[guildLang]["Error"]}`)
                    .setFooter("Toaster - Created by Adloya")
                    .setTimestamp();
                    error_embed.addFields(
                        {
                            name: `${language[guildLang]["ErrorBasic"]}`,
                            value: `${language[guildLang]["MsgTooShort"]}`
                        }
                    );
                    message.channel.send(error_embed);
                    error_embed.fields = [];
                    return;
            }else{
                figlet.text(
                    args.join(" "),
                    {
                    font: "",
                    },
                    async (err, data) => {
                    message.channel.send({ content: `\`\`\`${data}\`\`\`` });
                    }
                );
            }
        }
    }
}