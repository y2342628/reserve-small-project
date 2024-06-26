export interface LoginFormData {
  idCode: string;
  verifyCode: string;
}

export interface UserProp {
  idCode: string;
  token: string;
  userId?:number;
  isAdmin:boolean;
}


export interface ReserveFormDate {
  reIdCode:string;
  reName:string;
  reDate: string;
}


export interface RecordItem extends ReserveFormDate{
  id:number;
  isExpire?:boolean
}

export interface RecordList{
  pageIndex: number,
  pageSize: number,
  count:number,
  data:  RecordItem[]
}


export interface RecordStatItem {
  count:number;
  reDate:string;
  isExpire?:boolean
}