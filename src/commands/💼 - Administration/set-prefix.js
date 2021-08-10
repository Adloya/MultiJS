const Discord = require('discord.js');
const db = require("../../db.json");
const emojis = require("../../lists/emojis.json")
const fs = require('fs');
const language = require("../../lists/language.json");


const colors = require('../../lists/colors.json');
const default_embeds_color = colors["default_embed"];
const error_color = colors["error_embed"];


function SaveDBs() { // Fonction pour sauvegarder la base de données
    fs.writeFile("./db.json", JSON.stringify(db, null, 4), (err) => {
        if (err) {
    
error_embed.addFields(`Une erreur est survenue : `, `${err}`)
            message.channel.send({embeds : [error_embed]});
            error_embed.fields = [];
        }
    });
}

module.exports = {
    name: 'set-prefix',
    description: 'Changes the bot\'s prefix on your server',
    category: '💼 - Administration',
    aliases: ["setprefix", "prefix"],
    usage: '[new prefix]',
    run: async(client, message, args) => {
        const guildLang = db[message.guild.id]["language"]
        
        const error_embed = new Discord.MessageEmbed();
        error_embed.setColor(`${error_color}`);
        error_embed.setAuthor("Toaster", "http://adloteam.42web.io/adloteam/Toaster/MULTI.png");
        error_embed.setTitle(`${emojis["no"]} | ${language[guildLang]["Error"]}`);
        error_embed.setFooter("Toaster - Created by Adloya");
        error_embed.setTimestamp();


        if(message.member.permissions.has("ADMINISTRATOR")) {
            let arg = message.content.trim().split(/ +/g)
            if(!arg[1]){
                error_embed.addField(`${language[guildLang]["ErrorBasic"]}`, `${language[guildLang]["SpecifyConfig2"]}`);
                message.channel.send({embeds : [error_embed]});
                error_embed.fields = [];
                return;
            }
            else{
                db[message.guild.id]["prefix"] = arg[1];
                SaveDBs();
                const prefix_embed = new Discord.MessageEmbed();
                prefix_embed.setColor(`${default_embeds_color}`);
                prefix_embed.setAuthor("Toaster", "http://adloteam.42web.io/adloteam/Toaster/MULTI.png");
                prefix_embed.setDescription(`${language[guildLang]["ChangePrefixTitle"]}`);
                prefix_embed.setFooter("Toaster - Created by Adloya");
                prefix_embed.setTitle(`${emojis["yes"]} | ${language[guildLang]["PrefixUpdatedTitle"]}`);
                prefix_embed.setTimestamp();
                prefix_embed.addField(`${language[guildLang]["PrefixUpdatedSuccess"]}`, '``' + arg[1] + '``');
                message.channel.send({embeds : [prefix_embed]});

                prefix_embed.fields = [];
            }
        }else{
            error_embed.addFields(`${language[guildLang]["ErrorBasic"]}`, `${language[guildLang]["MissingPermission"]}`);
            message.channel.send({embeds : [error_embed]});
            error_embed.fields = [];
            return;
        }
    }
}