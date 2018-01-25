const initialState = {
    scrollTop: 0
}

export const rolesReducer = (state = initialState , action) => {
    switch (action.type) {
      case 'SET_SCROLLTOP':
        return {
            ...state,
            scrollTop: action.payload
        }
      default:
            return state
    }
}