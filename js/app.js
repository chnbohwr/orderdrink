var drinkapp = ons.bootstrap('drinkapp', ['onsen', 'angularMoment', 'checklist-model', 'rn-lazy']);

drinkapp.run(function (amMoment) {
    amMoment.changeLocale('zh-tw');

});
