"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function uniId() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0,
        v = c == 'x' ? r : r & 0x3 | 0x8;
    return v.toString(16);
  });
}

var reducer = function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case "ADD_MOVIE":
      {
        var newState = [].concat(_toConsumableArray(state), [action.info]);
        return newState;
      }

    case "ADD_DIRECTOR":
      {
        var id = action.info.id;

        var _newState = _toConsumableArray(state);

        _newState.map(function (item) {
          if (id === item.id) {
            item.director.push(action.info.name);
          }
        });

        return _newState;
      }

    case "ADD_ACTOR":
      {
        var _id = action.info.id;

        var _newState2 = _toConsumableArray(state);

        _newState2.map(function (item) {
          if (_id === item.id) {
            item.actor.push(action.info.name);
          }
        });

        return _newState2;
      }

    case "CHANGE_MOVIE_TITLE":
      {
        var _action$info = action.info,
            _id2 = _action$info.id,
            newTitle = _action$info.newTitle;

        var _newState3 = _toConsumableArray(state);

        _newState3.map(function (item) {
          if (_id2 === item.id) {
            item.title = newTitle;
          }
        });

        return _newState3;
      }

    case "SHOW_CHILD_FRIEND_MOVIE":
      {
        var _newState4 = _toConsumableArray(state);

        return _newState4.filter(function (item) {
          return item.rated === true;
        });
      }

    case "startWatchingMovie":
      {
        var _id3 = action.info.id;

        var _newState5 = _toConsumableArray(state);

        _newState5.map(function (item) {
          if (item.id === _id3 && item.isWorking === false) {
            item.isWorking = true;
            console.log("".concat(item.title, " is now started"));
            item.startWatchingDuration = new Date().getSeconds();
          } else {
            console.log("Film is already working");
          }
        });

        return _newState5;
      }

    case "STOP_WATCHING_MOVIE":
      {
        var _id4 = action.info.id;

        var _newState6 = _toConsumableArray(state);

        _newState6.map(function (item) {
          if (item.id === _id4 && item.isWorking === true) {
            item.isWorking = false;
            console.log("".concat(item.title, " is stopped"));
            item.endWatchingDuration = new Date().getSeconds();
          } else {
            console.log("film is already stopped");
          }
        });

        return _newState6;
      }

    case "GET_WATCHED_DURATION":
      {
        var _id5 = action.info.id;

        var _newState7 = _toConsumableArray(state);

        _newState7.map(function (item) {
          if (item.id === _id5) {
            item.duration = "".concat(item.endWatchingDuration - item.startWatchingDuration, " seconds");
          }
        });

        return _newState7;
      }

    case "DELETE_MOVIE":
      {
        var _id6 = action.info.id;

        var _newState8 = _toConsumableArray(state);

        return _newState8.filter(function (item) {
          return item.id !== _id6;
        });
      }
    // case "FLAG_MOVIE":{
    //     let {id} = action.info
    //     let newState=[...state]
    //     newState.map(item=>{
    //         if(id===item.id && item.rated ===true){
    //             console.log("it is a rated movie")
    //         }else if(id===item.id && item.rated !==true){
    //             console.log("it is a unrated movie")
    //         }else{
    //             console.log("can't found this movie")
    //         }
    //     })
    // }break;
    // case "CHANGE_DIRECTOR_TO_MOVIE":{
    //     let {id,director} = action.info;
    //     let newState=[...state]
    //     newState.map(item=>{
    //         if(item.id===id){
    //             item.director=director;
    //         }
    //     })
    //     return newState;
    // }
    // case "ADD_ACTOR_TO_MOVIE":{
    //     let {id,actor}=action.info;
    //     let newState=[...state];
    //     newState.map(item=>{
    //         if(item.id===id){
    //             item.actor.push(actor)
    //         }
    //     })
    // }
    // case "CHANGE_MOVIE_TITLE":{
    //     let {id,title}=action.info;
    //     let newState=[...state];
    //     newState.map(item=>{
    //         if(item.id===id){
    //             item.title=title;
    //         }
    //         return newState;
    //     })
    // }
    // case "FLAG_MOVIE":{
    //     let {title}=action.info
    //     let newState=[...state]
    //     newState.map(item=>{
    //         if(item.title===title){
    //             console.log(item.flag)
    //         }
    //     })
    // }
    // case "SHOW_ALL_MOVIE":{
    //     let movies=[];
    //     let newState=[...state]
    //     newState.map(item=>{
    //         movies.push(item.title)
    //     })
    //     console.log(movies)
    // }

    default:
      {
        return state;
      }
  }
};

var store = Redux.createStore(reducer);

var showAllMovies = function showAllMovies() {
  return store.getState();
};

var addMovie = function addMovie(movieName) {
  var director = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var actor = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  var rated = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
  var isWorking = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  var duration = arguments.length > 5 ? arguments[5] : undefined;
  var startWatchingDuration = arguments.length > 6 ? arguments[6] : undefined;
  var endWatchingDuration = arguments.length > 7 ? arguments[7] : undefined;
  store.dispatch({
    type: "ADD_MOVIE",
    info: {
      id: uniId(),
      title: movieName,
      director: director,
      actor: actor,
      rated: rated,
      isWorking: isWorking,
      duration: duration,
      startWatchingDuration: startWatchingDuration,
      endWatchingDuration: endWatchingDuration
    }
  });
};

var addDirector = function addDirector(id, directorName) {
  store.dispatch({
    type: "ADD_DIRECTOR",
    info: {
      id: id,
      name: directorName
    }
  });
};

var addActor = function addActor(id, actorName) {
  store.dispatch({
    type: "ADD_ACTOR",
    info: {
      id: id,
      name: actorName
    }
  });
};

var changeMovieTitle = function changeMovieTitle(id, newTitle) {
  store.dispatch({
    type: "CHANGE_MOVIE_TITLE",
    info: {
      id: id,
      newTitle: newTitle
    }
  });
};

var isFlaggedMovied = function isFlaggedMovied(id) {
  store.dispatch({
    type: "FLAG_MOVIE",
    info: {
      id: id
    }
  });
};

var showChildFriendlyMovie = function showChildFriendlyMovie() {
  store.dispatch({
    type: "SHOW_CHILD_FRIEND_MOVIE"
  });
};

var startWatchingMovies = function startWatchingMovies(id) {
  store.dispatch({
    type: "startWatchingMovie",
    info: {
      id: id
    }
  });
};

var stopWatchingMovies = function stopWatchingMovies(id) {
  store.dispatch({
    type: "STOP_WATCHING_MOVIE",
    info: {
      id: id
    }
  });
};

var getWatchedDuration = function getWatchedDuration(id) {
  store.dispatch({
    type: "GET_WATCHED_DURATION",
    info: {
      id: id
    }
  });
};

var deleteMovie = function deleteMovie(id) {
  store.dispatch({
    type: "DELETE_MOVIE",
    info: {
      id: id
    }
  });
};