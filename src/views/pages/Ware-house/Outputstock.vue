<template>
    <div>
         <VRow>
      <VCol cols="12">
       <VCard title="Output Stock" class="mb-4">       

        <VCardText>
          <!-- 👉 Form -->
          <VForm class="mt-6 ">
            <VRow>
    
              <VCol
                md="6"
                cols="12"
              >
                <VTextField
                  v-model=" this.outputStock.so_number"
                  label="Sales Order"
                readonly
                />
               
              </VCol>


            
              <VCol
                cols="12"
                md="6"
              >
                <VTextField
                v-model="this.outputStock.merchant_name"
                  label="Order From"
               readonly
                />
              </VCol>
      
              <VCol
                cols="12"
                md="6"
              >
                <VTextField
                  v-model="this.outputStock.shipped_date"
                   type="date"
                    label="Date"
                    :min="today"
                   
                    
                />
              </VCol>
            
            <VCol
                md="6"
                cols="12"
              >
                <VSelect
                 v-model="this.outputStock.so_status"
                  label="SO Status"
                  
                    :items="['Acknowledged','Shipped']"
                />
              </VCol>
              <VCol cols="12">
                
              <VTable
              :headers="headers"
              :items="OutputStockDetails"
                
              >
              <thead>
                <tr>
                  <th
                  class="text-center"
                    v-for="header in headers"
                    :key="header"
                  >
                    {{ header.text }}
                  </th>
                </tr>
              </thead>

      <tbody>
       <tr
        v-for="(item,index) in this.outputStockproducts"
        :key="index"
      >
       <!-- <td  class="text-center">
           {{item.id}}
          </td> -->
        <td class="text-center">{{ item.exchange_quantity }}</td>
        <td class="text-center">
          {{ item.ordered_quantity }}
        </td>
        <td class="text-center">
          <VChip
        :color="resolveStatusVariant(item).color"
        class="font-weight-medium"
        size="small"
      >
        {{ item.warehouse_quantity }}
      </VChip>
          <!-- {{ item.available }} -->
        </td>
        <td class="text-center">
          <VTextField   @keydown="preventDecimal"
                              @paste="preventPaste"
                              type="number"
                              min="0"
                               max="20000" v-model="item.shipped_ordered" outlined dense />

          <!-- {{ item.carbs }} -->
        </td>
           <span v-if="isQuantityExceeded(item.shipped_ordered,item.ordered_quantity)" >
                           
                          </span>
         <td class="text-center">
          <VTextField   @keydown="preventDecimal"
                              @paste="preventPaste"
                              type="number"
                              min="0"
                               max="20000" v-model="item.shipped_exchange" outlined dense />
    <span v-if="isQuantityExceeded2(item.shipped_exchange,item.exchange_quantity)" >
    </span>
          <!-- {{ item.carbs }} -->
        </td>
        <!-- <td class="text-center">
          <VTextField v-model="item.protein" outlined dense />

        
        </td> -->
      </tr>
      </tbody>        
        </VTable>

              </VCol>
              <VCol
                cols="12"
                class="d-flex flex-wrap gap-4"
              >
                <VBtn @click="saveOutputstock()">Save</VBtn>

                <VBtn
                  color="secondary"
                  variant="tonal"
                  type="reset"
               
                >
                  Reset
                </VBtn>
              </VCol>
            </VRow>
          </VForm>

        </VCardText>
      </VCard>
    </VCol>  
  </VRow>    
 <VSnackbar
      v-model="snackbar" :timeout="3000"
      :color="color"
      
    >
      {{ snackbarText }}
     <!-- <VBtn text @click="snackbar = false">Close</VBtn> -->
    </VSnackbar>
 
    </div>
