const initialState = {
    scrollTop: 0,
    isDetailsMobileOpen: false
}

export const rolesReducer = (state = initialState , action) => {
    switch (action.type) {
        case 'SET_SCROLLTOP':
            return {
                ...state,
                scrollTop: action.payload
            }
        case 'TOGGLE_DETAILSMOBILE':
            return {
                ...state,
                isDetailsMobileOpen: !state.isDetailsMobileOpen
            }
        default:
            return state
    }
}