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
        postPurchaseorder(reqbody){
          return axios
          .post(this.url +"bizkingz/services/api/purchase/createOrder",reqbody, {
            // withCredentials: true,
            headers: {
              "Content-Type": "application/json",
         
            }
          })
          .then(response => {
            return response.data;
          })
          .catch(err => {
            console.log('check tick',err);
            return err.response;
          }); 
        },
        getPurchaseorder(userid,userrole){
          return axios
          .get(this.url +"bizkingz/services/api/purchase/getPurchaseOrders?user_id="+userid+"&user_role="+userrole, {
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
        postupdatePurchaseorder(reqbody){
          return axios
          .post(this.url +"bizkingz/services/api/purchase/updateOrder",reqbody, {
            // withCredentials: true,
            headers: {
              "Content-Type": "application/json",
         
            }
          })
          .then(response => {
            return response.data;
          })
          .catch(err => {
            console.log('check tick',err);
            return err.response;
          });
        },
        getInputstock(request){
          return axios
          .get(this.url +"bizkingz/services/api/purchase/getPurchaseOrderDetails?po_id="+request, {
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
        PostInputstock(reqdata){
          return axios
          .post(this.url +"bizkingz/services/api/warehouse/inputStock",reqdata, {
            // withCredentials: true,
            headers: {
              "Content-Type": "application/json",
         
            }
          })
          .then(response => {
            return response.data;
          })
          .catch(err => {
            console.log('check tick',err);
            return err.response;
          });
        },
        getSalesorders(){
          return axios
          .get(this.url +"bizkingz/services/api/sales/getSalesOrders", {
            headers: {
              "Content-Type": "application/json",
              "accept": "*/*",
            //   "Authorization": "Bearer "+token
            }
          })
          .then(response => {
            return response.data;
          })
          .catch(err => {
            console.log('check tick',err);
            return err.response;
          });
        },
        getOutputstock(request){
          return axios
          .get(this.url +"bizkingz/services/api/sales/getSalesOrderDetails?so_id="+request, {
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
        getPurchasePDF(reqbody){
          return axios
          .get(this.url +"bizkingz/services/api/purchase/createPopdf?po_id="+reqbody, {
            headers: {
              "accept": "*/*",
              "Content-Type": "application/json",
              
            },
            // responseType: 'blob',
          })
          .then(response => {
            return response;
            // responseType: 'blob',
          })
          .catch(err => {
            return err.response;
          });
        },
        postOutputstock(reqbody){
          return axios
          .post(this.url +"bizkingz/services/api/warehouse/outputStock",reqbody, {
            // withCredentials: true,
            headers: {
              "Content-Type": "application/json",
         
            }
          })
          .then(response => {
            return response.data;
          })
          .catch(err => {
            console.log('check tick',err);
            return err.response;
          });
        },
        getAllstocks(){
          return axios
          .get(this.url +"bizkingz/services/api/warehouse/stock", {
            headers: {
              "accept": "*/*",
              "Content-Type": "application/json",
              
            },
            // responseType: 'blob',
          })
          .then(response => {
            return response;
            // responseType: 'blob',
          })
          .catch(err => {
            return err.response;
          });
        }
    }
}