(function () {

  angular
    .module('loc8rApp')
    .controller('locationDetailCtrl', locationDetailCtrl);

  locationDetailCtrl.$inject = ['$routeParams', 'loc8rData'];
  function locationDetailCtrl ($routeParams, loc8rData) {
    var vm = this;
    vm.locationid = $routeParams.locationid;

    loc8rData.locationById(vm.locationid)
      .success(function(data) {
        vm.data = { location: data };
        vm.pageHeader = {
          title: vm.data.location.name
        };
      })
      .error(function (e) {
        console.log(e);
      });

/*
    vm.popupReviewForm = function () {
      var modalInstance = $modal.open({
        templateUrl: 'review-modal/review-modal.view.html',
        controller: 'reviewModalCtrl as vm',
        // controllerAs: 'vm'  // AngularUI bug prevents this from working
        resolve : {
          locationid : function () {
            return vm.locationid;
          },
          locationName : function () {
            return vm.data.location.name;
          }
        }
      });

      modalInstance.result.then(function (data) {
        vm.data.location.reviews.push(data);
      });

    };*/
  }

})();