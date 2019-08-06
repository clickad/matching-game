import _ from 'lodash';
import './css/style.css';
import Data from './js/data.js';
import Main from './js/main.js';
import Result from './js/result.js';
import Start from './js/start.js';

let data = new Data();
$(window).on("load",()=>{
  $.when(data.getData()).then((data)=>{
    let main = new Main();
    let start = new Start();
    let result = new Result();
    start.prepareGame(data);
    main.$start.on('click', ()=>start.startGame(data));
    main.$window.on('resize', ()=>main.wrapperWidth());
    $('.box').on('click', (event)=>result.checkChoosen(event));
  });
})