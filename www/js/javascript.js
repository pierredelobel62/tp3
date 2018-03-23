function onLoad() {
  document.addEventListener("deviceready", onDeviceReady, false);
  document.addEventListener("batterystatus", onBatteryStatus, false);
}

function onDeviceReady() {
  checkConnection();
  StatusBar.backgroundColorByName("gray");
  navigator.globalization.getPreferredLanguage(
    function (language) {alert('Langue: ' + language.value + '\n');},
    function () {alert('Error getting language\n');}
  );
}

function checkConnection() {
  var networkState = navigator.connection.type;
  var states = {};
  states[Connection.UNKNOWN]  = 'Unknown connection';
  states[Connection.ETHERNET] = 'Ethernet connection';
  states[Connection.WIFI]     = 'WiFi connection';
  states[Connection.CELL_2G]  = 'Cell 2G connection';
  states[Connection.CELL_3G]  = 'Cell 3G connection';
  states[Connection.CELL_4G]  = 'Cell 4G connection';
  states[Connection.CELL]     = 'Cell generic connection';
  states[Connection.NONE]     = 'No network connection';

  if(navigator.network.connection.type == Connection.NONE){
    alert("Device is offline"+"\nModèle :"+device.model+"\nSystème d'exploitation :"+device.platform+"\nUUID :"+device.uuid);
  }else{
    alert("Device is connected to "+states[networkState]+"\nModèle :"+device.model+"\nSystème d'exploitation :"+device.platform+"\nUUID :"+device.uuid);
  }
}

function onBatteryStatus(status) {
  if(status.level < 20){
    alert("Batterie: " + status.level + "\nest branché: " + status.isPlugged);
  }else{
    alert("Batterie faible, veuillez la recharger");
  }
}
