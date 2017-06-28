import { Template} from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './cursos.html';
Template.cursos.onCreated(function(){
        
});

Template.cursos.helpers({
    readyCursos : function(){
        return FlowRouter.subsReady("getCursos");
    },
    listCursos : function(){
        return CURSOS.find();
    },
    listMiCursos : function(){
        var user = INTEGRANTES.find({idUs:Meteor.userId()}).fetch();
        //console.log(user);
        var row = [];
        for (var i = 0;i<user.length ; i++) {
            var cons = CURSOS.find({_id:user[i].idCur}).fetch()[0];
            row.push(cons);
        }
        //console.log(row);
        return row;

        //return CURSOS.find({_id:user.idCur});
    },
});

Template.cursos.events({
    'click .cursos': function(e){
        e.preventDefault();
        alert('click');
        //userId.set(e.target.);
        //var idUser= e.target.id;
        //console.log(AMIGOS.find({$and:[{idUser:Meteor.userId()},{aceptado:true}]}).fetch());
        //console.log(idUser);
       /* Meteor.call('agregarAmigo', idUser, function(error,result){
            if (error) {
                alert(error.msj);
            }
            if (result) {
                alert(result.msj);
            }
        });*/
        //alert("Se envio la solicitud");
    }
    
});


Template.itemCurso.helpers({
    ifMiembro : function () {
       var miembro = INTEGRANTES.find({idCur:this._id}).fetch();
       //console.log(miembro.length);
       if (miembro.length>0) {
        return true;
       }
       return  false;
    }
});
Template.itemCurso.events({
    'click .curso': function (e) {
        //console.log(this);        
        FlowRouter.go('/curso',1,{idCur:this._id,idUs:Accounts.user()._id});

    },
    'click .tomarc': function(e){
        var obj = {
            idCur : this._id,
            idUs : Meteor.userId()
        }
        Meteor.call('tomarCurso', obj, function (error, result) {  
            if (error) {
                console.log(error);
            }
        });

        //console.log(obj);
    
    },
    'click .elicurso' : function(){
        var conf = confirm('Esta seguro de eliminar el curso');
        if (conf==true) {
            //console.log(this);
            Meteor.call('eliCurso', this._id, function (error, result) {});
        }
    } 

});
Template.curso.onCreated(function(){
    var idCur = FlowRouter.getQueryParam('idCur');

    //console.log(idCur);
})
Template.curso.helpers({
    getCurso: function () {
        return CURSOS.find();
    }
});
Template.curso.events({
    'click': function () {
        // ...
    }
});