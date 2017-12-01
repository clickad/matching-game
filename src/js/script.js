$(document).ready(function(){

  function getData() {
    return $.getJSON('data.json');
  }

  $.when(getData()).then(function (data) {
    var allImages = data;
    var boxes;
    var images = [];
    var finalImages = [];
    var resultImages = [];
    var counter = 3;
    var count;
    var sec = counter;
    var startImages = [];
    var compareImages = [];
    var src, src2;
    var ct = 0;
    $('.level').prop('selectedIndex',0); 
    var currentLevel = parseInt($('.level').val());

    $( ".result-boxes" ).sortable({
      placeholder: "highlight",
      cursor: "move"
    });
    $( ".result-boxes" ).disableSelection();

    $('.level').on('change', function(){
      currentLevel = parseInt($(this).val());
      levelChange(currentLevel);
    });

    function levelChange(level){
      switch(level){
        case  1:
          boxes = 3;
          counter = 3;
          break;
        case  2:
          boxes = 4;
          counter = 3;
          break;
        case  3:
          boxes = 6;
          counter = 5;
          break;
        case  4:
          boxes = 8;
          counter = 10;
          break;
        case  5:
          boxes = 10;
          counter = 20;
          break;
        default:
          boxes = 3;
      }
    }

    // get random images from all images
    function getRandom(arr, count) {
      var rand = arr.slice(0), i = arr.length, min = i - count, temp, index;
      while (i-- > min) {
        index = Math.floor((i + 1) * Math.random());
        temp = rand[index];
        rand[index] = rand[i];
        rand[i] = temp;
      }
      return rand.slice(min);
    }

    //sfuffle images
    function shuffle(array) {
      var currentIndex = array.length, temporaryValue, randomIndex;
      // While there remain elements to shuffle...
      while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }
      return array;
    }

    function insertBox(){
      for(var i = 0; i < finalImages.length; i++){
        $('.start-boxes').append('<div class = "box"><img src = "img/'+ finalImages[i]+'.png" alt = "image"></div>');
      } 
    }

    function countDown(){
      resultImages = [];
      $('.start-boxes').animate({"opacity":"0"},1000);

      setTimeout(function(){
        $('.result-boxes').animate({"opacity":"1"},1000);
      },1500);

      $('.box').each(function(){
        resultImages.push($(this).find('img').attr('src'));
      });
      resultImages = shuffle(resultImages);
      for(var i = 0; i < resultImages.length; i++){
        $('.result-boxes').append('<div class = "box"><img src = "'+resultImages[i]+'" alt = "image"></div>');
      }
    }

    function timer(){
      $('.start').prop("disabled","true");
      $('.level').prop("disabled","true");
      $('.counter').css("opacity","1");
      $('.counter').html(sec);
      sec--;
      if(sec == -1){
        clearInterval(count);
        sec = counter;
        $('.start').prop("disabled","");
        $('.level').prop("disabled","");
        setTimeout(function(){
          $('.counter').html('');
          $('.counter').css("opacity","0");
          setTimeout(function(){
            $('.submit').animate({"opacity":"1"},500);
          },1500);

        },700);
        countDown();
      }
    }


    function checkResult(){
      ct = 0;
      compareImages = [];
      startImages= [];
      $('.result-boxes .box').each(function(){
        src = $(this).find('img').attr('src').toString();
        compareImages.push(src);
      });
      $('.start-boxes .box').each(function(){
        src2 = $(this).find('img').attr('src').toString();
        startImages.push(src2);
      });

      for (var i = 0; i < compareImages.length; ++i) {
        if (compareImages[i] == startImages[i]){ 
          ct++;
        }
      } 
      if(ct == compareImages.length){
        $('.correct').animate({"opacity":"1"},500);
        setTimeout(function(){
          $('.correct').animate({"opacity":"0"},500);
          currentLevel++;
          $('.level').val(currentLevel);
          $('.start').trigger('click');
        },2000);
      }else{
        $('.wrong').animate({"opacity":"1"},500);
        setTimeout(function(){
          $('.wrong').animate({"opacity":"0"},500);
          currentLevel = 1;
          $('.level').val(currentLevel);
          $('.start').trigger('click');
        },2000);  
      }
    }

    function startGame(){ 
      levelChange(currentLevel);
      $('.start-text').animate({"opacity":"0"},500);
      $('.start-boxes').animate({"opacity":"1"},1000);
      $('.result-boxes').animate({"opacity":"0"},1000);
      $('.submit').animate({"opacity":"0"},500);
      $('.start-boxes').html('');
      $('.result-boxes').html('');
      $('.result').animate({"opacity":"0"},500);
      images = [];
      images = getRandom(allImages, boxes);
      finalImages = [];
      finalImages = shuffle(images);
      insertBox();
      sec = counter;
      count = setInterval(function(){timer()},1000);
    }

    $('.start').on('click', function(){
      $(this).prop("disabled","true");
      startGame();
    });

    $('.submit').on('click',function(){
      checkResult();
    });

  });
})