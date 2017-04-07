
(function() {
	var app = angular.module("easyCatalog", []);
	app.controller("easyCatalogCtrl", function($scope, $http) {
		
		$scope.imdbFilmes = [];
		$scope.nomeImdbFilme = "";

		$scope.buscarImdbFilme = function() {
			$http.get("https://www.omdbapi.com/?s=" + this.nomeImdbFilme).then(successCallback, errorCallback);
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
					angular.forEach(data.data.Search, function(filme) {
						
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
			}
			function errorCallback(data, status) {
				$scope.message = "Aconteceu um problema: " + data.data;
			}
		};
		var geraCapa = function(filme) {
			if(filme.Poster !== "N/A") {
				return filme.Poster;
			}
			else { return "./image/no-picture.jpeg"; }
		};
		$scope.pressEnter = function(evento) {
			if(evento.which === 13)
				$scope.buscarImdbFilme();
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
		};
		$scope.modalImdb = function(selected) {
			$scope.selected = selected;
		};
		$scope.buscarModalInfo = function(id) {
			$http.get("https://www.omdbapi.com/?i=" + id).then(successCallback, errorCallback);
			function successCallback(data, status) {
				
				var hasErrorModal = data.data.Response;
				var errorMessageModal = data.data.Error;
				if(hasErrorModal == "False") {
					$scope.modalMovieInfo = {};
					if(errorMessageModal == "Movie not found!") {
						$scope.messageModal = "Filme não encontrado!";
					}
					else if(errorMessageModal == "Something went wrong.") {
						$scope.messageModal = "Campo em branco!";
					}
				}
				else {
					$scope.modalMovieInfo = {};
					$scope.modalMovieInfo = data.data;
				}
			}
			function errorCallback(data, status) {
				$scope.messageModal = "Aconteceu um problema: " + data.data;
			}
		};
	});
})();

/*
Title
Actors
Country
Plot
Genre
Poster
Released
Type
Year
imdbRating
*/