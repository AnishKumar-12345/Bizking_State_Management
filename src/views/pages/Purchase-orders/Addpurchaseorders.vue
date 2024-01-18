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
                <VSelect
                     v-model="selectedPurchaseOrder"
                  label="Brand or Manufacturer"
                  :items="['Jai Fresh Eggs & Meat Products','Ammammas easy2cook','Organic Express','Vijay Eggs','Roxy Roller Flour Mills (P) Ltd']"
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
          {{ item.Brand }}
        </td>
        <td class="text-center">
          {{ item.HSN }}
        </td>
        <td class="text-center">
          &#8377;{{ item.MRP }}
        </td>
        <td class="text-center">
          <VTextField v-model="item.Quantity" type="number"/>
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
              <!-- <VBtn
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
            </VBtn> -->
      
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

     <VDivider />
    <V-btn
     icon
     variant="text"
     color="default"
     class="mb-4 mt-4"
     size="small"
     style="margin-left: auto; display: block;"
     @click="openproductdialog()"
    >
      <!-- class="mb-4 mt-4" -->
        <VIcon
          icon="mdi-plus-box"
          size="30"        
          color="#956D4B"       
          />   
        </V-btn>         

<!-- <v-container fluid> -->
    <!-- item-key="fullName"
        class="table-rounded"
        hide-default-footer
        disable-sort -->


 <VDialog v-model="dialog" max-width="600">
      <VCard title="Dialog Title">
        <VCardText>
          <!-- Dialog content -->
          <p>Dialog content goes here.</p>
          <!-- Include your existing code inside the dialog -->
          <VForm class="mt-6 ">
            <VRow>
    
              <VCol
                md="6"
                cols="12"
              >
                <VSelect
                 
                  label="Brand or Manufacturer"
                  :items="['TATA','Britania','Reliance','Arnapurna','Pepsico']"
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
export default {
  components:{
    // VDatePicker,
  },
   data(){
    return{
      selectedDate: null,
      landscape: false,
      noTitle: false,
        selectedPurchaseOrder: null,
        dialog: false,
          data: [
            {
                po: 'PO001',
                Brand: 'Jai Fresh Eggs & Meat Products',
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
                po: 'PO001',
                Brand: 'Jai Fresh Eggs & Meat Products',
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
                po: 'PO001',
                Brand: 'Jai Fresh Eggs & Meat Products',
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
                po: 'PO001',
                Brand: 'Jai Fresh Eggs & Meat Products',
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
                po: 'PO001',
                Brand: 'Jai Fresh Eggs & Meat Products',
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
                po: 'PO002',             
                Brand: 'Ammammas easy2cook',
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
                po: 'PO002',             
                Brand: 'Ammammas easy2cook',
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
                po: 'PO002',             
                Brand: 'Ammammas easy2cook',
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
                po: 'PO002',             
                Brand: 'Ammammas easy2cook',
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
                po: 'PO002',             
                Brand: 'Ammammas easy2cook',
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
                po: 'PO003',
                 Brand: 'Organic Express',
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
                po: 'PO003',
                 Brand: 'Organic Express',
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
                po: 'PO003',
                 Brand: 'Organic Express',
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
                po: 'PO003',
                 Brand: 'Organic Express',
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
                po: 'PO003',
                 Brand: 'Organic Express',
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
                po: 'PO004',
                 Brand: 'Vijay Eggs',
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
                po: 'PO004',
                 Brand: 'Vijay Eggs',
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
                po: 'PO004',
                 Brand: 'Vijay Eggs',
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
                po: 'PO004',
                 Brand: 'Vijay Eggs',
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
                po: 'PO004',
                 Brand: 'Vijay Eggs',
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
                po: 'PO004',
                 Brand: 'Vijay Eggs',
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
                po: 'PO005',
                Brand: 'Roxy Roller Flour Mills (P) Ltd',
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
                po: 'PO005',
                Brand: 'Roxy Roller Flour Mills (P) Ltd',
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
                po: 'PO005',
                Brand: 'Roxy Roller Flour Mills (P) Ltd',
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
                po: 'PO005',
                Brand: 'Roxy Roller Flour Mills (P) Ltd',
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
                po: 'PO005',
                Brand: 'Roxy Roller Flour Mills (P) Ltd',
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
        { text: 'Brand', value: 'Brand' },
        { text: 'HSN', value: 'HSN' },
        { text: 'MRP', value: 'MRP' },
        { text: 'Quantity', value: 'Quantity' },
        { text: 'UOM', value: 'UOM' },
        { text: 'Price/Unit', value: 'PriceorUnit' },        
        { text: 'TaxableAmmount', value: 'TaxableAmmount' },   
        { text: 'CGST', value: 'CGST' },  
        { text: 'SGST', value: 'SGST' },  
        { text: 'Ammount', value: 'Ammount' }, 


      ],
    }
   },
     computed: {
      filteredDesserts() {
        if (!this.selectedPurchaseOrder) {
          // return this.desserts; 
        }

        return this.data.filter(item => item.Brand === this.selectedPurchaseOrder);
      },
    },
   methods:{
    onDateChange() {
      console.log('Selected date:', this.selectedDate);
    },
    //  deleteRow(item) {
    
    //   const index = this.data.indexOf(item);
    //   if (index !== -1) {
    //     this.data.splice(index, 1);
    //   }
    // },

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