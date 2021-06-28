const Discord = require('discord.js');
const default_embeds_color = "#90c53f";


module.exports.help = {
    name: 'suggest',
    description: "Suggérer une fonction au créateur du bot (@Adloya#1873)",
    category: 'tools'
}
module.exports.run = async (client, message, args) => {
    const destinationChannel = "857279971550035968"

    const query = args.join(" ");
    if(!query) return message.reply("Merci de spécifier votre suggestion");

    const sgEmbed = new Discord.MessageEmbed()
        .setColor(`${default_embeds_color}`)
        .setAuthor("MultiJS", "http://adloteam.42web.io/adloteam/MultiJS/MULTI.png")
        .setDescription("Suggérer une fonctionnalité")
        .setFooter("MultiJS - Created by Adloya")
        .setTitle("❗ | Suggérer")
        .setTimestamp()
        .addFields(
            {name: 'Utilisateur qui a suggéré la fonction : ', value: message.author.toString(), inline: true},
            {name: 'Serveur ', value: message.guild.name, inline: true},
            {name: 'Suggestion : ', value: query, inline: true}
        );
    client.channels.cache.get(destinationChannel).send(sgEmbed);
    message.channel.send(`Suggestion envoyée !`);
    message.channel.send(sgEmbed);
}