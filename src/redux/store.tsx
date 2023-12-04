import { configureStore } from '@reduxjs/toolkit'
import loginReducer from './feature/loginSlice'
import editReducer from './feature/editSlice'
import editProjectReducer from './feature/editProjectSlice'
import editTaskReducer from './feature/editTaskSlice'
import getTaskReducer from './feature/getTaskSlice'
import getPedingReducer from './feature/TaskState/pendingTask'
import getOverDueReducer from './feature/TaskState/overdueTask'
import getInprocessReducer from './feature/TaskState/inprocessTask'
import getCompleteReducer from './feature/TaskState/completeTask'
import getTaskEndReducer from './feature/TaskState/taskEnd'
import getAllProjectReducer from './feature/ProjectState/totalProjectSlice'
import getProceesingProjectReducer from './feature/ProjectState/processingProject'
import getPriorityZeroReducer from './feature/ProjectState/priorityZero'
import getPriorityTwoReducer from './feature/ProjectState/priorityTwo'
import getPriorityOneReducer from './feature/ProjectState/priorityOne'
import getProjectSevenReducer from './feature/ProjectState/projectInSeven'
import getDetailStatusReducer from './feature/detailStatus'
import getAllUserReducer from './feature/UserState/getAllUser'
import getRoleAdminReducer from './feature/UserState/getRoleAdmin'
import getRoleUserReducer from './feature/UserState/getRoleUser'
import getProjectbyUserReducer from './feature/projectByUserState/projectByUser'

export const store = configureStore({
  reducer: {
    loginReducer: loginReducer,
    editReducer: editReducer,
    editProjectReducer: editProjectReducer,
    editTaskReducer: editTaskReducer,
    getTaskReducer: getTaskReducer,
    getPedingReducer: getPedingReducer,
    getOverDueReducer: getOverDueReducer,
    getInprocessReducer: getInprocessReducer,
    getCompleteReducer: getCompleteReducer,
    getTaskEndReducer: getTaskEndReducer,
    getAllProjectReducer: getAllProjectReducer,
    getProceesingProjectReducer: getProceesingProjectReducer,
    getPriorityZeroReducer: getPriorityZeroReducer,
    getPriorityTwoReducer: getPriorityTwoReducer,
    getPriorityOneReducer: getPriorityOneReducer,
    getProjectSevenReducer: getProjectSevenReducer,
    getDetailStatusReducer: getDetailStatusReducer,
    getAllUserReducer: getAllUserReducer,
    getRoleAdminReducer: getRoleAdminReducer,
    getRoleUserReducer: getRoleUserReducer,
    getProjectbyUserReducer: getProjectbyUserReducer








  }

})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch