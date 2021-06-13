$(document).ready(function () {
  // ------Row Numbering------
  // let rows=document.querySelector(".row-number-container");
  //
  // let str="";
  // for(let i=1;i<=100;i++)
  // {
  //   str+=`<div class="cell-row" id="${i}">${i}</div>`;
  // }
  // rows.innerHTML=str;

  // -------Column Naming----------

  // let cols=document.querySelector(".column-name-container");
  // str="";
  for (let i = 1; i <= 100; i++) {
    let n = i;
    ans = "";
    while (n > 0) {
      let rem = n % 26;
      if (rem == 0) {
        ans = "Z" + ans;
        n = Math.floor(n / 26) - 1;
      }
      else {
        ans = String.fromCharCode(rem + 65 - 1) + ans;
        n = Math.floor(n / 26);
      }
    }
    let column = $(`<div class="column-name colId-${i}" id="colCod-${ans}">${ans}</div>`);
    $(".column-name-container").append(column);

    let row = $(`<div class="row-number" id="${i}">${i}</div>`);
    $(".row-number-container").append(row);
  }

  let str = "";

  // let cellContainer=document.querySelector(".input-cell-container");
  for (let i = 1; i <= 100; i++) {
    let row = $(`<div class="cell-row"></div>`);
    // str+=`<div class="cell-row">`;
    for (let j = 1; j <= 100; j++) {
      let colCode = $(`.colId-${j}`).attr("id").split("-")[1];
      // let colCode=document.querySelector(`.colId-${j}`).getAttribute("id").split("-")[1];
      // str+=`<div class="input-cell" contenteditable="true" id="row-${i}-col-${j}" data="code-${colCode}">${colCode}</div>`;
      let cell = $(`<div class="input-cell" contenteditable="false" id="row-${i}-col-${j}" data="code-${colCode}"></div>`);
      row.append(cell);
    }
    $(".input-cell-container").append(row);
    // str+=`</div>`
  }
  // cellContainer.innerHTML=str;


  $(".align-icon").click(function () {
    $(".align-icon.selected").removeClass("selected");
    $(this).addClass("selected");
  });

  $(".style-icon").click(function () {
    $(this).toggleClass("selected");
  });

  $(".input-cell").click(function (e) {

    $(this).addClass("selected");

    $(this).removeClass("top-cell-selected");
    $(this).removeClass("bottom-cell-selected");
    $(this).removeClass("left-cell-selected");
    $(this).removeClass("right-cell-selected");

    if (e.ctrlKey) {
      let [row,col]=getRowCol(this);

      if(row>1){
        let topCellSelected=$(`#row-${row-1}-col-${col}`).hasClass("selected");
        if(topCellSelected){
          $(this).addClass("top-cell-selected");
          $(`#row-${row-1}-col-${col}`).addClass("bottom-cell-selected");

        }
      }

      if(row<100)
      {
        let bottomCellSelected=$(`#row-${row+1}-col-${col}`).hasClass("selected");
        if(bottomCellSelected){
          $(this).addClass("bottom-cell-selected");
          $(`#row-${row+1}-col-${col}`).addClass("top-cell-selected");

        }
      }
      
       if(col>1){
          let leftCellSelected=$(`#row-${row}-col-${col-1}`).hasClass("selected");
          if(leftCellSelected){
            $(this).addClass("left-cell-selected");
            $(`#row-${row}-col-${col-1}`).addClass("right-cell-selected");

          }

        }

      if(col<100)
      {
        let rightCellSelected=$(`#row-${row}-col-${col+1}`).hasClass("selected");
        if(rightCellSelected){
          $(this).addClass("right-cell-selected");
          $(`#row-${row}-col-${col+1}`).addClass("left-cell-selected");

        }
      }
       
    }

    else {
      $(".input-cell.selected").removeClass("selected");
      $(this).addClass("selected");
    }

  });

  $(".input-cell").dblclick(function () {
    $(".input-cell.selected").removeClass("selected");
    $(this).addClass("selected");
    $(this).attr("contenteditable", "true");
    $(this).focus();
  });

  $(".input-cell").blur(function(){
    $(".input-cell.selected").attr("contenteditable","false");
  });

  $(".input-cell-container").scroll(function () {
    $(".column-name-container").scrollLeft(this.scrollLeft);
    $(".row-number-container").scrollTop(this.scrollTop);
  });

});


function getRowCol(ele) {
  let idArray = $(ele).attr("id").split("-");
  let row = parseInt(idArray[1]);
  let col = parseInt(idArray[3]);
  return [row, col];
}


function updateCell(property,value){
  $(".input-cell.selected").each(function(){
    $(this).css(property,value);
  })
  
}

$(".icon-bold").click(function(){
  if($(this).hasClass("selected")){
    updateCell("font-weight","");
  }
  else{
    updateCell("font-weight","bold");
  }
  
});

$(".icon-italic").click(function(){
  if($(this).hasClass("selected")){
    updateCell("font-style","");
  }
  else{
    updateCell("font-style","italic");
  }
  
});

$(".icon-underline").click(function(){
  if($(this).hasClass("selected")){
    updateCell("text-decoration","");
  }
  else{
    updateCell("text-decoration","underline");
  }
  
});



