(function () {

  angular
    .module('loc8rApp')
    .controller('homeCtrl', homeCtrl);

  function homeCtrl () {
    var vm = this;
    vm.pageHeader = {
      title: 'Loc8r',
      strapline: 'Find places to work with wifi near you!'
    };
    vm.sidebar = {
      content: "Looking for wifi and a seat? Loc8r helps you find places to work when out and about. Perhaps with coffee, cake or a pint? Let Loc8r help you find the place you're looking for."
    };
  }

})();