$(function(){

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


  function lav_tabeller() {
    kopimorse = ["", "*", "-","**", "*-", "-*", "--", "***", "**-" ,
      "*-*", "*--", "-**" ,"-*-", "--*", "---", "****" ,"***-", "**-*",
      "*-**" ,"*-*-", "*--*", "*---", "-***" ,"-**-", "-*-*", "-*--" ,
      "--**", "--*-", "---*", "----", "*--*-"];
    kopibogstav = ["", "E", "T","I", "A", "N","M", "S", "U" ,"R", "W", 
      "D" ,"K", "G", "O", "H" ,"V", "F", "L" ,"Æ", "P", "J", "B" ,"X",
      "C", "Y" ,"Z", "Q", "Ø", "CH", "Å"];
    bogstav = kopibogstav;
    morse = kopimorse;
    fejlTabel =[];
  } // lav_tabeller()


  $('#prik').on("click", function(){
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
    if (tidstagningTil) {startUr();}
    lav_tabeller();
    lav_tegn();
    if (skrivMorse) {
      vis_morse(tgn);
      vis_bstav(B);
    } else {
      vis_morse(M)
      vis_bstav(tgn);
    }
  });

  $('#morseN').on("click", function() {
    if (farve === true) {
      this.src = "morsenagle_tom.jpg";
      farve = false;
    } else {
      this.src = "morsenagle_sh.jpg";
      farve = true; 
    }
  }); // #morseN on click
  

  $('#streg').on("click", function(){
    tgn=tgn+"-";
    vis_morse(tgn);
  }); // #streg on click
 

  $('#slet').on("click", function(){
    $('#OK').css('background-color', colll);
    tgn="";
    vis_morse(tgn);
  }); // #slet on click

  $('#bogstav2').blur(function() {
    
    tgn = $("#bogstav2").val();
    vis_bstav(tgn);
  });


  $('#OK').on("click", function(){
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

$('#OK2').on("click", function(){
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
  }); // #OK on click

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

  function skift_farve() {
    $('#OK').css('background-color', colll);
    $('#OK2').css('background-color', colll);
  }

  function lav_tegn(){
    let tid;

    if (morse.length === 1) {
      var tekst = "Du havde "+rigtig+" rigtige ud af "+ialt+" mulige. ";
      if (rigtig < 30) {
        fejlTabel = fejlTabel.sort().reverse();
        tekst=tekst+"<br>Du skal øve dig på følgende bogstaver: ";
        for (var i = fejlTabel.length - 1; i >= 0; i--) {
          tekst = tekst +" "+fejlTabel[i]+",";
        }
      } 
      if (tidstagningTil) {
        stopUr();
        tid = Math.round((stopTid-startTid)/1000);
        tekst=tekst+"<br> Tid: "+Math.floor(tid/60)+":"+Math.floor(tid%60);
      }
      popup(tekst);
      rigtig = 0;
      ialt = 0;
      if (tidstagningTil) {startUr();}
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
  console.log(startTid);
}

function stopUr() {
  d = new Date();
  stopTid = d.getTime();
  console.log(stopTid);
  console.log('det tog: '+ Math.round((stopTid-startTid)/1000) + 
    " sekunder");
}

  function start() {
    popup("<h1>Velkommen til morsetræningen. <br> Tryk på Menu-knappen "+
      "for at skifte mellem bogstaver og morsetegn.<br>Og tryk på "+
      "morsenøglen for at skjule den.</h1><br>");
    farve = true;
    
    if (tidstagningTil) {startUr();}
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
  
  start();


}) // main