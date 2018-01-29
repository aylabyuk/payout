const initialState = {
    scrollTop: 0,
    isDetailsMobileOpen: false,
    staffInView: null
}

export const staffsReducer = (state = initialState , action) => {
    switch (action.type) {
        case 'SET_SCROLLTOP_STAFFS':
            return {
                ...state,
                scrollTop: action.payload
            }
        case 'SET_DETAILSMOBILE_STAFFS':
            return {
                ...state,
                isDetailsMobileOpen: action.payload
            }
        case 'SET_STAFF_INVIEW':
            return {
                ...state,
                staffInView: action.payload
            }
        default:
            return state
    }
}