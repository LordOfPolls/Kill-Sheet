var ss = SpreadsheetApp.getActiveSpreadsheet();
var sheet = ss.getSheets()[0]

function forceUpdate(){
    var range = sheet.getRange("A6:K1000");
    range.sort({column: 9, ascending: false});  
    onEdit();
}

function onEdit(){
  var cell = ss.getActiveCell();
  if (cell.getColumn() == "11"){
    var range = sheet.getRange(cell.getRow(), "10");
    var value = cell.getValue() + range.getValue();
    range.setValue(value)
    cell.clear();
  }
  if (cell.getColumn() == "11" || cell.getColumn() == "10"){
    var range = sheet.getRange("A6:K100");
    range.sort({column: 9, ascending: false});
  }
  for (i = 0; i < ss.getSheets().length; i++){
    ss.getSheets()[i].autoResizeColumn(cell.getColumn());
  }
}

function MeetingView(){
  var range = sheet.getRange("L33:M39");
  range.setFontColor("white");
  sheet.hideColumns(4);
  sheet.hideColumns(5);
  sheet.hideColumns(7)
}

function AdminView(){
  sheet = ss.getActiveSheet();
  var range = sheet.getRange("L33:M39");
  range.setFontColor("black");
  sheet.showColumns(1, 10);
}

function NewAssassinTheHunt(){
  var lRow = sheet.getLastRow();
  var lCol = sheet.getLastRow();
  var ui = SpreadsheetApp.getUi();
  var ID = "Pending";
  
  var response = ui.prompt("New Assassin", "Enter their real name:", ui.ButtonSet.OK_CANCEL);
  if (response.getSelectedButton() == ui.Button.OK){
    var name = response.getResponseText();
  }else{
    return
  }
  
  var response = ui.prompt("New Assassin", "Enter their Assassin name:", ui.ButtonSet.OK_CANCEL);
  if (response.getSelectedButton() == ui.Button.OK){
    var assassinName = response.getResponseText();
  }else{
  return
       }
  
  var response = ui.prompt("New Assassin", "Enter their student ID:", ui.ButtonSet.OK_CANCEL);
  if (response.getSelectedButton().OK){
    var ID = response.getResponseText();
  }
  if (ID.length == 0){
    ID = "Pending";
  }
  if (assassinName.length == 0){
    assassinName = "Pending";
  }
  if (name.length == 0){
    name = "Pending";
  }
  
  name = name.split(" ");  
  lRow = lRow + 1;
  sheet.getRange(lRow-1, 1).copyTo(sheet.getRange(lRow, 1));    
  sheet.getRange(lRow, 2).setValue(name[0]);
  sheet.getRange(lRow, 3).setValue(name[1]);
  sheet.getRange(lRow, 4).setValue(ID);
  sheet.getRange(lRow, 5).setValue("No Membership Paid");
  sheet.getRange(lRow-1, 6).copyTo(sheet.getRange(lRow, 6));
  sheet.getRange(lRow, 6).setValue("FALSE");
  sheet.getRange(lRow-1, 7).copyTo(sheet.getRange(lRow, 7));
  sheet.getRange(lRow, 8).setValue(assassinName);
  sheet.getRange(lRow, 9).setValue("0");
  sheet.getRange(lRow, 10).setValue("0");
  }


function NewAssassinHVZ(){
  sheet = ss.getActiveSheet();
  var lRow = sheet.getLastRow() + 1;
  var lCol = sheet.getLastRow();
  var ui = SpreadsheetApp.getUi();
  var ID = "Pending";
  var ID = ui.prompt("New Human", "Enter their ID/Email", ui.ButtonSet.OK_CANCEL);
  if (ID.getSelectedButton() == ui.Button.OK){
    var ID = ID.getResponseText();
  }else{
    return
  }
  var dataRange = ss.getSheets()[0].getDataRange();
  var values = dataRange.getValues();
  var outRow = null;

  for (var i = 0; i < values.length; i++) {
    if (values[i][3] == ID) {
      outRow = i;
    }    
  }
  if (outRow == null){
      ui.alert("Error: No assassin exists with that ID/Email");
  }else{
    var FirstName = values[outRow][1];
    var LastName = values[outRow][2];
    var ID = values[outRow][3];
    var Alias = values[outRow][7];
    
    for (var i=1; i < 10; i++){
      sheet.getRange(lRow-1, i).copyTo(sheet.getRange(lRow, i));
    }
    sheet.getRange(lRow, 2).setValue(FirstName);
    sheet.getRange(lRow, 3).setValue(LastName);
    sheet.getRange(lRow, 4).setValue(ID);
    sheet.getRange(lRow, 5).setValue("TRUE");
    sheet.getRange(lRow, 6).setValue(Alias);
    sheet.getRange(lRow, 7).setValue("0");
    sheet.getRange(lRow, 8).setValue("0");
    sheet.getRange(lRow, 9).setValue("0");
  }

}



function NewAssassin(){
  sheet = ss.getActiveSheet();
  //Browser.msgBox(sheet.getSheetId())
  if (sheet.getSheetId() == 0){
    NewAssassinTheHunt();
  }
  if (sheet.getSheetId() == 957599606){
    NewAssassinHVZ();
  }
}