</template>
<script>
import servicescall from '@/Services'
export default {
    mixins: [servicescall],
     props: ['so_id'],
   data(){
    return{
       snackbar: false,
      snackbarText: '',
      timeout: 6000, // milliseconds
      color: '', // or 'error', 'warning', 'info', etc.
      top: false,
      bottom: true,
      left: false,
      right: false,

      selectedPurchaseOrder: null,
        dialog: false,
    Soid:'',
    OutputStockDetails:[],
    today: this.getFormattedDate(new Date()),
      outputStock: {
        "so_id": "",
        "so_number": "",
        "merchant_id": "",
        "merchant_code": "",
        "merchant_name": "",
        "total_cgst": "",
        "total_sgst": "",
        "sub_total": "",
        "total_margin": "",
        "total_so_amount": "",
        "total_quantity": "",
        "created_date": "",
        "shipped_date": this.getFormattedDate(new Date()),
        "so_status": "",
        "products": [
            {
                "merchant_product_id": "",
                "sku_name": "",
                "hsn_code": "",
                "mrp": "",
                "margin": "",
                "ordered_quantity": "",
                "warehouse_quantity": "",
                "uom": "",
                "price_per_unit": "",
                "taxable_amount": "",
                "cgst": "",
                "sgst": "",
                "amount": "",
              
                "sgst_percentage":"",
                "cgst_percentage":"",
                "exchange":"",
                "return":"",
                "shipped_ordered":"",
                "shipped_exchange":"",

            },          
        ]

      },
      outputStockproducts:[],
      headers: [
        // { text: 'Product ID', value: 'id'},
        { text: 'Exchange Quantity', value: 'exchange_quantity' },
        { text: 'Ordered Quantity', value: 'ordered_quantity' },
        { text: 'Available', value: 'warehouse_quantity' },
        { text: 'Shipped Ordered', value: 'shipped_ordered' },
        { text: 'Shipped Exchanged', value: 'shipped_exchange' },

        // { text: 'Remarks', value: 'protein' },
      ],
    }
   },

   computed: {
  // filteredDesserts() {
  //   if (!this.selectedPurchaseOrder) {
  //     // return this.desserts; 
  //   }

  //   return this.desserts.filter(item => item.oid === this.selectedPurchaseOrder);
  // },
},
mounted(){  
    this.Soid = this.$route.query.so_id
    console.log('Received po_id:', this.Soid);
    this.getOutputstockdetails();
},
   methods:{
  
      preventPaste(event) {
      const clipboardData = event.clipboardData || window.clipboardData
      const pastedData = clipboardData.getData('text')

      // Validate pasted data (you can modify this regex as needed)
      const isValid = /^[0-9]+$/.test(pastedData)

      if (!isValid) {
        event.preventDefault()
      }
    },

     preventDecimal(event) {
     if (event.key === '.' || event.key === ',' ||  event.key === '+' ||  event.key === '-' || event.keyCode === 189 || event.keyCode === 109) {
        event.preventDefault();
      }
    },

    saveOutputstock(){
      const statusMapping = {
            'Draft': 1,
            'Created': 2,
            'Acknowledged': 3,
            'Shipped': 4,
            'Delivered':5
          };
       const postData = {
          "so_id":  this.OutputStockDetails.so_id,
          "so_number": this.outputStock.so_number, 
          "so_status": statusMapping[this.outputStock.so_status] ,         
          "merchant_id": this.OutputStockDetails.merchant_id,          
          "merchant_code": this.OutputStockDetails.merchant_code,          
          "merchant_name": this.outputStock.merchant_name,          
          "total_cgst": this.OutputStockDetails.total_cgst,   
          "total_sgst": this.OutputStockDetails.total_sgst,        
          "sub_total": this.OutputStockDetails.sub_total,          
          "total_margin": this.OutputStockDetails.total_margin,          
          "total_so_amount": this.OutputStockDetails.total_so_amount,          
          "total_quantity": this.OutputStockDetails.total_quantity,          
          "created_date": this.OutputStockDetails.created_date,          
          "shipped_date": this.outputStock.shipped_date,        
          "products": this.outputStockproducts.filter(product => product.shipped_ordered > 0 || product.shipped_exchange > 0).map((product,index) => ({
            "merchant_product_id": product.merchant_product_id,
                  "sku_name": product.sku_name,
                  "hsn_code": product.hsn_code,
                  "mrp": product.mrp,
                  "margin": product.margin,
                  "margin_percentage": product.margin_percentage,
                  // "ordered_quantity":  product.ordered_quantity,
                  // "warehouse_quantity":  product.warehouse_quantity,
                  "quantity": product.ordered_quantity,
                  "uom":  product.uom,
                  "price_per_unit":  product.price_per_unit,
                  "taxable_amount":  product.taxable_amount,
                  "cgst":  product.cgst,
                  "sgst":  product.sgst,
                  "amount":  product.amount,                
                  "sgst_percentage":  product.sgst_percentage,
                  "cgst_percentage":  product.cgst_percentage,
                  "exchange":  product.exchange,
                  "return":  product.return,
                  "shipped_ordered":  `${product.shipped_ordered}`,
                  "shipped_exchange":  `${product.shipped_exchange}`,
          })),
        };
        console.log('check the post data',postData);
       const validationErrors = postData.products.filter(product => {       
       console.log('sit', this.isQuantityExceeded(product.shipped_ordered, product.ordered_quantity));
        return (
          this.isQuantityExceeded(product.shipped_ordered, product.ordered_quantity) || 
          this.isQuantityExceeded2(product.shipped_exchange, product.exchange_quantity)       
        );
      });

       if (validationErrors.length === 0) {
            this.postOutputstock(postData).then((response)=>{
             console.log('check the response',response);
                // console.log('check the response',response.status);
                  if (response.status == 1) {              
                    this.snackbar = true;
                    this.color = "success";
                    this.formData = {};
                    this.snackbarText = response.message;  
                    // this.getInputstockdetails();  
                  } else {          
                      this.snackbar = true;
                      this.color = "error";
                    };
         })
       }else{
          this.snackbar = true;
          this.color = "error";
          this.snackbarText = "your quantities are exceeded"; 
       }
       

    },
   getFormattedDate(date) {
      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const day = String(date.getDate()).padStart(2, '0')
      return `${year}-${month}-${day}`
    },

      getOutputstockdetails() {
        this.getOutputstock(this.Soid).then(response => {
        this.OutputStockDetails = response.data
         console.log('check output dtock', this.OutputStockDetails);
         
        this.outputStock.so_number = this.OutputStockDetails.so_number;
        this.outputStock.merchant_name = this.OutputStockDetails.merchant_name;
        this.outputStock.so_status = this.OutputStockDetails.so_status;
        this.outputStockproducts = this.OutputStockDetails.products;
//  if (Array.isArray(this.OutputStockDetails)) {
//       this.OutputStockDetails.forEach(item => {
  

//         console.log('OutputStockDetails', this.OutputStockDetails);
//       });
//     } else {
//       console.error('OutputStockDetails is not an array:', this.OutputStockDetails);
//     }      
    })
    },

     resolveStatusVariant (itm){
      if (itm.warehouse_quantity < itm.ordered_quantity)
        return {
          color: 'success',
          // text: 'Created',
        }   
      
      
      else
        return {
          color: 'error',
          // text: 'Shared',
        }
      },
     deleteRow(item) {
      // Implement your logic to delete the row
      const index = this.desserts.indexOf(item);
      if (index !== -1) {
        this.desserts.splice(index, 1);
      }
    },

      openproductdialog(){
    console.log('check the dialog')
      this.dialog = true;
   },
    closeDialog() {
      this.dialog = false;
    },

      isQuantityExceeded(sq,oq){
       if (sq !== "0" &&  sq > oq){
        this.snackbar = true;
        this.color = "error";
        this.snackbarText = "Shipped quantity cannot exceed orderd quantity."
      }
    },
    isQuantityExceeded2(seq,eq){
       if(seq !== "0" && seq > eq){
        this.snackbar = true;
        this.color = "error";
        this.snackbarText = "Shipped quantity cannot exceed orderd quantity."
      }
    },
   },
 
}
</script>
<style scoped>

</style>