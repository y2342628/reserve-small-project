export interface LoginFormData {
  id: string;
  verifyCode: string;
}

export interface UserProp {
  idCode: string;
  token: string;
  phone?: string;
  userId?:number
}


export interface ReserveFormDate {
  phone: string;
  reDate: string
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