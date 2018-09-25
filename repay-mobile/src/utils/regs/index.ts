type ParamsType = string;
type ResultType = boolean;

/**
 * 二代身份证校验
 */
const isIdCard = (id: ParamsType): ResultType => {
    let arrExp = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
    let arrValid = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
    if (/^(([1][1-5])|([2][1-3])|([3][1-7])|([4][1-6])|([5][0-4])|([6][1-5])|([7][1])|([8][1-2]))\d{4}(([1][9]\d{2})|([2]\d{3}))(([0][1-9])|([1][0-2]))(([0][1-9])|([1-2][0-9])|([3][0-1]))\d{3}[0-9xX]$/.test(id)) {
        let sum = 0;
        let idArr = id.split('');
        for (let i = 0; i < 17; i++) {
            sum += parseInt(idArr[i]) * arrExp[i];
        }
        if (idArr[17].toUpperCase() != arrValid[sum % 11].toString().toUpperCase()) {
            return false;
        }
        return true;
    } else {
        return false;
    }
};
/**
 * 手机号码校验
 */

 const checkMobile = (phone: ParamsType): ResultType => {
    const phoneReg = /^[0-9]{11}$/;
    return phoneReg.test(phone);
};
/**
 * 手机号码校验,对于非1开头的号段不支持、以170/171/172/174/179开头的号段不支持；
 */
const checkPhone = (phone: ParamsType): ResultType => {
    const phoneReg = /(^1([0-6]|[8-9])\d{9}$)|(^17(3|[5-8])\d{8}$)/;
    return phoneReg.test(phone);
};
/**
 * 校验邮政编码
*/
const checkPostalCode = (code: ParamsType): ResultType => {
    const postalReg = /^[1-9]\d{5}$/;
    return postalReg.test(code);
};
/**
 * 校验单位电话
 */
const checkTelephone = (tel: ParamsType): ResultType => {
    const telReg = /^0\d{2,3}?-\d{7,8}$/;
    return telReg.test(tel);
};
/**
 * 校验1-15个字的汉字姓名
 */
const checkName = (name: ParamsType): ResultType => {
    const nameReg = /^[\u4e00-\u9fa5.]{1,15}$/;
    return nameReg.test(name);
};
/**
 * 校验单位名称
 */
const checkCompany = (company: ParamsType): ResultType => {
    const companyReg = /^[\u4e00-\u9fa5a-zA-Z.]{5,50}$/;
    return companyReg.test(company);
};
export default {
    isIdCard,
    checkMobile,
    checkPhone,
    checkPostalCode,
    checkTelephone,
    checkName,
    checkCompany
};
