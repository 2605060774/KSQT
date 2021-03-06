var userRetNameArray = null;
var deptRetNameArray = null;
var roleRetNameArray = null;
var userExternalRetNameArray = null;
function selectUser(retArray, moduleId, privNoFlag, notLoginIn) {
  userRetNameArray = retArray;
  var url = contextPath + "/core/funcs/orgselect/MultiUserSelect.jsp?1=1";
  if (moduleId) {
    url += "&moduleId=" + moduleId;
    if (!privNoFlag) {
      privNoFlag = 0
    }
    url += "&privNoFlag=" + privNoFlag
  }
  if (notLoginIn) {
    url += "&notLoginIn=" + notLoginIn
  }
  openDialogResize(url, 530, 400)
 // window.open(url, 530, 400)
}
function selectSingleUser(retArray, moduleId, privNoFlag, notLoginIn) {
  userRetNameArray = retArray;
  var url = contextPath
      + "/core/funcs/orgselect/MultiUserSelect.jsp?isSingle=true";
  if (moduleId) {
    url += "&moduleId=" + moduleId;
    if (!privNoFlag) {
      privNoFlag = 0
    }
    url += "&privNoFlag=" + privNoFlag
  }
  if (notLoginIn) {
    url += "&notLoginIn=" + notLoginIn
  }
  openDialogResize(url, 530, 400)
}
function selectDept(retArray, moduleId, privNoFlag, noAllDept) {
  deptRetNameArray = retArray;
  var url = contextPath + "/core/funcs/orgselect/MultiDeptSelect.jsp?1=1";
  var has = false;
  if (moduleId) {
    url += "&moduleId=" + moduleId
  }
  if (privNoFlag) {
    url += "&privNoFlag=" + privNoFlag
  }
  if (noAllDept) {
    url += "&noAllDept=" + noAllDept
  }
  openDialogResize(url, 530, 400)
}
function selectRole(retArray, moduleId, privNoFlag, privOp) {
  roleRetNameArray = retArray;
  var url = contextPath + "/core/funcs/orgselect/MultiRoleSelect.jsp";
  var has = false;
  if (moduleId) {
    url += "?moduleId=" + moduleId;
    if (!privNoFlag) {
      privNoFlag = 0
    }
    url += "&privNoFlag=" + privNoFlag;
    has = true
  }
  if (privOp) {
    if (has) {
      url += "&privOp=" + privOp
    } else {
      url += "?privOp=" + privOp
    }
  }
  openDialogResize(url, 280, 400)
}
function selectUserExternalSelect(retArray) {
  userExternalRetNameArray = retArray;
  openDialogResize(contextPath
      + "/core/funcs/orgselect/MultiUserExternalSelect.jsp", 520, 400)
};