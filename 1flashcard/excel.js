let selectedFile;
console.log(window.XLSX);
document.getElementById('input').addEventListener("change", (event) => {
    selectedFile = event.target.files[0];
})

let data=[{
    "name":"jayanth",
    "data":"scd",
    "abc":"sdef"
}]


document.getElementById('button').addEventListener("click", () => {
    XLSX.utils.json_to_sheet(data, 'out.xlsx');
    if(selectedFile){
        let fileReader = new FileReader();
        fileReader.readAsBinaryString(selectedFile);
        fileReader.onload = (event)=>{
         let data = event.target.result;
         let workbook = XLSX.read(data,{type:"binary"});
         console.log(workbook);
         workbook.SheetNames.forEach(sheet => {
              var rowObject = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheet]);
              console.log(rowObject);
              localStorage.setItem('user', JSON.stringify(rowObject, undefined, 4));
         });
        }
    }

    setTimeout(() => {Game() }, 2000);
});


/// results

function Game() {

    var colorArray=["#019875","#1E8BC3","#D91E18","#D35400","#8E44AD","#C0392B"];
    var cardState;
    var currentQuestion=0;
    var qbank=new Array;
    var jsonData = JSON.parse(localStorage.getItem('user'));

    console.log(jsonData)

    loadDB();
    function loadDB(){
      for(i=0;i<jsonData.length;i++){
       qbank[i]=[];
       qbank[i][0]=jsonData[i].cardfront;
       qbank[i][1]=jsonData[i].cardback;
      }//for
      beginActivity();
    }//loadDB
    
    function beginActivity(){
     cardState=0;
     var color1=colorArray[Math.floor(Math.random()*colorArray.length)];
     $("#cardArea").empty();
     $("#cardArea").append('<div id="card1" class="card">' + qbank[currentQuestion][0] + '</div>');
     $("#cardArea").append('<div id="card2" class="card">' + qbank[currentQuestion][1] + '</div>');
     $("#card1").css("background-color",color1);
     $("#card2").css("background-color","#34495E");
     $("#card2").css("top","500px");
     $("#cardArea").on("click",function(){
      if(cardState!=1){
       cardState=1;
       //togglePosition();
       $("#card1").animate({top: "-=500"}, 150, function() {cardState=0;togglePosition();});
       $("#card2").animate({top: "-=500"}, 150, function() {togglePosition2();});
      }//if
     });//click function
     currentQuestion++;
     $("#buttonArea").empty();
     $("#buttonArea").append('<div id="nextButton">NEXT</div>');
     $("#nextButton").on("click",function(){
      if(currentQuestion<qbank.length){beginActivity();}
      else{displayFinalMessage();}
     });//click function
    }//beginactivity
    
    function togglePosition(){
     if($("#card1").position().top==-500){$("#card1").css("top","500px");};
    }//toggle
    
    function togglePosition2(){
     if($("#card2").position().top==-500){$("#card2").css("top","500px");};
    }//toggle2
    
    function displayFinalMessage(){
     $("#buttonArea").empty();
     $("#cardArea").empty();
     $("#cardArea").append('<div id="finalMessage">You have finished the activity.</div>');
    }//final message
    
};//end function Game