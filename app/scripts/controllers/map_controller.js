
angular.module('ligatorApp')
.controller('MapCtrl', ['$scope','Entity','GeoCoder',function($scope,Entity,GeoCoder) {

	//will be set in mapsInitialized
	$scope.map;
	$scope.markers = [];
  	$scope.$on('mapsInitialized', function(event, maps) {
   	  	$scope.map = maps[0]
   		GeoCoder.geocode({address: 'Boston,MA'}).then(function(result) {
   			$scope.map.setCenter(result[0].geometry.location)
  		});
    $scope.markAddress = function(org){
      var addy = org.street + "," + org.city + "," +  org.state + "," +  org.zipcode; 
      GeoCoder.geocode({address:addy}).then(function(result) {
        
        $scope.markers[0] = new google.maps.Marker({title:"YES"});
        $scope.markers[0].setPosition(result[0].geometry.location);
        $scope.markers[0].setTitle(org.name);
        $scope.markers[0].setMap($scope.map);
        $scope.bounds.extend(result[0].geometry.location);
        $scope.map.fitBounds($scope.bounds);
      })
    }
   	$scope.testo = function(){
   		Entity.matchAll({class:'organization'}).$promise.then(
        function(success){
          $scope.orgs = success;
          for(var idx in success){
            $scope.bounds = new google.maps.LatLngBounds();
            $scope.markAddress(success[idx]);

          }    
        },
        function(failure){
          alert("BAD PROJECTS " + failure)
        }
        )
   		
   		
   	}
  });
}]);