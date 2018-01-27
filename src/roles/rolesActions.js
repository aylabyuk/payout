export const setScrollTop = (num) => ({
    type: 'SET_SCROLLTOP',
    payload: num
})

export const setDetailsMobile = (bool) => ({
    type: 'SET_DETAILSMOBILE',
    payload: bool
})

export const toggleCreateRole = () => ({
    type: 'TOGGLE_CREATE_ROLE'
})

export const setRoleInView = (role) => ({
    type: 'SET_ROLE_INVIEW',
    payload: role
})