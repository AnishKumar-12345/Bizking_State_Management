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
                   
                    readonly
                />
              </VCol>
            
            <VCol
                md="6"
                cols="12"
              >
                <VSelect
                 v-model="this.outputStock.so_status"
                  label="SO Status"
                  readonly
                    :items="['Draft','Created','Shared','Acknowledged']"
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
          <VTextField v-model="item.shipped" outlined dense />

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
                <VBtn>Save</VBtn>

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

 
    </div>
</template>
<script>
import servicescall from '@/Services'
export default {
    mixins: [servicescall],
     props: ['so_id'],
   data(){
    return{
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
                "shipping_quantity":""
            },          
        ]

      },
      outputStockproducts:[],
      headers: [
        // { text: 'Product ID', value: 'id'},
        { text: 'Exchange Quantity', value: 'EQuantity' },
        { text: 'Ordered Quantity', value: 'OQuantity' },
        { text: 'Available', value: 'available' },
        { text: 'Shipped', value: 'shipped' },
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

   getFormattedDate(date) {
      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const day = String(date.getDate()).padStart(2, '0')
      return `${year}-${month}-${day}`
    },

        getOutputstockdetails() {
        this.getOutputstock(this.Soid).then(response => {
        this.OutputStockDetails = response.data
         console.log('check output dtock', this.OutputStockDetails.so_number);
         
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
          color: 'error',
          // text: 'Created',
        }   
      
      
      else
        return {
          color: 'success',
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
   },
 
}
</script>
<style scoped>

</style>