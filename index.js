﻿$(function(){

  // morsetræner starter her 
  var kopimorse = [];
  var kopibogstav = [];
  var fejlTabel;
  var bogstav = kopibogstav;
  var morse = kopimorse;
  var M, B;
  var farve, skrivMorse, tidstagningTil = true; 
  let popupOpen = false;
  var colll = $('#OK').css('background-color'); 
  var tgn="";
  var timeoutID;
  var rigtig = 0;
  var ialt = 0;
  let skalUrStartes = false;
  const zzz = window.location.search;
  let gb = false;
  

  function lav_tabeller() {
    if (gb) {
        kopimorse = ["", "*", "-","**", "*-", "-*", "--", "***", "**-" ,
        "*-*", "*--", "-**" ,"-*-", "--*", "---", "****" ,"***-", "**-*",
        "*-**" , "*--*", "*---", "-***" ,"-**-", "-*-*", "-*--" ,
        "--**", "--*-", "----"];
      kopibogstav = ["", "E", "T","I", "A", "N","M", "S", "U" ,"R", "W", 
        "D" ,"K", "G", "O", "H" ,"V", "F", "L" , "P", "J", "B" ,"X",
        "C", "Y" ,"Z", "Q", "CH"];     
    }
    else {
      kopimorse = ["", "*", "-","**", "*-", "-*", "--", "***", "**-" ,
        "*-*", "*--", "-**" ,"-*-", "--*", "---", "****" ,"***-", "**-*",
        "*-**" ,"*-*-", "*--*", "*---", "-***" ,"-**-", "-*-*", "-*--" ,
        "--**", "--*-", "---*", "----", "*--*-"];
      kopibogstav = ["", "E", "T","I", "A", "N","M", "S", "U" ,"R", "W", 
        "D" ,"K", "G", "O", "H" ,"V", "F", "L" ,"Æ", "P", "J", "B" ,"X",
        "C", "Y" ,"Z", "Q", "Ø", "CH", "Å"];      
    }

    bogstav = kopibogstav;
    morse = kopimorse;
    fejlTabel =[];
    nulstilTaeller();
    skalUrStartes = true;
  } // lav_tabeller()

  function nulstilTaeller() {
    rigtig = 0;
    ialt = 0;
  }

  $('#prik').on("click", function(){
    if (skalUrStartes) {
      startUr();
      skalUrStartes = false;
    }
    tgn=tgn+"*";
    vis_morse(tgn);
  });

  $('#btn').on("click", function(){
    if (skrivMorse) {
      $('#morsediv').css('display','none');
      $('#bogstavdiv').css('display','inline');
      skrivMorse = false;
    } 
    else {
      $('#morsediv').css('display','block');
      $('#bogstavdiv').css('display','none');

      skrivMorse = true;
    }
    skalUrStartes = true;
    lav_tabeller();
    lav_tegn();
    if (skrivMorse) {
      vis_morse(tgn);
      vis_bstav(B);
    } else {
      vis_morse(M)
      vis_bstav(tgn);
      
    }
    nulstilTaeller();
  });

  $('#bogstav2').on("focus", function() {
    if (!popupOpen & skalUrStartes) {
      startUr();
      skalUrStartes = false;
    }
  });

  $('#morseN').on("mouseup", function() {
    if (farve === true) {
      this.src = "morsenagle_tom.jpg";
      farve = false;
    } else {
      this.src = "morsenagle_sh.jpg";
      farve = true; 
    }
  }); // #morseN on click
  

  $('#streg').on("click", function(){
    if (skalUrStartes) {
      startUr();
      skalUrStartes = false;
    }
    tgn=tgn+"-";
    vis_morse(tgn);
  }); // #streg on click
 

  $('#slet').on("click", function(){
    $('#OK').css('background-color', colll);
    tgn="";
    vis_morse(tgn);
  }); // #slet on click

  $('#slet2').on("click", function(){
    $('#OK').css('background-color', colll);
    tgn="";
    vis_bstav(tgn);
  }); // #slet2 on click

  $('#bogstav2').blur(function() {
    
    tgn = $("#bogstav2").val();
    vis_bstav(tgn);
  });


  $('#OK').on("mouseup", function(){
    if (tgn === M) {
      $('#OK').css('background-color', 'lightgreen');
      rigtig++;
      ialt++;
      lav_tegn();
      vis_bstav(B);
      vis_morse(tgn);
      

    } else if (tgn != M){
       $('#OK').css('background-color', 'red');
        ialt++;
        fejlTabel.push(B);
        lav_tegn();
        vis_bstav(B);
        vis_morse(tgn);
    }
    timeoutID = setTimeout(function() {
      skift_farve();
    }.bind(this),1000)
  }); // #OK on click

$('#OK2').on("mouseup", function(){
  check_bogstav();
}); // #OK2 on click

$('#bogstav2').keypress(function(event){
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if(keycode == '13'){
        tgn = $("#bogstav2").val();
        vis_bstav(tgn);
        check_bogstav();
    }
});

function check_bogstav() {
  if (tgn === B) {
    $('#OK2').css('background-color', 'lightgreen');
    rigtig++;
    ialt++;
    lav_tegn();
    vis_bstav(tgn);
    vis_morse(M); 
  } else if (tgn != B){
     $('#OK2').css('background-color', 'red');
      ialt++;
      fejlTabel.push(B);
      lav_tegn();
      vis_bstav(tgn);
      vis_morse(M);
  }

  $('#bogstav2').focus();

  timeoutID = setTimeout(function() {
    skift_farve();
  }.bind(this),1000)
}

Function.prototype.bind = function(parent) {
    var f = this;
    var args = [];

    for (var a = 1; a < arguments.length; a++) {
        args[args.length] = arguments[a];
    }

    var temp = function() {
        return f.apply(parent, args);
    }

    return(temp);
}

  function sort_tider(tider) {
    var sortarray = [{field:'fejl', direction:'asc'}, {field:'tid', direction:'asc'}];

    tider.sort(function(a,b){
        for(var i=0; i<sortarray.length; i++){
            retval = a[sortarray[i].field] < b[sortarray[i].field] ? -1 : a[sortarray[i].field] > b[sortarray[i].field] ? 1 : 0;
            if (sortarray[i].direction == "desc") {
                retval = retval * -1;
            }
            if (retval !== 0) {
                return retval;
            }
        }
    })
    return tider;
  }

  function skift_farve() {
    $('#OK').css('background-color', colll);
    $('#OK2').css('background-color', colll);
  }

  function formaterTid(t) {
    let tid = Math.round((t)/1000);
    let minut = Math.floor(tid/60);
    let sekund = Math.floor(tid%60).toString();
    if (sekund.length == 1) {
      sekund = '0'+sekund;
    }
    return minut+":"+sekund;
  }

  function lav_tegn(){

    if (morse.length === 1) {
      if (gb) {
        var tekst = "You've got "+rigtig+" right of "+ialt+" possible. ";
      }
      else {
        var tekst = "Du havde "+rigtig+" rigtige ud af "+ialt+" mulige. ";
      }
      
      if (rigtig < ialt) {
        fejlTabel = fejlTabel.sort().reverse();
        if (gb) {
          tekst=tekst+"<br>You should practice the following letters: ";
        } else  {
          tekst=tekst+"<br>Du skal øve dig på følgende bogstaver: ";
        }
        for (var i = fejlTabel.length - 1; i >= 0; i--) {
          tekst = tekst +" "+fejlTabel[i]+",";
        }
      } 
      if (tidstagningTil) {
        stopUr();
        if (gb) {  
          tekst=tekst+"<br> Time: "+formaterTid(stopTid-startTid);
        } else {
          tekst=tekst+"<br> Tid: "+formaterTid(stopTid-startTid);
        }
      }
      popup(tekst);
      nulstilTaeller();
      skalUrStartes = true;
      lav_tabeller();
    }
    var t = Math.floor((Math.random() * (morse.length-1)) + 1);
    M = morse[t];
    B = bogstav[t];
    tgn = "";
    morse.splice(t,1);
    bogstav.splice(t,1);
  } // lav_tegn()


  function vis_morse(m) {
    $("#morsetgn").val(m);
    $("#morsetgn2").html(m);
  }


  function vis_bstav(b) {
    if (skrivMorse) {
      if(b === "Æ") {
        b = "&AElig;";} 
      else if(b === "Ø") {
        b = "&Oslash;";} 
      else if(b === "Å") {
        b = "&Aring;";
      }
      $("#bogstav").html(b);} 
    else {
      if(b === "&AElig;") {
        b = "Æ";
      } else if(b === "&Oslash;") {
        b = "Ø";
      } else if(b === "&Aring;") {
        b = "Å";
      }
      b = b.toUpperCase(); 
      $("#bogstav2").val(b);
      tgn = b;
    }
  } // vis_bstav(b)

  function popup(tekst) {
    tekst= "<br>"+tekst;
    $("#popup1").toggleClass("popup__synlig");
    $(".content").html(tekst);
    popupOpen = true;
  }
  
  $('#luk').on("click", function(){
    $(".content").html("");
    $("#popup1").toggleClass("popup__synlig");
    popupOpen = false;
  })

  let startTid , slutTid;

function startUr() {
  d = new Date();
  startTid = d.getTime();
  console.log('Start Ur');
}

function stopUr() {
  d = new Date();
  stopTid = d.getTime();
  console.log('det tog: '+ Math.round((stopTid-startTid)/1000) + 
    " sekunder");
}


  $('#flag').click((e) => {
      if (gb) window.location.replace("index.html");
      else window.location.replace("index.html?gb");
  });

  function start() {
    if (gb) {
      popup("<h1>Velcome to the Morse-training.<br> Click on the "+
        "Menu button to toggle between letters and morse-code<br>"+
        "Click on the Morsekey (the picture) to hide it.<br>"+
        "There'll be no danish letters (&AElig; &Oslash; &Aring;)<br>After the 27 letters You'll see: <br>"+
        "how many You got right, <br>"+
        "which ones You got wrong,<br>"+
        "and the time.</h1><br>");
    } else {
    popup("<h1>Velkommen til morsetræningen. <br> Tryk på Menu-knappen "+
      "for at skifte mellem bogstaver og morsetegn.<br>Og tryk på "+
      "morsenøglen for at skjule den.</h1><br>");
    }
    farve = true;
    
    lav_tabeller();
    lav_tegn();
    if (skrivMorse) {
      vis_bstav(B);
    } else {vis_morse(M)}
  } // start()



// main 
  $("#morsetgn").val(tgn);
  $('#OK').css('width', '100%');
  
  $('#morsediv').css('display','block');
  $('#bogstavdiv').css('display','none');
  skrivMorse = true;
  gb = (zzz == '?gb');
  if (gb) {
    $('#flag').attr("src",'iconfinder_danish_5320697.png');
    $('#slet, #slet2').html('Delete');
  }
  else $('#flag').attr("src",'iconfinder_england_5320698.png');
  start();


}) // main
