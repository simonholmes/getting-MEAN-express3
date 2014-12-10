(function () {

  angular
    .module('loc8rApp')
    .controller('reviewModalCtrl', reviewModalCtrl);

  reviewModalCtrl.$inject = ['$modalInstance', 'locationData'];
  function reviewModalCtrl ($modalInstance, locationData) {
    var vm = this;
    vm.locationData = locationData;

    vm.onSubmit = function () {
      console.log(vm.formData);
      return false;
    };

    vm.modal = {
      cancel : function () {
        $modalInstance.dismiss('cancel');
      }
    };

  }

})();