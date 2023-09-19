import http from "./http";

// 登录
interface Ilogin{
    username:string,
    password:string
}
export const loginApi = (params:Ilogin) => http.post('login',params)

// 左侧权限
interface Ileft{
    type:string
}
export const leftApi = (params:Ileft) => http.get(`rights/${params.type}`,params)


// 获取列表数据
interface Ilist{
    query?:string,
    pagenum:number,
    pagesize:number
}
export const listApi = (params:Ilist) => http.get('goods',params)

// 添加商品
interface IAdd{
    goods_name:string,
    goods_cat:string
    goods_price:number
    goods_number:number
    goods_weight:number
    goods_introduce?:string
    pics?:string,
    attrs?:object
}
export const addApi = (params:IAdd)=>http.post('goods',params)

// 分类列表数据
export const classApi = ()=>http.get('categories',{type:[1,2,3]})


// 删除
export const delApi = (params:any)=>http.delete(`goods/${params.id}`)