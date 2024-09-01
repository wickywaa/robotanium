import { put, takeEvery } from "redux-saga/effects";
import { UserManagementService } from "../../../services";
import { ILoggedInUser } from "../../../models";
import { addUsersFailed, addAdminUsersSuccess, addAdminUsersFailed} from '../../slices';
const userMangementService  = new UserManagementService();

function * setallAdminUsers() {

  try {
    const users: ILoggedInUser[]  = yield userMangementService.getAllAdminUsers(); 
    console.log(users);
    yield put(addAdminUsersSuccess(users) )
  } catch (e) {
    yield put( addAdminUsersFailed())
  }
}

export function * UserManagementAdminSagas (){

  yield takeEvery("userManagementSlice/addAdminUsersAttempt", setallAdminUsers);

}