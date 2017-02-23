
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
					$scope.imdbFilmes = [];
					if(errorMessage == "Movie not found!") {
						$scope.message = "Filme não encontrado!";
					}
					else if(errorMessage == "Something went wrong.") {
						$scope.message = "Campo em branco!";
					}
				}
				else {
					$scope.message = "";
					$scope.imdbFilmes = [];
					/*data.data.Search.forEach(function(filme) {*/
					angular.forEach($scope.imdbFilmes.data.data.Search, function() {
						var poster = geraCapa(filme);

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
		var geraCapa = function(filme) {
			if(filme.Poster !== "N/A") {
				return filme.Poster;
			}
			else { return "./image/no-picture.jpeg"; };
		};
		$scope.adicionarFilme = function(imdbFilmes) {
			$scope.imdbFilmes = imdbFilmes.filter(function(imdbFilme){
				if (!imdbFilme.selecionado) return imdbFilme;
			});
		};
		$scope.checkAll = function() {
			if($scope.selectedAll) {
				$scope.selectedAll = true;
			} else {
				$scope.selectedAll = false;
			}
			angular.forEach($scope.imdbFilmes, function(imdbFilme) {
				imdbFilme.selecionado = $scope.selectedAll;
			});
		}										
	});
})();