function uniId() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
  


let movies=(state=[],action)=>{
    switch(action.type){
        case "ADD_MOVIE":{
            let newState=[...state , action.info]
            return newState;
        }
        case "ADD_DIRECTOR":{
                let {id}=action.info;
            let newState=[...state]
            newState.map(item=>{
                if(id === item.id){
                    item.director.push(action.info.name)
                }
            })
            return "newState";
        }
        case "ADD_ACTOR":{
            let {id}=action.info;
        let newState=[...state]
        newState.map(item=>{
            if(id === item.id){
                item.actor.push(action.info.name)
            }
        })
        return newState;
    }
    case "CHANGE_MOVIE_TITLE":{
    let {id,newTitle}=action.info;
    let newState=[...state]
    newState.map(item=>{
        if(id === item.id){
            item.title=newTitle
        }
    })
    return newState;
}
case "DELETE_MOVIE":{
    let {id}=action.info
    let newState=[...state]
    return newState.filter(item=>item.id !==id)
}
case "SHOW_ALL_MOVIE":{
             let movies=[];
             let newState=[...state]
             newState.map(item=>{
                 movies.push(item.title)
             })
             return newState
         }
         case "SHOW_CHILD_FRIEND_MOVIE":{
            let newState=[...state]
            
            return newState.filter(item=>item.rated===true)
        } 
       
           
            case "USER_ADD_RATE":{
                let {userId,rate,movieId}=action.info
                let newState=[...state]
                newState.map(item=>{
                    if(movieId === item.id){
                        item.rated.push({rate:rate,userId:userId})
                        item.usersWatched.push(userId)
                        item.overall+=rate
                        item.overall=item.overall/item.rated.length
                        
                    }
                    
                })
                return newState;
            }
            case "GET_USERS_RATED":{
                let { movieId } =action.info;
                let newState=[...state];
                newState.rated.map(film=>{
                    if(film.movieId === movieId){
                        film.usersWatched.push(movieId)
                        
                    }
                })
                return newState;
            }
            case "GET_OVERALL_RATED":{
                let { movieId }=action.info
                let newState=[...state]
                newState.rated.map(film=>{
                    if(film.movieId === movieId){
                        overall+=film.rate
                    }
                })
                return newState;

            }
        default :{
            return state
        }
    }
    

}

let users=(state=[],action)=>{
    switch(action.type){
        case "ADD_USER":{
            let newState=[...state , action.info]
            return newState;
        }
        case "LOG_IN_USER":{
            let {userName,password}=action.info;
            let newState=[...state]
             newState.map(item=>{
                if(userName===item.userName && password===item.password){
                    item.isLogin=true
                }else{
                    item.isLogin=false
                }
            })
            return newState;
        }
        case "ADD_MOVIE_INTO_FEVS":{
            let {movieId,userId}=action.info
            let newState=[...state]
            let filmName;
            showAllMovies().movies.map(item=>{
                if(movieId === item.id){
                    filmName=item.title
                }
            })
            newState.map(item=>{

                item.moviesFev.push({title:filmName})

            })
            return newState;
        }
        case "ADD_MOVIE_INTO_Watched_LIST":{
            let {movieId,userId}=action.info
            let newState=[...state]
            let filmName;
            showAllMovies().movies.map(item=>{
                if(movieId === item.id){
                    filmName=item.title
                }
            })
            newState.map(item=>{

                item.watchedList.push({title:filmName})

            })
            return newState;
        }
        case "START_WATCHING_DURATION":{
            let {userId,movieId}=action.info
            let newState=[...state]
            let title;
            showAllMovies().movies.map(item=>{
                if( movieId===item.id){
                    console.log(`${item.title} is now started`)
                    title=item.title
                }
            })
            newState.map(item=>{
                if(userId === item.userId &&!item.isWorking){
                    item.isWorking=true
                    item.filmInfo=[...item.filmInfo,{starting:Date.now(),movieId:movieId,filmTitle:title,stop:0}]
                }else if(item.isWorking){
                    console.log("Film is already started")
                }
            })
            return newState;
            
        }  
        case "STOP_WATCHING_DURATION":{
            let {userId,movieId}=action.info
            let newState=[...state]
            let title;
            showAllMovies().movies.map(item=>{
                if( movieId===item.id){
                    console.log(`${item.title} is now stopped`)
                    title=item.title
                }
            })
            newState.map(item=>{
                if(userId === item.userId &&item.isWorking){
                    item.isWorking=false
                    item.filmInfo.map(onlyFilm=>{
                        if(movieId ===onlyFilm.movieId){
                            onlyFilm.stop=Date.now()
                            onlyFilm.duaration=(onlyFilm.stop-onlyFilm.starting)/6000 +"min"
                        }
                    })
                }else if(!item.isWorking){
                    console.log("Film is already stopped")
                }
            })
            return newState;
            
        }  
        default :{
            return state
        }
    }
    

}




