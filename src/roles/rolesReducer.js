const initialState = {
    scrollTop: 0,
    isDetailsMobileOpen: false,
    isCreateRoleOpen: false
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
        case 'TOGGLE_CREATE_ROLE':
            return {
                ...state,
                isCreateRoleOpen: !state.isCreateRoleOpen
            }
        default:
            return state
    }
}