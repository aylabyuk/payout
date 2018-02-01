const initialState = {
    scrollTop: 0,
    isDetailsMobileOpen: false,
    isCreateRoleOpen: false,
    roleInView: null,
    selectedRoleInAutosuggest: null
}

export const rolesReducer = (state = initialState , action) => {
    switch (action.type) {
        case 'SET_SCROLLTOP_ROLES':
            return {
                ...state,
                scrollTop: action.payload
            }
        case 'SET_DETAILSMOBILE_ROLES':
            return {
                ...state,
                isDetailsMobileOpen: action.payload
            }
        case 'TOGGLE_CREATE_ROLE':
            return {
                ...state,
                isCreateRoleOpen: !state.isCreateRoleOpen
            }
        case 'SET_ROLE_INVIEW':
            return {
                ...state,
                roleInView: action.payload
            }
        case 'SET_SELECTED_ROLE_IN_AUTOSUGGEST':
            return {
                ...state,
                selectedRoleInAutosuggest: action.payload
            }
        default:
            return state
    }
}