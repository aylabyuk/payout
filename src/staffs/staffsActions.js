export const setScrollTop = (num) => ({
    type: 'SET_SCROLLTOP_STAFFS',
    payload: num
})

export const setDetailsMobile = (bool) => ({
    type: 'SET_DETAILSMOBILE_STAFFS',
    payload: bool
})

export const toggleCreateStaff = () => ({
    type: 'TOGGLE_CREATE_STAFF'
})

export const setStaffInView = (staff) => ({
    type: 'SET_STAFF_INVIEW',
    payload: staff
})