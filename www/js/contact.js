var index;
var contacts;
var id;

function onLoad() {
  document.addEventListener("deviceready", onDeviceReady, false);
}

function onDeviceReady() {
  contact();
}

function contact() {
  function onSuccess(contacts) {
    contacts.sort(compare);
    this.contacts=contacts;
    for (var i = 0; i < contacts.length; i++) {
      $("#contact").append("<li id="+i+"><div><h2>"+contacts[i].displayName+"</h2></div><div><a href='tel:"+contacts[i].phoneNumbers[0].value+"'><img id="+i+" src='img/tel.png'></a><img class='delete' id="+i+" src='img/delete.png'></img></div></li>");
    }
  };
  function onError(contactError) {
      alert('onError!');
  };

  // find all contacts with 'Bob' in any name field
  var options      = new ContactFindOptions();
  options.multiple = true;
  options.hasPhoneNumber = true;
  var fields       = [navigator.contacts.fieldType.displayName, navigator.contacts.fieldType.name];
  navigator.contacts.find(fields, onSuccess, onError, options);
}




$("document").ready(function () {
  $("body").on("click", "img[class='delete']", function(){
    var id = $(this).attr('id');
    var name = $("li[id="+id+"]").text();
    index = id;
    var buttonLabels = ["Oui", "Annuler"];
    navigator.notification.confirm("Voulez-vous vraiment supprimer "+name+" ?", onConfirm, "Supprimer un contact", buttonLabels);
  });

  $("body").on("click", "li", function(){
    id = $(this).attr("id");
    if (contacts[id].emails == null) {
      var mail = "Pas d'emails";
    }else {
      var mail = contacts[id].emails[0].value;
    }

    if (contacts[id].addresses == null) {
      var adresse = "Pas d'adresse";
    }else {
      var adresse = contacts[id].addresses[0].streetAddress;
    }


    console.log();
    $("li[id="+id+"]").append("<li><p>"+adresse+"\n"+mail+"</p></li>");
  });

  $("img[id=add]").click(function() {
    var nouvNom = prompt("Donner le nom du contact");
    var nouveau = navigator.contacts.create({"displayName": nouvNom});
    var name = new ContactName();
    name.givenName = nouvNom;
    nouveau.name=name;
    var phone = [];
    var nouvPhone = prompt("Donner le nom du contact");
    phone[0]=new ContactField('work',nouvPhone, false);
    nouveau.phoneNumbers=phone;
    nouveau.save(onSuccessCallBack,onErrorCallBack);
  });
});

function compare(a,b) {
  if (a.displayName< b.displayName)
     return -1;
  if (a.displayName> b.displayName)
    return 1;
  return 0;
}

function onConfirm(buttonIndex) {
  if(buttonIndex == 1){
    contacts[index].remove();
    $("li[id="+index+"]").remove();
  }
}

function onSuccessCallBack(contact) {
  alert("Enregistré !");
}
function onErrorCallBack() {
  alert("Erreur :"+contactError.code);
}
