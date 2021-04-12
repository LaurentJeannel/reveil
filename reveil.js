exports.action = (data)=>{

   var  reponse=JarvisIA.reco
   var heurereveil=reponse.replace(new RegExp('[^0-9]', 'ig')," ").trim() 
   var reponse=reponse.replace(new RegExp('[^0-9]', 'ig'),"").trim()
                  
                 if(reponse==""){ JarvisIASpeech("précise un horaire au format heure minutes, merci"); return }
                     
                      var date = new Date();
                      var heure =date.getHours();
                      var minute =date.getMinutes();
                      var query=heure+''+minute
                      console.log('il est : '+ query)
                  
                if(reponse.length==1){tempsreveil=reponse*3600000}// que heure//8h
                if(reponse.length==2){tempsreveil=reponse*3600000}  //que heure//18h
               
                if(reponse.length==3){temp=reponse[0]*3600000;
                  tempsreveil=temp;//console.log(temp)
                  temp=reponse-reponse[0]*100;//console.log(temp)
                  temp=temp*60000;//console.log(temp)
                  tempsreveil=tempsreveil+temp
                } // 1 heure + 2 minutes//1h18
               
                if(reponse.length==4){temp=reponse[0]*36000000+reponse[1]*3600000
                  tempsreveil=temp;//console.log(temp)
                  temp=reponse-reponse[0]*1000;//console.log(temp)
                  temp1=reponse[1]*100;//console.log('rr'+temp1)
                  temp=temp-temp1;//console.log('r'+temp)
                  temp=temp*60000;//console.log(temp)
                  tempsreveil=tempsreveil+temp
                }// 2 heure + 2 minutes  

                reponse1=query ; reponse1=(reponse1.replace(new RegExp('[^0-9]', 'ig')," ")).trim()
                console.log('reveil à : '+ heurereveil)           
                JarvisIASpeech("réveil programmé à "+heurereveil.replace(" "," heure "))

                var temps = tempsreveil; var tempsname = reponse1
                var date = new Date(); var heure =date.getHours(); var minute =date.getMinutes();

    ////heure et minute en ms
    //si heures>0 alors heures*3600000ms  
       if (heure > 0){ heure = heure*3600000}
    //si minutes>0 alors minutes*60000ms
       if (minute > 0){ minute = minute*60000}
        //heure+minute en ms
      var heureminute = heure+minute
    //si reveil < heure actuel alors (24h-heure actuel)+heure reveil else >24 alors reveil-heure actuel
      var tempsfinale=86400000-heureminute

      if (temps < heureminute) {tempsfinal = parseInt(tempsfinale) + parseInt(temps)}
      else {tempsfinal = temps-heureminute} 

    //on reset le timeout
         // clearTimeout(function() {var child = exec(process); }, tempsfinal);

var lieuxreveil=(frg,tempsfinal)=>{

      setTimeout(()=> {
            
          PiecesInterphone=frg 

          JarvisIASpeech("reveil demandé")
          console.log("Action reveil")
          JarvisIaCall('Mathilde radio rire et chansons',frg)

          PiecesInterphone="" 
          return 
      }, tempsfinal);
}


var frg=JarvisIA.ipappel
lieuxreveil(frg,tempsfinal)
console.log(frg,tempsfinal)      
  return  

}