$(document).ready(function () {

  //Calculating cell-column-name
  
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
    let column = $(`<div class="column-name colId-${i}" id="colCod-${ans}">${ans}</div>`); //making each column head name
    $(".column-name-container").append(column); //appending it in column-name-container

    let row = $(`<div class="row-number" id="${i}">${i}</div>`); //same way, making each row head number
    $(".row-number-container").append(row);    //appending it in row-number-container
  }

  //generating cells, row-wise

  for (let i = 1; i <= 100; i++) {
    let row = $(`<div class="cell-row"></div>`); //make a row
    
    for (let j = 1; j <= 100; j++) {
      let colCode = $(`.colId-${j}`).attr("id").split("-")[1];  //getting the column code
      
      //making the cell, with row and column number, and column code

      let cell = $(`<div class="input-cell" contenteditable="false" id="row-${i}-col-${j}" data="code-${colCode}"></div>`);
      row.append(cell); //appending the cell in the row
    }

    //when all cells are appended in a single row

    $(".input-cell-container").append(row); //we then append the row in the input container cell

    //in this ways the loop runs, and all the rows are added one by one
    
  }


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
      updateHeader(this);
    }

  });

  function updateHeader(ele){

    let [row,col] = getRowCol(ele);
    let cellInfo = defaultProperty;


    if(cellData[selectedSheet][row] && cellData[selectedSheet][row][col] ){
      cellInfo=cellData[selectedSheet][row][col];

      !cellInfo["font-weight"]?$(".icon-bold").removeClass("selected"):$(".icon-bold").addClass("selected");
      !cellInfo["font-style"]?$(".icon-italic").removeClass("selected"):$(".icon-italic").addClass("selected");
      !cellInfo["text-decoration"]?$(".icon-underline").removeClass("selected"):$(".icon-underline").addClass("selected");

      let alignment=cellInfo["text-align"];

      $(".align-icon").removeClass("selected");
      $(".align-icon-"+alignment).addClass("selected");
      
    }
  }

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


const defaultProperty={
  text:"",
  "color":"black",
  "background-color":"white",
  "font-family":"Arial",
  "font-style":"",
  "font-weight":"",
  "font-size":14,
  "text-decoration":"",
  "text-align":"left"
};

let selectedSheet="Sheet1";

let totalSheets=1;

let cellData={
  "Sheet1":{}
};


function updateCell(property,value,defaultPossible){
  $(".input-cell.selected").each(function(){
    $(this).css(property,value);

    let [row,col]=getRowCol(this);

    if(cellData[selectedSheet][row]){
      if(cellData[selectedSheet][row][col]){
        cellData[selectedSheet][row][col][property]=value;
      }
      else{
        cellData[selectedSheet][row][col]={...defaultProperty};
        cellData[selectedSheet][row][col][property]=value;
      }
    }
    else{
      cellData[selectedSheet][row]={};
      cellData[selectedSheet][row][col]={...defaultProperty};
      cellData[selectedSheet][row][col][property]=value;
    }

    if(defaultPossible && JSON.stringify(cellData[selectedSheet][row][col])===JSON.stringify(defaultProperty)){
      delete cellData[selectedSheet][row][col];

      if(Object.keys(cellData[selectedSheet][row]).length==0){
        delete cellData[selectedSheet][row];
      }
    }

    console.log(cellData);

  });
}

$(".icon-bold").click(function(){
  if($(this).hasClass("selected")){
    updateCell("font-weight","",true);
  }
  else{
    updateCell("font-weight","bold",false);
  }
  
});

$(".icon-italic").click(function(){
  if($(this).hasClass("selected")){
    updateCell("font-style","",true);
  }
  else{
    updateCell("font-style","italic",false);
  }
  
});

$(".icon-underline").click(function(){
  if($(this).hasClass("selected")){
    updateCell("text-decoration","",true);
  }
  else{
    updateCell("text-decoration","underline",false);
  }
  
});

$(".align-icon-left").click(function(){
  if($(this).hasClass("selected")){
    updateCell("text-align","",true);
  }
  else{
    updateCell("text-align","left",false);
  }
});

$(".align-icon-center").click(function(){
  if($(this).hasClass("selected")){
    updateCell("text-align","",true);
  }
  else{
    updateCell("text-align","center",false);
  }
});


$(".align-icon-right").click(function(){
  if($(this).hasClass("selected")){
    updateCell("text-align","",true);
  }
  else{
    updateCell("text-align","right",false);
  }
});