
(function() {
	var app = angular.module("easyCatalog", []);
	app.controller("easyCatalogCtrl", function($scope, $http) {
		
		$scope.buscarFilmeImdb = function(nomeFilmeImdb) {
			$http.get("https://www.omdbapi.com/?t=" + nomeFilmeImdb).then(successCallback, errorCallback);
			function successCallback(data, status) {
				/* var err1 = data.data.Response;
				var err2 = data.data.Error;
				if(err1 = "False") {
					if(err2 = "Movie not found!") {
						$scope.message = "Filme não encontrado!";
					}
					else if(err2 = "Something went wrong.") {
						$scope.message = "Campo em branco!";
					}
				}
				else { */

				$scope.titulo = data.data.Title;
				$scope.ano = data.data.Year;
				$scope.genero = data.data.Genre;
				$scope.diretor = data.data.Director;
				$scope.elenco = data.data.Actors;
				$scope.sinopse = data.data.Plot;
				$scope.nacionalidade = data.data.Country;
				$scope.poster = data.data.Poster;

				//	$scope.objetoFilme = data.data;
				/* } */
			};
			function errorCallback(data, status) {
				$scope.errMessage = "Aconteceu um problema: " + data.data;
			};
		};
		var carregarPoster = function(poster) {
			if(poster !== "N/A") {
				$scope.posterFilme = poster; 
			}
			else 
				{ $scope.posterFilme = "./image/no-picture.jpeg"; }
		};
		carregarPoster();
	});
})();