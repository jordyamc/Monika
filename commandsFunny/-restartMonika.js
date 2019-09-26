
module.exports = {
  name: 'restart',
  alias:[],
  description: 'Reinicia a Monika',
  
  execute(message, secret){
    message.channel.send("01110010 01100101 01101001 01101110 01101001 01100011 01101001 01100001 01101110 01100100 01101111")
  },
  secret: 0
}