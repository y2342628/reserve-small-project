import { computed, reactive } from 'vue'
import { defineStore } from 'pinia'

import {type UserProp} from "@/service/interface";

const setItem = (key:string,value:any)=>{
  window.sessionStorage.setItem(key,JSON.stringify(value));
}

const getItem = (key:string)=>{
  const value = window.sessionStorage.getItem(key);
  return value?JSON.parse(value):undefined
}

export const useUserStore = defineStore('user', () => {
  const user = reactive<UserProp>(getItem("user")||{})


  function updateUser(_user: UserProp) {
    Object.assign(user, _user);
    setItem("user",_user)
  }


  return { user, updateUser }
})
