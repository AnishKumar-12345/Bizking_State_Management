<template>
    <div>
         <VRow>
      <VCol cols="12">
       <VCard title="Purchase Order" class="mb-4">       

       
        <VCardText>
          
          <!-- 👉 Form -->
          <VForm class="mt-6 ">
           
            <VRow>
    
              <VCol
                md="6"
                cols="12"
              >
              {{selectedPurchaseOrder}}
                <VSelect
                  v-model="selectedPurchaseOrder"
                  label="Brand or Manufacturer"
                  :items="brandNames"               
                  @update:model-value="handleBrandSelection"
                />
              </VCol>


            
              <VCol
                cols="12"
                md="6"
              >
                <VTextField
                
                  label="Created By"
               
                />
              </VCol>
      
              <VCol
                cols="12"
                md="6"
              >
              
                <VTextField
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
                 
                  label="PO Status"
                  :items="['Draft','Created','Shared','Acknowledged','Received','Close']"
                />
              </VCol>
              <VDivider />
                  <V-btn
                  icon
                  variant="text"
                  color="default"
                  class="mb-1 mt-2"
                  size="small"
                  style="margin-left: auto; display: block;"
                  @click="openproductdialog()"
                  >
                  
                      <VIcon
                        icon="mdi-plus-box"
                        size="30"        
                        color="#BA8B32"       
                        />   
                      </V-btn>     
              <VCol cols="12">
      <VTable
       :headers="headers"
       :items="desserts"
        
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
        v-for="item in filteredDesserts"
        :key="item.po"
      >
       
        <td class="text-center">{{ item.po }}</td>
        <td class="text-center">
          {{ item.SKU }}
        </td>
        <td class="text-center">
          {{ item.HSN }}
        </td>
        <td class="text-center">
          &#8377;{{ item.MRP }}
        </td>
        <td class="text-center">
          <VTextField v-model="item.Quantity" type="number" style="min-width:80px;"/>
          <!-- {{ item.Quantity }} -->
        </td>
         <td class="text-center">
          {{ item.UOM }}
        </td>
        <td class="text-center">
          &#8377;{{ item.PriceorUnit }}
        </td>
        <td class="text-center">
          &#8377;{{ item.TaxableAmmount }}
        </td>
        <td class="text-center">
          {{ item.CGST }}
        </td>
        <td class="text-center">
          {{ item.SGST }}
        </td>
        <td class="text-center">
          &#8377;{{ item.Ammount }}
        </td>      
          <td >
                <VBtn
                icon
                variant="text"
                color="default"
                class="me-2"
                size="small"
                @click="deleteRow(item)"
            >
                <VIcon
                icon="mdi-minus-circle-outline"
                size="24"
                />
            </VBtn>

             <!-- <VBtn
              icon
              variant="text"
              color="default"
              size="small"
              @click="addNewRow(item)"
            >
              <VIcon icon="mdi-plus-circle-outline" size="24" />
            </VBtn> -->
          </td>
      
      </tr>
      </tbody>
      <tfoot>
          <tr>
            <td class="text-center">Total</td>
            <td></td>
            <td></td>
            <td></td>
            <td class="text-center"> &#8377;{{ totals.Quantity }}</td>
            <td></td>
            <td></td>
            <td class="text-center"> &#8377;{{ totals.TaxableAmmount }}</td>
            <td class="text-center"> &#8377;{{ totals.CGST }}</td>
            <td class="text-center"> &#8377;{{ totals.SGST }}</td>
            <td class="text-center"> &#8377;{{ totals.Ammount }}</td>   
            <td></td> 
          </tr>
         <tr>
          <!-- Left Side: CGST -->
          <td class="text-left">Tax Details</td>
          <td colspan="4" class="text-right">{{ totals.tax }}</td>
          
          <!-- Right Side: Subtotal -->
          <td colspan="4" class="text-left">Ammounts:</td> <!-- Empty cells for merging -->
          <td colspan="4" class="text-center"></td>
        </tr>

         <tr>
          <!-- Left Side: CGST -->
          <td class="text-left">CGST</td>
          <td colspan="4" class="text-right">&#8377;{{ totals.CGST }}</td>
          
          <!-- Right Side: Subtotal -->
          <td colspan="4" class="text-left">SubTotal</td> <!-- Empty cells for merging -->
          <td colspan="4" class="text-center">&#8377;{{ totals.Ammount }}</td>
        </tr>

         <tr>
          <!-- Left Side: CGST -->
          <td class="text-left">SGST</td>
          <td colspan="4" class="text-right">&#8377;{{ totals.CGST }}</td>
          
          <!-- Right Side: Subtotal -->
          <td colspan="4" class="text-left">Total</td> <!-- Empty cells for merging -->
          <td colspan="4" class="text-center">&#8377;{{ totals.Ammount }}</td>
        </tr>

         <tr>
          <!-- Left Side: CGST -->
          <td class="text-left"></td>
          <td  colspan="4" class="text-right"></td>
          
          <!-- Right Side: Subtotal -->
          <td colspan="4" class="text-left">Advance</td> <!-- Empty cells for merging -->
          <td colspan="4" class="text-center">&#8377;{{ totals.Quantity }}</td>
        </tr>

         <tr>
          <!-- Left Side: CGST -->
          <td class="text-left"></td>
          <td colspan="4" class="text-right"></td>
          
          <!-- Right Side: Subtotal -->
          <td  colspan="4" class="text-left">Balance</td> <!-- Empty cells for merging -->
          <td colspan="4" class="text-center">&#8377;{{ totals.Ammount }}</td>
        </tr>

        <tr>
          <!-- Left Side: CGST -->
          <td class="text-left"></td>
          <td colspan="4" class="text-right"></td>
          
          <!-- Right Side: Subtotal -->
          <td colspan="4" class="text-left">You Saved</td> <!-- Empty cells for merging -->
          <td colspan="4" class="text-center">&#8377;{{ totals.Ammount }}</td>
        </tr>
  </tfoot>        
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

      
 <!-- class="mb-4 mt-4" -->
    <!-- <v-container fluid> -->
    <!-- item-key="fullName"
        class="table-rounded"
        hide-default-footer
        disable-sort -->


 <VDialog v-model="dialog" max-width="600">
      <VCard title="Add Your Product">
        <VCardText>
          <!-- Dialog content -->
          <!-- <p>Add Your Product</p> -->
          <!-- Include your existing code inside the dialog -->
          <VForm class="mt-6 ">
            <VRow>
    
              <VCol
                md="6"
                cols="12"
              >
                <VSelect
                 
                  label="Products"
                  :items="['Normal Eggs','Premium Eggs','Poori','Methi Chapathi','Ragi Chapathi']"
                />
              </VCol>


            
              <!-- <VCol
                cols="12"
                md="6"
              >
                <VTextField
                
                  label="Created By"
               
                />
              </VCol>
      
              <VCol
                cols="12"
                md="6"
              >
                <VTextField
                
                  label="Date"
                />
              </VCol>
            
            <VCol
                md="6"
                cols="12"
              >
                <VSelect
                 
                  label="PO Status"
                  :items="['Accept','Reject']"
                />
              </VCol> -->
              
              <VCol
                cols="12"
                class="d-flex flex-wrap gap-4"
              >
                <VBtn>Add</VBtn>

                <VBtn
                  color="secondary"
                  variant="tonal"
                  type="reset"
                  @click="closeDialog"
                >
                  Close
                </VBtn>
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
        <VCardActions>        
        </VCardActions>
      </VCard>
    </VDialog>

    </div>