const createStore=(reducer)=>{
    let state;
    let listeners=[];


    const getState=()=>state;
    const dispatch=(action)=>{
        state=reducer(state,action)
        listeners.forEach(listener=>listener())
    }
    const subscribe=(listener)=>{
        listeners.push(listener)
        return ()=>{
            listeners=listeners.filter(l=>l!==listener)
        }
    }
    dispatch({})
    return {getState,dispatch,subscribe}
}

//let store=createStore(movies)


const showAllMovies=()=>{
    return store.getState()
}

const combineReducer =(reducers)=>{
    return (state={},action)=>{
        return Object.keys(reducers).reduce(
            (nextState,key)=>{
                nextState[key]=reducers[key](
                    state[key],
                    action
                );
                return nextState;
            },
            {}
        )
    }
}



const RootReducers=combineReducer({
    movies,
    users
})
let store=createStore(RootReducers)
    const showAllUsers=()=>{
        return store.getState()
    }









const addMovie=(movieName,director=[],actor=[],rated=[],usersWatched=[],overall=0)=>{
    store.dispatch({
        type:"ADD_MOVIE",
        info:{
        id:uniId(),
        title:movieName,
        director:director,
        actor:actor,
        rated:rated,
        usersWatched:usersWatched,
        overall:overall
       
        
    }})
}

const addRate=(id,rate,userId)=>{
    store.dispatch({
        type:"ADD_RATE",
        info:{
            id:id,
            rate:rate,
            userId:uniId()
        }
    })
}


const addDirector=(id,directorName)=>{
    store.dispatch({
        type:"ADD_DIRECTOR",
        info:{
        id:id,
        name:directorName
        }
    })
}

const addActor=(id,actorName)=>{
    store.dispatch({
        type:"ADD_ACTOR",
        info:{
        id:id,
        name:actorName
        }
    })}

    const changeMovieTitle=(id,newTitle)=>{
        store.dispatch({
            type:"CHANGE_MOVIE_TITLE",
            info:{
            id:id,
            newTitle:newTitle
            }
        })}
    const deleteMovie=(id)=>{
        store.dispatch({
            type:"DELETE_MOVIE",
            info:{
                id:id,
            }
        })
    }

 

    const getUsersRated=(movieId)=>{
        store.dispatch({
            type:"GET_USERS_RATED",
            info:{
                movieId:movieId
            }
        })
    }
    const getOverallRated=(movieId)=>{
        store.dispatch({
            type:"GET_OVERALL_RATED",
            info:{
                movieId:movieId
            }
        })
    }
    


    









    const addUser=(userName,email,password,isLogin=false,moviesFev=[],watchedList=[],filmInfo=[],isWorking=false)=>{
        store.dispatch({
            type:"ADD_USER",
            info:{
            userId:uniId(),
            userName:userName,
            email:email,
            password:password,
            isLogin:isLogin,
            moviesFev:moviesFev,
            watchedList:watchedList,
            filmInfo:filmInfo,
            isWorking:isWorking
            }
            
        })

    }
    const logInUser=(userName,password)=>{
        store.dispatch({
            type:"LOG_IN_USER",
            info:{
            userName:userName, 
            password:password,
            }
            
        })
        
    }

    const userAddRate=(userId,rate,movieId)=>{
        store.dispatch({
            type:"USER_ADD_RATE",
            info:{
                userId:userId,
                rate:rate,
                movieId:movieId
            }
        })
    }

    const AddFilmIntoFevs=(movieId,userId)=>{
        store.dispatch({
            type:"ADD_MOVIE_INTO_FEVS",
            info:{
                movieId:movieId,
                userId:userId
            }
        })
    }


    const addFilmIntoWatchedList=(movieId,userId)=>{
        store.dispatch({
            type:"ADD_MOVIE_INTO_Watched_LIST",
            info:{
                movieId:movieId,
                userId:userId
            }
        })
    }
    const startWatchingMovies=(userId,movieId)=>{
        store.dispatch({
            type:"START_WATCHING_DURATION",
            info:{
                userId:userId,
                movieId:movieId,
            }
        })
    }

    const stopWatchingMovies=(userId,movieId)=>{
        store.dispatch({
            type:"STOP_WATCHING_DURATION",
            info:{
                userId:userId,
                movieId:movieId
            }
        })
    }


























