export class UserSearchParamModel {
  id: number;
  username: string;
  fullname: string;
  status: number;
  description: string;
  changeTime: Date;
  changeUser: string;
  constructor() {
  }

  /** set giá trị từ form value */
  build(formValue: {}): UserSearchParamModel {
    const searchParam = new UserSearchParamModel();
    if (!formValue) {
      return searchParam;
    }

    // for (const [key, value] of Object.entries(searchParam)) { }
    for (let key in formValue) {
      searchParam[key] = formValue[key];
    }

    return searchParam;
  }
}