import axios from "axios";
import { ElLoading } from "element-plus";

class apiRequest {
    instance:any

    constructor(urlConfig:any){
        this.instance = axios.create(urlConfig)

        // 请求拦截器
        this.instance.interceptors.request.use((config:any)=>{
            ElLoading.service({ fullscreen: true,text:'加载中' })
            let token = localStorage.getItem('token')
            if(token){
                config.headers.Authorization = token
            }
            
            return config
        })
        // 响应拦截器
        this.instance.interceptors.response.use((res:any)=>{
            ElLoading.service({ fullscreen: true,text:'加载中' }).close()
            
            return res.data
        })
    }

    get(url:string,params:any={}){
        return this.instance.get(url,{params})
    }
    post(url:string,params:any={}){
        return this.instance.post(url,params)
    }
    put(url:string,params:any={}){
        return this.instance.put(url,params)
    }
    delete(url:string,params:any={}){
        return this.instance.delete(url,params)
    }
}

export default new apiRequest({
    baseURL:'http://shiyansong.cn:8888/api/private/v1',
    timeout:3000
})
