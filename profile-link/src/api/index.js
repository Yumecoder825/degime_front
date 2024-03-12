import axios from "axios";
import {getAccessToken} from "../auth";

export const myConfig = { apiUrl: 'https://ik1-129-71227.vs.sakura.ne.jp/api' };
// export const myConfig = { apiUrl: 'http://localhost:8000/api' };

export class Apis {
    static setAuthToken(token) {
        if (token) {
            // console.log("set header token", token);
            axios.defaults.headers.common["Authorization"] = `token ${token}`;
        } else {
            delete axios.defaults.headers.common["Authorization"];
        }
    }

    static async myPost(url, body){
        try {
            // console.log("ShowData: ", response.data[0]);
            // console.log("Put data: ", response.data);
            const res = await axios.post(
                `${myConfig.apiUrl}/${url}`,
                body
            );
            if (res.status === 201) {
                return { success: true, data: res.data };
            }
            return { success: false, data: res.data };
        } catch (error) {
            console.error(error.message);
        }
    }

    static async myPut(url, body){
        try {
            // console.log("ShowData: ", response.data[0]);
            // console.log("Put data: ", response.data);
            const res = await axios.put(
                `${myConfig.apiUrl}/${url}`,
                body
            );
            if (res.status === 200 || res.status === 201) {
                return { success: true, data: res.data };
            }
            return { success: false, data: res.data };
        } catch (error) {
            console.error(error.message);
        }
    }

    static async myGet(url, config){
        try {
            // console.log("ShowData: ", response.data[0]);
            const res = await axios.get(
                `${myConfig.apiUrl}/${url}`, config
            );
            if (res.status === 200) {
                return { success: true, data: res.data };
            }
            return { success: false, data: res.data };
        } catch (error) {
            console.error(error.message);
        }
    };

    static async myDelete(url){
        try {
            // console.log("ShowData: ", response.data[0]);
            const res = await axios.delete(
                `${myConfig.apiUrl}/${url}`
            );
            if (res.status === 204) {
                return { success: true, data: res.data };
            }
            return { success: false, data: res.data };
        } catch (error) {
            console.error(error.message);
        }
    };

    static async me(){
        return this.myGet("account/me");
    }
}

const accessToken = getAccessToken();
if (accessToken) {
    // axios set bearer token
    Apis.setAuthToken(accessToken);
}
