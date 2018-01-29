import { layoutReducer } from '../layout/layoutReducer'
import { rolesReducer } from '../roles/rolesReducer'
import { staffsReducer } from '../staffs/staffsReducers'

export const rootReducers = {
    layout: layoutReducer,
    roles: rolesReducer,
    staffs: staffsReducer
}