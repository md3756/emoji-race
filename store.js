import Store from './flux'
import reducer from './reducer'

// Define initial store state
const initialState = {
    user: null, 
    items: []
}


// initialize store
const store = new Store(reducer, initialState)
export default store