$(document).ready(function(){

  function getData() {
    return $.getJSON('data.json');
  }

  $.when(getData()).then(function (data) {
    var allImages = data;
    var boxes = 4;
    var images = [];
    var finalImages = [];
    var duplicateImages = [];
    var wrapperSize;
    var rows = 4;
    var started = 0;
    var count = 0;
    var picked = [];
    var isDone = 0;

    $('.level').prop('selectedIndex',0);

    $('.level').on('change', function(){
      switch($(this).val()){
        case  "1":
          boxes = 4;
          rows = 4;
          break;
        case  "2":
          boxes = 6;
          rows = 4;
          break;
        case  "3":
          boxes = 8;
          rows = 4;
          break;
        case  "4":
          boxes = 10;
          rows = 5;
          break;
        case  "5":
          boxes = 12;
          rows = 6;
          break;
        default:
          boxes = 4;
      }
    })

    $('.start').on('click', function(){
      startGame();
    });

    function startGame(){ 
      $('.result').animate({"opacity":"0","z-index":"-1"},500);
      isDone = 0;
      images = [];
      images = getRandom(allImages, boxes);
      duplicateImages = [];
      duplicateImages = images.concat(images);
      finalImages = [];
      finalImages = shuffle(duplicateImages);
      $('.wrapper').html($('.result'));
      insertBox();
      wrapperWidth()
      flipOverAll();
      flipOver();
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

    images  = getRandom(allImages, boxes);

    //duplicate images
    duplicateImages = images.concat(images);

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
    finalImages = shuffle(duplicateImages);

    function insertBox(){
      for(var i = 0; i < finalImages.length; i++){
        $('.wrapper').append('<div class = "box"><div class="back"></div><div class="front"><img src = "img/'+ finalImages[i]+'.png" alt = "image"></div></div>');
      } 
    }
    insertBox();
    wrapperWidth();
    $(window).on('resize',function(){
      wrapperWidth();
    });
    function wrapperWidth(){
      wrapperSize = (parseInt($('.box').width()) * parseInt(rows))+(parseInt(boxes)*7) + 40;
      $('.wrapper').css("width",wrapperSize + "px");
    }

    function flipOverAll(){
      $('.box').each(function(){
        $(this).addClass('flip');
      });
    }

    function flipOver(){     console.log(boxes);
      $('.box').on('click',function(){ 

        if($(this).hasClass("flip")){
          started ++;
        }

        if(started == 1 || started == 2){ 
          $(this).removeClass('flip')
        }

        if(started == 2){
          if(!$(this).hasClass("flip")){

            $('.box').each(function(){
              if(!$(this).hasClass("flip")){
                count ++;
                $(this).addClass('needToRemove');
                picked.push($(this).find('img').attr('src'));
              }
            });

            if(count == 2 && picked[0] == picked[1]){
              setTimeout(function(){
                $('.needToRemove').find('img').animate({"opacity":0},700);
                $('.needToRemove .back').css("background","transparent");
                $('.box').addClass('flip');
                isDone++;
                started = 0;
                if(isDone == boxes){
                  $('.result').animate({"opacity":"1","z-index":"10"},500);
                }

              },700);
            }else{
              resetFlip()
            }
          } else{
            resetFlip()
          }

          setTimeout(function(){
            picked = [];
            count = 0;
            $('.box').removeClass('needToRemove');
          },1000);

        } 
      });

      function resetFlip(){
        setTimeout(function(){
          $('.box').addClass('flip');
          setTimeout(function(){
            started = 0; 
          },200);
        },700);
      }         
    }
    
    setTimeout(function(){
      flipOverAll();
      flipOver();
    },10);

  });
})