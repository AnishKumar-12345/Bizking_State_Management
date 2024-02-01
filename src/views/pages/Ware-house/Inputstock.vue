<template>
  <div>
    <VRow>
      <VCol cols="12">
        <VCard
          title="Input Stock"
          class="mb-4"
        >
          <VCardText>
            <!-- 👉 Form -->
            <VForm class="mt-6">
              <VRow>
                <VCol
                  md="6"
                  cols="12"
                >
                  <!-- :items="['PO1', 'PO2', 'PO3','PO4','PO5']" -->

                  <VSelect
                    v-model="this.inputStock.po_number"
                    label="Purchase Order"
                  />
                </VCol>

                <VCol
                  cols="12"
                  md="6"
                >
                  <VTextField
                    v-model="this.inputStock.brand_name"
                    label="Order To"
                  />
                </VCol>

                <VCol
                  cols="12"
                  md="6"
                >
                  <VTextField
                    v-model="this.inputStock.stock_updated_date"
                    type="date"
                    label="Date"
                    :min="today"
                    :rules="dateRules"
                    readonly
                  />
                </VCol>

                <VCol
                  md="6"
                  cols="12"
                >
                  <VSelect
                    v-model="this.inputStock.po_status"
                    label="PO Status"
                    :items="['Draft', 'Created', 'Shared', 'Acknowledged', 'Received', 'Close']"
                  />
                </VCol>
                <VCol cols="12">
                  <VTable
                    :headers="headers"
                    :items="InputStockDetails"
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
                        v-for="(item, index) in this.inputStockproducts"
                        :key="index"
                      >
                        <td class="text-center">{{ item.sku_name }}</td>
                        <td class="text-center">
                          {{ item.quantity }}
                        </td>
                        <td class="text-center">
                          <VTextField
                            v-model="item.received_quantity"
                            outlined
                            dense
                          />
                        </td>
                        <td class="text-center">
                          <VTextField
                            v-model="item.rtm"
                            outlined
                            dense
                          />
                        </td>
                        <td class="text-center">
                          <VTextField
                             v-model="item.remarks"
                            outlined
                            dense
                          />
                        </td>
                      </tr>
                    </tbody>
                  </VTable>
                </VCol>
                <VCol
                  cols="12"
                  class="d-flex flex-wrap gap-4"
                >
                  <VBtn @click="saveInputstock">Save</VBtn>

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

  props: ['po_id'],
  data() {
    return {
      snackbar: false,
      snackbarText: '',
      timeout: 6000, // milliseconds
      color: '', // or 'error', 'warning', 'info', etc.
      top: false,
      bottom: true,
      left: false,
      right: false,

      today: this.getFormattedDate(new Date()),
      // inputStock: {
      //   po_number: '',
      //   brand_name: '',
      //   created_date: this.getFormattedDate(new Date()),
      //   po_status: '',
      //   you_saved: '',
      //   po_id: '',
      //   po_number: '',
      //   brand_id: '',
      //   products: [
      //     {
      //       brand_product_id: '',
      //       sku_name: '',
      //       hsn_code: '',
      //       mrp: '',
      //       quantity: '',
      //       uom: '',
      //       price_per_unit: '',
      //       taxable_amount: '',
      //       cgst: '',
      //       sgst: '',
      //       amount: '',
      //       total_give_margin: '',
      //     },
      //   ],
      // },
     inputStock: {
          "brand_id": "",
          "stock_updated_date": this.getFormattedDate(new Date()),
          "received_quantity":'',
          "remarks":'',
          "rtm":'',
          "products": [
              {
                  "brand_id": "",
                  "brand_product_id": "",
                  "received_quantity": "",
                  "rtm": "",
                  "remarks":""
              },             
          ]
      },
      PoId: '',
      InputStockDetails: [],
      selectedPurchaseOrder: null,
      dialog: false,

      headers: [
        // { text: 'Product ID', value: 'po_number'},
        { text: 'Product Name', value: 'brand_name' },
        { text: 'Ordered Quantity', value: 'quantity' },
        { text: 'Received Quantity', value: 'quantity' },
        { text: 'RTM', value: 'carbs' },
        { text: 'Remarks', value: 'protein' },
      ],
    }
  },
  computed: {
    filteredDesserts() {
      if (!this.selectedPurchaseOrder) {
        // return this.desserts;
      }
      return this.desserts.filter(item => item.purchaseOrder === this.selectedPurchaseOrder)
    },
  },

  mounted() {
    this.PoId = this.$route.query.po_id
    console.log('Received po_id:', this.PoId)
    this.getInputstockdetails()
  },

  methods: {
    saveInputstock(){
        const postData = {
          "brand_id":  this.inputStock.brand_id,
          "stock_updated_date": this.inputStock.stock_updated_date,          
          "products": this.inputStockproducts.filter(product => product.received_quantity > 0).map((product,index) => ({
            "brand_id": this.inputStock.brand_id,
                  "brand_product_id": product.brand_product_id,
                  "received_quantity": product.received_quantity,
                  "rtm": product.rtm,
                  "remarks": product.remarks,
          })),
        };
        console.log('check the post data',postData);
        this.PostInputstock(postData).then((response) =>{
          console.log('check the response',response);
          console.log('check the response',response.status);
            if (response.status == 1) {              
               this.snackbar = true;
               this.color = "success";
               this.formData = {};
               this.snackbarText = response.message;  
               this.getInputstockdetails();  
            } else {          
                 this.snackbar = true;
                 this.color = "error";
              };
           
        })
    },
    getFormattedDate(date) {
      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const day = String(date.getDate()).padStart(2, '0')
      return `${year}-${month}-${day}`
    },

    getInputstockdetails() {
      this.getInputstock(this.PoId).then(response => {
        this.InputStockDetails = response.data
        console.log('check input dtock', response)

        this.InputStockDetails.forEach(item => {
          this.inputStock.brand_id = item.brand_id
          this.inputStock.po_number = item.po_number
          this.inputStock.brand_name = item.brand_name
          this.inputStock.po_status = item.po_status
          this.inputStockproducts = item.products
          this.inputStock.received_quantity = item.received_quantity
          this.inputStock.remarks = item.remarks
          this.inputStock.rtm = item.rtm

          console.log('inputStockproducts', this.inputStockproducts)
        })      
      })
    },
    //  deleteRow(item) {

    //   const index = this.desserts.indexOf(item);
    //   if (index !== -1) {
    //     this.desserts.splice(index, 1);
    //   }
    // },

    //     openproductdialog(){
    //     console.log('check the dialog')
    //     this.dialog = true;
    //  },
    //   closeDialog() {
    //     this.dialog = false;
    //   },
  },
}
</script>
<style scoped></style>
