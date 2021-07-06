const Discord = require('discord.js');
const db = require("../../db.json");
const colors = require('../../lists/colors.json');
const default_embeds_color = colors["default_embed"];
const error_color = colors["error_embed"];
const fs = require('fs');
const emojis = require("../../lists/emojis.json")
const language = require("../../lists/language.json");


module.exports = {
    name: 'warn',
    description: 'Add a warn to a member',
    category: '🎯 | moderation',
    run: async (client, message, args) => {
        const guildLang = db[message.guild.id]["language"]

        
        const error_embed = new Discord.MessageEmbed();
        error_embed.setColor(`${error_color}`);
        error_embed.setAuthor("Toaster", "http://adloteam.42web.io/adloteam/Toaster/MULTI.png");
        error_embed.setTitle(`${emojis["no"]} | ${language[guildLang]["Error"]}`)
        error_embed.setFooter("Toaster - Created by Adloya");
        error_embed.setTimestamp();

        function SaveDBs() { // Fonction pour sauvegarder la base de données
            fs.writeFile("../db.json", JSON.stringify(db, null, 4), (err) => {
                if (err) {
                    error_embed.addFields(
                        {name: `${language[guildLang]["ErrorBasic"]}`, value: `${language[guildLang]["UnknownError"]}`}
                    )
                    message.channel.send(error_embed);
                    error_embed.spliceFields();
                    return;
                }
            });
        }
        if(message.member.hasPermission("BAN_MEMBERS")) {
            if(!message.mentions.users.first() ) {
                error_embed.addFields(
                    {name: `${language[guildLang]["ErrorBasic"]}`, value: `${language[guildLang]["UsrNotFoundOrUsrNotIndicated"]}`}
                )
                message.channel.send(error_embed);
                error_embed.spliceFields();
                return;
            };
            user = message.mentions.users.first().id;
            const warn_embed = new Discord.MessageEmbed();
            warn_embed.setColor(`${default_embeds_color}`);
            warn_embed.setAuthor("Toaster", "http://adloteam.42web.io/adloteam/Toaster/MULTI.png");
            warn_embed.setDescription(`${language[guildLang]["WarnDesc"]}`);
            warn_embed.setTitle(`${emojis["yes"]} | ${language[guildLang]["WarnTitle"]} !`);
            warn_embed.setFooter("Toaster - Created by Adloya");
            warn_embed.setTimestamp();

            warn_embed.addFields(
            { name: user + `${language[guildLang]["WarnCount"]} :`, value: db[message.guild.id]["warn"][user] },
        );
            const finalwarn_embed = new Discord.MessageEmbed();
            finalwarn_embed.setColor(`${default_embeds_color}`);
            finalwarn_embed.setAuthor("Toaster", "http://adloteam.42web.io/adloteam/Toaster/MULTI.png");
            finalwarn_embed.setDescription(`${language[guildLang]["FinalWarnDesc"]}`);
            finalwarn_embed.setTitle(`${emojis["yes"]} | ${language[guildLang]["WarnTitle"]} !`);
            finalwarn_embed.setFooter("Toaster - Created by Adloya");
            finalwarn_embed.setTimestamp();

            finalwarn_embed.addFields(
            { name: user + `${language[guildLang]["FinalWarn"]}`, value: `${language[guildLang]["SimpleBan"]}` },
        );
            if(db[message.guild.id]['warn'][user] == 2){
                db[message.guild.id]["warn"][user] = "0";
                message.channel.send(finalwarn_embed);
                message.guild.members.ban(user);
            }
            else {
                if(!db[message.guild.id]["warn"][user]){
                    db[message.guild.id]["warn"][user] = 1;
                    SaveDBs();
                    message.channel.send(warn_embed);
                }
                else{
                    db[message.guild.id]["warn"][user]++;
                    SaveDBs();
                    message.channel.send(warn_embed);
                }
            
            }
        }
        SaveDBs();
    }
}