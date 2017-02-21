
(function() {
	var app = angular.module("easyCatalog", []);
	app.controller("easyCatalogCtrl", function($scope, $http) {
		
		$scope.imdbFilmes = [];

		$scope.buscarImdbFilme = function(nomeImdbFilme) {
			$http.get("https://www.omdbapi.com/?s=" + nomeImdbFilme).then(successCallback, errorCallback);
			function successCallback(data, status) {
				var hasError = data.data.Response;
				var errorMessage = data.data.Error;
				if(hasError == "False") {
					if(errorMessage == "Movie not found!") {
						$scope.message = "Filme não encontrado!";
					}
					else if(errorMessage == "Something went wrong.") {
						$scope.message = "Campo em branco!";
					}
				}
				else {

					data.data.Search.forEach(function(filme) {
						
						var geraCapa = function(filme) {
							if(filme.Poster !== "N/A") {
								return poster = filme.Poster;
							}
							else { return poster ="./image/no-picture.jpeg"; };
						};
						
						geraCapa(filme);

						$scope.imdbFilmes.push({

							titulo: filme.Title,
							ano: filme.Year,
							tipo: filme.Type,
							imdbId: filme.imdbID,
							poster: poster
						});
						
					});
				}
			};
			function errorCallback(data, status) {
				$scope.message = "Aconteceu um problema: " + data.data;
			}
		};
		
	});
})();