</template>
<script>
// import { VDatePicker } from 'vuetify/lib/components/VDatePicker';
import servicescall from "@/Services";
export default {
  mixins: [servicescall],
  components:{
    // VDatePicker,
  },
   data(){
    return{
          Brandname:[],
          totals: {
          Quantity: 0,
          TaxableAmmount: 0,
          CGST: 0,
          SGST: 0,
          Ammount: 0,
        },

       today: new Date().toISOString().substr(0, 10), // Set today's date as the minimum date
      selectedDate: null,
      landscape: false,
      noTitle: false,
        selectedPurchaseOrder: null,
        dialog: false,

          data: [
            {
                po: '1',
                Brand: 'Jai Fresh Eggs & Meat Products',
                SKU: 'Normal Eggs',
                HSN:' ',
                MRP: '65',
                Quantity: 0,
                UOM: 'Pack of 6',
                PriceorUnit: '1428',
                TaxableAmmount:'1200',
                CGST: '3%',
                SGST: '2%',
                Ammount: '12000',

            },
             {
                po: '2',
                Brand: 'Jai Fresh Eggs & Meat Products',

                SKU: 'Premium Eggs',
                HSN:' ',
                MRP: '65',
                Quantity: 0,
                UOM: 'Pack of 6',
                PriceorUnit: '1428',
                TaxableAmmount:'1200',
                CGST: '3%',
                SGST: '2%',
                Ammount: '12000',

            },
             {
                po: '3',
                Brand: 'Jai Fresh Eggs & Meat Products',
                SKU: 'Normal Eggs',
                HSN:' ',
                MRP: '65',
                Quantity: 0,
                UOM: 'Pack of 6',
                PriceorUnit: '1428',
                TaxableAmmount:'1200',
                CGST: '3%',
                SGST: '2%',
                Ammount: '12000',

            },
             {
                po: '4',
                Brand: 'Jai Fresh Eggs & Meat Products',

                SKU: 'Premium Eggs',
                HSN:' ',
                MRP: '65',
                Quantity: 0,
                UOM: 'Pack of 6',
                PriceorUnit: '1428',
                TaxableAmmount:'1200',
                CGST: '3%',
                SGST: '2%',
                Ammount: '12000',

            },
             {
                po: '5',
                Brand: 'Jai Fresh Eggs & Meat Products',
                SKU: 'Premium Eggs',
                HSN:' ',
                MRP: '65',
                Quantity: 0,
                UOM: 'Pack of 6',
                PriceorUnit: '1428',
                TaxableAmmount:'1200',
                CGST: '3%',
                SGST: '2%',
                Ammount: '12000',

            },
            {
                po: '1',       
                Brand: 'Ammammas easy2cook',         

                SKU: 'Poori',
                HSN:'19059090',
                MRP: '70',
                Quantity: 2,
                UOM: '10 Pcs',
                PriceorUnit: '1428',
                "TaxableAmmount":'1200',
                CGST: '3%',
                SGST: '2%',
                Ammount: '12000',
            },
             {
                po: '2',             
                Brand: 'Ammammas easy2cook',         

                SKU: 'Methi Chapathi',
                HSN:'19059090',
                MRP: '70',
                Quantity: 2,
                UOM: '10 Pcs',
                PriceorUnit: '1428',
                "TaxableAmmount":'1200',
                CGST: '3%',
                SGST: '2%',
                Ammount: '12000',
            },
             {
                po: '3',       
                Brand: 'Ammammas easy2cook',         

                SKU: 'Ragi Chapathi',
                HSN:'19059090',
                MRP: '70',
                Quantity: 2,
                UOM: '10 Pcs',
                PriceorUnit: '1428',
                "TaxableAmmount":'1200',
                CGST: '3%',
                SGST: '2%',
                Ammount: '12000',
            },
             {
                po: '4',     
                Brand: 'Ammammas easy2cook',         

                SKU: 'Methi Chapathi',
                HSN:'19059090',
                MRP: '70',
                Quantity: 2,
                UOM: '10 Pcs',
                PriceorUnit: '1428',
                "TaxableAmmount":'1200',
                CGST: '3%',
                SGST: '2%',
                Ammount: '12000',
            },
             {
                po: '5',    
                Brand: 'Ammammas easy2cook',         
                SKU: 'Methi Chapathi',
                HSN:'19059090',
                MRP: '70',
                Quantity: 2,
                UOM: '10 Pcs',
                PriceorUnit: '1428',
                "TaxableAmmount":'1200',
                CGST: '3%',
                SGST: '2%',
                Ammount: '12000',
            },
            {
                po: '1',
                Brand: 'Organic Express',

                 SKU: ' A2 Gir Ghee',
                HSN:' ',
                MRP: '1250',
                Quantity: 5,
                UOM: '500 ml',
                PriceorUnit: '1200',
                "TaxableAmmount":'1000',
                CGST: '3%',
                SGST: '2%',
                Ammount: '10000',

            },
            {
                po: '2',
                Brand: 'Organic Express',

                 SKU: 'Pure Honey',
                HSN:' ',
                MRP: '1250',
                Quantity: 5,
                UOM: '500 ml',
                PriceorUnit: '1200',
                "TaxableAmmount":'1000',
                CGST: '3%',
                SGST: '2%',
                Ammount: '10000',

            },
            {
                po: '3',
                Brand: 'Organic Express',

                 SKU: 'Wood Press Coconut Oil',
                HSN:' ',
                MRP: '1250',
                Quantity: 5,
                UOM: '500 ml',
                PriceorUnit: '1200',
                "TaxableAmmount":'1000',
                CGST: '3%',
                SGST: '2%',
                Ammount: '10000',

            },
            {
                po: '4',
                Brand: 'Organic Express',

                 SKU: 'Appemidi Pickle',
                HSN:' ',
                MRP: '1250',
                Quantity: 5,
                UOM: '500 ml',
                PriceorUnit: '1200',
                "TaxableAmmount":'1000',
                CGST: '3%',
                SGST: '2%',
                Ammount: '10000',

            },
            {
                po: '5',
                Brand: 'Organic Express',

                 SKU: 'Jeerige Midi Pickle',
                HSN:' ',
                MRP: '1250',
                Quantity: 5,
                UOM: '500 ml',
                PriceorUnit: '1200',
                "TaxableAmmount":'1000',
                CGST: '3%',
                SGST: '2%',
                Ammount: '10000',

            },
            {
                po: '1',
                Brand: 'Vijay Eggs',

                 SKU: 'Premium Eggs',
                HSN:' ',
                MRP: '79',
                Quantity: 5,
                UOM: 'Pack of 6',
                PriceorUnit: '1500',
                "TaxableAmmount":'1200',
                CGST: '3%',
                SGST: '2%',
                Ammount: '3000',

            },
            {
                po: '2',
                Brand: 'Vijay Eggs',

                 SKU: 'Brown Eggs',
                HSN:' ',
                MRP: '79',
                Quantity: 5,
                UOM: 'Pack of 6',
                PriceorUnit: '1500',
                "TaxableAmmount":'1200',
                CGST: '3%',
                SGST: '2%',
                Ammount: '3000',

            },
            {
                po: '3',
                Brand: 'Vijay Eggs',

                 SKU: 'Brown Eggs',
                HSN:' ',
                MRP: '79',
                Quantity: 5,
                UOM: 'Pack of 6',
                PriceorUnit: '1500',
                "TaxableAmmount":'1200',
                CGST: '3%',
                SGST: '2%',
                Ammount: '3000',

            },
            {
                po: '4',
                Brand: 'Vijay Eggs',

                 SKU: 'Premium Eggs',
                HSN:' ',
                MRP: '79',
                Quantity: 5,
                UOM: 'Pack of 6',
                PriceorUnit: '1500',
                "TaxableAmmount":'1200',
                CGST: '3%',
                SGST: '2%',
                Ammount: '3000',

            },
            {
                po: '5',
                Brand: 'Vijay Eggs',

                 SKU: 'Premium Eggs',
                HSN:' ',
                MRP: '79',
                Quantity: 5,
                UOM: 'Pack of 6',
                PriceorUnit: '1500',
                "TaxableAmmount":'1200',
                CGST: '3%',
                SGST: '2%',
                Ammount: '3000',

            },
            {
                po: '6',
                Brand: 'Vijay Eggs',

                 SKU: 'Brown Eggs',
                HSN:' ',
                MRP: '79',
                Quantity: 5,
                UOM: 'Pack of 6',
                PriceorUnit: '1500',
                "TaxableAmmount":'1200',
                CGST: '3%',
                SGST: '2%',
                Ammount: '3000',

            },
            {
                po: '1',
                Brand: 'Roxy Roller Flour Mills (P) Ltd',

                SKU: 'Nivah Sharbati Atta 1Kg',
                HSN:' ',
                MRP: '200',
                Quantity: 2,
                UOM: '1 Kg',
                PriceorUnit: '1200',
                "TaxableAmmount":'1000',
                CGST: '3%',
                SGST: '2%',
                Ammount: '2000',

            },
             {
                po: '2',
                Brand: 'Roxy Roller Flour Mills (P) Ltd',

                SKU: 'Nivah Sharbati Atta 1 Kg',
                HSN:' ',
                MRP: '200',
                Quantity: 2,
                UOM: '1 Kg',
                PriceorUnit: '1200',
                "TaxableAmmount":'1000',
                CGST: '3%',
                SGST: '2%',
                Ammount: '2000',

            },
               {
                po: '3',
                Brand: 'Roxy Roller Flour Mills (P) Ltd',

                SKU: 'Nivah Sharbati Atta 2 Kg',
                HSN:' ',
                MRP: '200',
                Quantity: 2,
                UOM: '2 Kg',
                PriceorUnit: '1200',
                "TaxableAmmount":'1000',
                CGST: '3%',
                SGST: '2%',
                Ammount: '2000',

            },
               {
                po: '4',
                Brand: 'Roxy Roller Flour Mills (P) Ltd',

                SKU: 'Nivah Sharbati Atta 5 Kg',
                HSN:' ',
                MRP: '200',
                Quantity: 2,
                UOM: '5 Kg',
                PriceorUnit: '1200',
                "TaxableAmmount":'1000',
                CGST: '3%',
                SGST: '2%',
                Ammount: '2000',

            },
               {
                po: '5',
                Brand: 'Roxy Roller Flour Mills (P) Ltd',
                SKU: 'Nivah High Quality Maida',
                HSN:' ',
                MRP: '200',
                Quantity: 2,
                UOM: '1 Kg',
                PriceorUnit: '1200',
                "TaxableAmmount":'1000',
                CGST: '3%',
                SGST: '2%',
                Ammount: '2000',

            },
            
              
    ],

      headers: [
        { text: 'Purchase Order', value: 'po' },
        { text: 'Product', value: 'SKU' },
        { text: 'HSN', value: 'HSN' },
        { text: 'MRP', value: 'MRP' },
        { text: 'Quantity', value: 'Quantity'},
        { text: 'UOM', value: 'UOM' },
        { text: 'Price/Unit', value: 'PriceorUnit' },        
        { text: 'TaxableAmmount', value: 'TaxableAmmount' },   
        { text: 'CGST', value: 'CGST' },  
        { text: 'SGST', value: 'SGST' },  
        { text: 'Ammount', value: 'Ammount' }, 
        { text: 'Actions', value: 'action' }, 


      ],

    }
   },
     computed: {
      // filteredDesserts() {
      //   if (!this.selectedPurchaseOrder) {
      //     // return this.desserts; 
      //   }

      //   for (const key in this.totals) {
      //     this.totals[key] = 0;
      //   }

      //   const filteredData = this.data.filter(item => item.Brand === this.selectedPurchaseOrder);


      //   filteredData.forEach(item => {
      //         for (const key in this.totals) {
      //           this.totals[key] += parseFloat(item[key]) || 0;
      //         }
      //       });

            
      //   return this.data.filter(item => item.Brand === this.selectedPurchaseOrder);

      //   // return filteredData;

        
      // },
      brandNames() {
      return this.Brandname.map((brand) => brand.brand_name);
    },
    },
    mounted(){
      this.getBrandsdata();
    },
    
   methods:{
    handleBrandSelection() {
      console.log('Brand changed:', this.selectedPurchaseOrder);
      const selectedBrand = this.Brandname.find(
        (brand) => brand.brand_name === this.selectedPurchaseOrder
      );
        console.log("Select",selectedBrand);

      if (selectedBrand) {
        this.selectedBrandId = selectedBrand.brand_id;

        this.getBrandproducts(this.selectedBrandId).then((response)=>{
                  console.log("BrandID",response);
        })
        // Call your API method to get brand details using this.selectedBrandId
        // this.getBrandDetails();
      }
    },
    getBrandsdata(){
      this.getBrands().then((response)=>{
        
        // this.Brandname = response.data.map(e => e.brand_name)
        this.Brandname = response.data;
        console.log('check the response', this.Brandname);
      })
    },
    //  addNewRow(item) {
    //   // Create a new row by cloning the existing item
    //   const newRow = { ...item, po: String(this.data.length + 1) };
    //   // Add the new row to the data array
    //   this.data.push(newRow);
    // },
    onDateChange() {
      console.log('Selected date:', this.selectedDate);
    },
     deleteRow(item) {
    
      const index = this.data.indexOf(item);
      if (index !== -1) {
        this.data.splice(index, 1);
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