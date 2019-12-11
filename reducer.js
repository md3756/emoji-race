import { AsyncStorage } from 'react-native'
import { firestore } from './firebase'

function saveToLocalStorage(state) {
    AsyncStorage.setItem("STATE", JSON.stringify(state))
}

export default function reducer(state, action) {
    // console.log(state, action.type, action.props)
 
    let newState = {}

    switch (action.type) {
        case 'HYDRATE':
            return {
                ...state,
                ...action.props
            }

        case 'AUTH':
            return {
                ...state,
                user: action.props
            }
        
        case "LOGOUT":
            return {
                ...state,
                user: null
            }

        case 'ADD_ITEMS':
            var items = state.items
            return {
                ...state,
                items: items.concat(action.props)
            }

        case 'SET_ITEMS':
                var items = state.items
                return {
                    ...state,
                    items: action.props
                }
        case 'SET_GROUPS':
                var groups = state.groups
                return {
                    ...state,
                    groups: action.props
                }
        case "SET_GROUP": 
                var group_ = state.group_
                return {
                    ...state,
                    group_: action.props
                }
        case 'ADD_ITEM':
            // console.log(state)
            var items = state.items

            // add item locally
            items.push(action.props)

            // add item remotely
            firestore.collection('items').add(action.props)

            return {
                ...state,
                items
            }
        case "ADD_IMG":
            var img = action.props
        case 'DELETE_ITEM':
            // delete item from local store
            var items = state.items.filter(item => item.id != action.props.id)
            
            // delete from firestore
            firestore.collection('items').doc(action.props.id).delete()

            return {
                ...state,
                items
            } 

        case 'CHANGE_POSITION':
            firestore.collection('items').doc(action.props.id).update({pos: action.props.pos, across: action.props.across})

            // update values in place
            var items = state.items.map(item => {
                if(item.id == action.props.id) {
                    item.pos = action.props.pos
                }

                return item
            })

            return {
                ...state,
                items
            }
        
        case 'WINNER_WINNER':
            let maxNum = 0;
            let win = "no winner";
            for (item in state.items) {
                if(item.pos > maxNum) {
                    maxNum = item.pos
                    win = item.name
                }
            }
            return {
                ...state,
                winner: win
            }
        
        case "NEW_GROUP":
            // console.log(state)
                var groups = state.groups

                // add item locally
                groups.push(action.props)
    
                // add item remotely
                firestore.collection('groups').add(action.props)
    
                return {
                    ...state,
                    groups
                }
        case "ADD_IMAGE":
            console.log(action.props);
            console.log(state.img)
            var img = state.img
            img = action.img;
            // console.log(img);
            return {
                ...state,
                img: action.props
            }

            
        default:
            newState = state
            break;
    }

    // we're after the switch statement
    // newState is already updated here
    saveToLocalStorage(newState)

    return newState
}