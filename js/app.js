var drinkapp = ons.bootstrap('drinkapp', ['onsen','angularMoment']);

drinkapp.run(function(amMoment) {
    amMoment.changeLocale('zh-tw');
});