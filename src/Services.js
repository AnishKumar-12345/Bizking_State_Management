import axios from "axios";

export default { 
    data(){
        return{
            url:'http://103.211.218.32/'
        }
    },
    methods:{
        getBrands(){
            return axios
          .get(this.url +"bizkingz/services/api/brands/getBrands", {
            headers: {
              "Content-Type": "application/json",
              "accept": "*/*",
            //   "Authorization": "Bearer "+token
            }
          })
          .then(response => {
            return response.data;
          });
        },
        getBrandproducts(reqbody){
          return axios
          .get(this.url +"bizkingz/services/api/brands/getBrandsProducts?brand_id="+reqbody, {
            headers: {
              "Content-Type": "application/json",
              "accept": "*/*",
            //   "Authorization": "Bearer "+token
            }
          })
          .then(response => {
            return response.data;
          });
        },
    }
}