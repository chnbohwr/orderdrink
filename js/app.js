var drinkapp = ons.bootstrap('drinkapp', ['onsen','angularMoment','checklist-model']);

drinkapp.run(function(amMoment) {
    amMoment.changeLocale('zh-tw');
    
});