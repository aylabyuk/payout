const initialState = {
    scrollTop: 0,
    isDetailsMobileOpen: false,
    isCreateRoleOpen: false,
    isEditMode: false,
    roleInView: null
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
        case 'SET_EDIT_MODE':
            return {
                ...state,
                isEditMode: action.payload
            }
        case 'SET_ROLE_INVIEW':
            return {
                ...state,
                roleInView: action.payload
            }
        default:
            return state
    }
}