const initialState = {
    isSideBarOpen: false,
    isSendingRequest: false
}

export const layoutReducer = (state = initialState , action) => {
    switch (action.type) {
        case 'TOGGLE_SIDEBAR':
            return {
                ...state,
                isSideBarOpen: !state.isSideBarOpen
            }
        case 'SET_IS_SENDINGREQUEST':
            return {
                ...state,
                isSendingRequest: action.payload
            }
        default:
            return state
    }
}