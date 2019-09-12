module.exports = {
  dialogflow: async (message) => {
    
    if(message.author.id!=418185145594544150){   // val id del bot para que no se responda a si mismo XD
      //var text =  message.content;    
      var text ='aa';  
      // var accessToken ="73ec82bce6a54f44ad5749f2428fe5ff"; // token dialogflow
      var accessToken ="73ec82bce6a54f44ad5749f2428fe5ff"; // token dialogflow
      var baseUrl = "https://api.dialogflow.com/v1/";
      var Request = require("request");
      Request.post(
        {
          "headers": 
          {
            "content-type": "application/json",
            "Authorization": "Bearer " + accessToken
          },
          "url": baseUrl + "query?v=20150910",
          "body": JSON.stringify
          (
            {
              query: text, 
              lang: "en", 
              sessionId: "SOMETHINGRANDOM" 
            }
          )
        }, 
        (error, response, body) => 
        {
          if(error) {
            return console.log(error);
          }
          var resp= JSON.parse(body);
          var mensajeResp= resp.result.fulfillment.speech ;
          if(mensajeResp)
          {
           message.channel.send(mensajeResp)
          }
        }  
      )
    }
  
  }
}