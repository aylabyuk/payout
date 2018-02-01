export const setScrollTop = (num) => ({
    type: 'SET_SCROLLTOP_ROLES',
    payload: num
})

export const setDetailsMobile = (bool) => ({
    type: 'SET_DETAILSMOBILE_ROLES',
    payload: bool
})

export const toggleCreateRole = () => ({
    type: 'TOGGLE_CREATE_ROLE'
})

export const setRoleInView = (role) => ({
    type: 'SET_ROLE_INVIEW',
    payload: role
})

export const setSelectedRoleInAutoSuggest = (id) => ({
    type: 'SET_SELECTED_ROLE_IN_AUTOSUGGEST',
    payload: id
})