'use strict';

/**
 * @ngdoc service
 * @name stockDogApp.WatchlistService
 * @description
 * # WatchlistService
 * Service in the stockDogApp.
 */
angular.module('stockDogApp')
  .service('WatchlistService', function WatchlistService() {
    // AngularJS will instantiate a singleton by calling "new" on this function
    //[1] Load Watchlist from the local storage
      var loadModel = function (){
        var model = {
        watchlists: localStorage['StockDog.watchlists'] ? JSON.parse( localStorage['StockDog.watchlists']):[],
        nextID:   localStorage['StockDog.nextID'] ? parseInt(localStorage['StockDog.nextID']):0
      };

      return model;
      };

    //[2]Save watchlist to local storage
    var SaveModel = function(){
       localStorage['StockDog.watchlists']=JSON.stringify(Model.watchlists);
       localStorage['StockDog.nextID']=Model.nextID;
      };


    //[3] Find the emelemnet using the lodash find by id
    var findById = function(listId){
       return  _.find(Model.watchlists, function(watchlist){
         return watchlist.id===parseInt(listId);
       });

    };


    //[4] Select all for find one by given id
    this.query = function(listId){
        if (listId){
          return findById(listId);
        }else {
          return Model.watchlists;
        }
      };

    //[5] save new
    this.save = function(watchlist){
      watchlist.id= Model.nextID++;
      Model.watchlists.push(watchlist);
      SaveModel();

    };

    //[6] remove new
    this.remove = function (watchlist){
        _.remove( Model.watchlists, function(list){
          return  list.id === watchlist.id;
        } );
        SaveModel();

    };
    //[7] Initialize
    var Model = loadModel();


  });
