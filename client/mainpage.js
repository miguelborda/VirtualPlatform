Template.mainpage.onRendered(function() {
	$('.button-collapse').sideNav();
	$('.dropdown-button').dropdown({
      inDuration: 300,
      outDuration: 225,
      constrainWidth: false, // Does not change width of dropdown to that of the activator
      hover: true, // Activate on hover
      gutter: 0, // Spacing from edge
      belowOrigin: true, // Displays dropdown below the button
      alignment: '', // Displays dropdown with edge aligned to the left of button
      stopPropagation: false // Stops event propagation
    });
    //$(".dropdown-button").dropdown();
	$('#modal1').modal();
	//$(".panelForm").css("opacity",0);

});
Template.mainpage.helpers({
	username : function(){
		return Accounts.user().username;
	}
});


Template.mainpage.events({
	"click #login" : function(){
		//$(".panelForm").css("opacity",1);
		$(".panelForm").fadeIn('slow');
	},
	"click #logout" : function(e){
		e.preventDefault();
		Meteor.logout();
		$(".panelLogout").fadeOut('slow');
		FlowRouter.go('/')
	},
	"click .logout" : function(){
		//$(".panelForm").css("opacity",1);
		$(".panelLogout").fadeToggle('slow');
		setTimeout(function(){
			$(".panelLogout").fadeOut('slow');
		},5000);
	}
});
Template.welcome.events({
	'click button': function (e) {
		var id = e.target.id;
		//console.log(id);
		if (id=='student') {
			var conf = confirm('Esta seguro de inscribirse como Estudiante')
			if (conf==true) {
				Meteor.call('insertRol', id);
			}
		}
		if (id=='easier'||id=='admin') {
			var verif = prompt("Porfavor introduzca el codigo de acceso...","1234")
			if (verif=="1234") {
				Meteor.call('insertRol', id);
				return true;
			}
			if (verif=="4321") {
				Meteor.call('insertRol', id);
				return true;
			}
			alert('El codigo no es correcto vuelva a intentarlo');
			
		}
		
	}
});