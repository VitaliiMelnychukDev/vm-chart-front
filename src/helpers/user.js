import { role } from '../constants/role';

export class UserHelper {
  static chartRoles = [role.admin, role.chartEditor];

  static songRoles = [...UserHelper.chartRoles, role.songEditor];

  static canManageSongs(userRoles = []) {
    return UserHelper.canDo(userRoles, UserHelper.songRoles);
  }

  static canManageCharts(userRoles = []) {
    return UserHelper.canDo(userRoles, UserHelper.chartRoles);
  }

  static canDo(userRoles = [], neededRoles = []) {
    return !!userRoles.find(role => {
      return neededRoles.includes(role);
    })
  }
}