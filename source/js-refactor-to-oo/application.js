var DiceApp = {};
$(document).ready(function() {

  var eventingSelectors = {
    dieAdderSelector: '#roller button.add',
    dieRollerSelector: '#roller button.roll',
  };

  DiceApp.view = new DiceApp.View({
    diceContainer: '.dice'
  });

  DiceApp.controller = new DiceApp.Controller({
    view: DiceApp.view
  });


  new DiceApp.Binder(eventingSelectors, DiceApp.controller).bind();


});


// Binding Controller
DiceApp.Binder = function(targets, controller){
  this.targets = targets;
  this.controller = controller;
};

DiceApp.Binder.prototype = {
  bind: function(){
    this.bindAddButton();
    this.bindRollButton();
  },

  bindAddButton: function(){
    var controller = this.controller;
    selection = this.targets.dieAdderSelector;
    $(selection).on('click', function(e){
      controller.dieAdderEvent(e);
    });
  },

  bindRollButton: function(){
    var controller = this.controller;
    selection = this.targets.dieRollerSelector;
    $(selection).on('click', function(e){
      controller.diceRollerEvent(e);
    });
  }
};

DiceApp.Controller = function(opts){
  this.view = opts.view;
  this.dice = [];
};

DiceApp.Controller.prototype = {
  dieAdderEvent: function(e){
    var dieId = this.dice.length;
    this.dice.push( new Die(dieId) );
    console.log('WAT');
    this.view.addDie(dieId);
  },

  diceRollerEvent: function(e){
    for(var index in this.dice){
      var die = this.dice[index];
      die.roll();
      this.view.updateDieValue({
        dieId: index,
        value: die.side});
    }
  }
};

// Model
var Die = function(id){
  this.id = id;
  this.side = 0;
};

Die.prototype = {
  roll: function(){
    this.side = Math.floor(Math.random() * 6 + 1);
  }
};



// View
DiceApp.View = function(opts){
  this.opts = opts;
};

DiceApp.View.prototype = {
  makeDieCode: function(id){
    return '<div class="die" id="die-'+id+'">0</div>'
  },

  addDie: function(id){
    var code = this.makeDieCode(id)
    $(this.opts.diceContainer).append( code );
  },

  getDie: function(id){
    return '#die-'+id;
  },

  updateDieValue: function(dataSource){
    $(this.getDie(dataSource.dieId)).text(dataSource.value);
  }
};