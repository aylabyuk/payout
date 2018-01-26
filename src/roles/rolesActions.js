export const setScrollTop = (num) => ({
    type: 'SET_SCROLLTOP',
    payload: num
})

export const toggleDetailsMobile = () => ({
    type: 'TOGGLE_DETAILSMOBILE',
})

export const toggleCreateRole = () => ({
    type: 'TOGGLE_CREATE_ROLE'
})

export const setEditMode = (bool) => ({
    type: 'SET_EDIT_MODE',
    payload: bool
})

export const setRoleInView = (role) => ({
    type: 'SET_ROLE_INVIEW',
    payload: role
})