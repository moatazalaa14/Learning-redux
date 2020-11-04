function uniId() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
  


let reducer=(state=[],action)=>{
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
            return newState;
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
case "SHOW_CHILD_FRIEND_MOVIE":{
    let newState=[...state]
    return newState.filter(item=>item.rated===true)
} 
case "startWatchingMovie":{
    let {id}=action.info
    let newState=[...state]
    newState.map(item=>{
        if(item.id===id&&item.isWorking===false){
            item.isWorking=true
            console.log(`${item.title} is now started`)
            item.startWatchingDuration=new Date().getSeconds();
        }else{
            console.log("Film is already working")
        }
    })
    return newState
    
}
case "STOP_WATCHING_MOVIE":{
    let {id}=action.info
    let newState=[...state]
    newState.map(item=>{
        if(item.id===id&&item.isWorking===true){
            item.isWorking=false
            console.log(`${item.title} is stopped`)
            item.endWatchingDuration=new Date().getSeconds();
        }else{
            console.log("film is already stopped")
        }
    })  
    return newState
}
case "GET_WATCHED_DURATION":{
    let {id} = action.info
    let newState=[...state]
    newState.map(item=>{
        if(item.id===id){
            item.duration=`${(item.endWatchingDuration)-(item.startWatchingDuration)} seconds`
        }
    })
    return newState
}
case "DELETE_MOVIE":{
    let {id}=action.info
    let newState=[...state]
    return newState.filter(item=>item.id !==id)
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
        default :{
            return state
        }
    }
    

}
let store=Redux.createStore(reducer)
const showAllMovies=()=>{
    return store.getState()
}

const addMovie=(movieName,director=[],actor=[],rated=true,isWorking=false,duration,startWatchingDuration,endWatchingDuration)=>{
    store.dispatch({
        type:"ADD_MOVIE",
        info:{
        id:uniId(),
        title:movieName,
        director:director,
        actor:actor,
        rated:rated,
        isWorking:isWorking,
        duration:duration,
        startWatchingDuration:startWatchingDuration,
        endWatchingDuration:endWatchingDuration,
    }})
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

    const isFlaggedMovied=(id)=>{
        store.dispatch({
            type:"FLAG_MOVIE",
            info:{
                id:id
            }
        })
    }

    const showChildFriendlyMovie=()=>{
        store.dispatch({
            type:"SHOW_CHILD_FRIEND_MOVIE",
        })
    }
    const startWatchingMovies=(id)=>{
        store.dispatch({
            type:"startWatchingMovie",
            info:{
                id:id,
            }
        })
    }
    const stopWatchingMovies=(id)=>{
        store.dispatch({
            type:"STOP_WATCHING_MOVIE",
            info:{
                id:id,
            }
        })
    }
    const getWatchedDuration=(id)=>{
        store.dispatch({
            type:"GET_WATCHED_DURATION",
            info:{
                id:id,
            }
        })
    }

    const deleteMovie=(id)=>{
        store.dispatch({
            type:"DELETE_MOVIE",
            info:{
                id:id,
            }
        })
    }






























