import axios from "axios";

const BASE_URL = import.meta.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class
 * Static class that ties together methods to get/send to the app API
 */

class WanderlystApi {
    // token to interact with API
    static token;

    // method to pass auth token and make different requests
    static async request(endpoint, data={}, method="get"){
        // console.debug("API Call:", endpoint, method);

        const url = `${BASE_URL}/${endpoint}`;
        const headers = { Authorization: `Bearer ${WanderlystApi.token }`};
        const params = (method === "get") ? data : {};

        try{
            return (await axios({ url, method, data, params, headers })).data;
        }
        catch(err){
            if(axios.isAxiosError(err)){
                // Checks i err has response from server
                if(err.response){
                    let message = err.response.data.error.message;
                    throw Array.isArray(message) ? message : [message];
                }
                else{
                    throw ["Network Error"];
                }
            }
        }
            
    }

    /*****************API routes*****************/
    /** Signup user and retrieve token */
    static async signup(data){
        let res = await this.request("auth/signup", data, "post");
        return res.token;
    }

    /** Login user and retrieve token */
    static async login(data){
        let res = await this.request("auth/login", data, "post");
        return res.token;
    }

    /** Get user details/profile */
    static async getUser(username){
        let res = await this.request(`users/${username}`)
        return res.user;
    }

    /** Update user profile */
    static async updateUser(username, data){
        let res = await this.request(`users/${username}`, data, "patch");
        return res.user;
    }

    /** Delete user profile */
    static async deleteUser(username){
        let res = await this.request(`users/${username}`, {}, "delete");
        return res.deleted;
    }

    /** Like itinerary */
    static async likeItin(username, itinId){
        let res = await this.request(`users/${username}/like/${itinId}`, {}, "post");
        return res;
    }

    /** Create itinerary */
    static async createItin(data){
        let res = await this.request("itineraries", data, "post");
        return res.itinerary;
    }

    /** Delete itinerary */
    static async deleteItin(itinId, username){
        let res = await this.request(`itineraries/${itinId}/${username}`, {}, "delete");
        return res;
    }

    /** Get all itineraries, filtered if provided */
    static async getAllItins(filters){
        let res = await this.request("itineraries", filters);
        return res.itineraries;
    }

    /** Get itinerary details */
    static async getItin(itinId){
        let res = await this.request(`itineraries/${itinId}`);
        return res.itinerary;
    }

    /** Get all tags */
    static async getAllTags(){
        let res = await this.request("tags");
        return res.tags;
    }
    
    /** Get tag details */
    static async getTag(name){
        let res = await this.request(`tags/${name}`);
        return res.tag;
    }

}

export default WanderlystApi;

