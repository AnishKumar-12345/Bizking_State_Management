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
              <!-- {{selectedPurchaseOrder}} -->
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
                  v-model="createdBy"
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
                  <!-- <V-btn
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
                      </V-btn>      -->
              <VCol cols="12">
                <!-- {{AllBrandproducts}} -->
      <VTable
       :headers="headers"
       :items="AllBrandproducts"
        
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
        v-for="(item,index) in AllBrandproducts"
        :key="index"
      >
       
        <!-- <td class="text-center">{{ item.po }}</td> -->
        <td class="text-center">
          {{ item.sku_name }}
        </td>
        <td class="text-center">
          {{ item.hsn_code }}
        </td>
        <td class="text-center">
          &#8377;{{ item.mrp }}
        </td>
        <td class="text-center">
          <VTextField  v-model="item.quantity" type="number" style="min-width:80px;"/>
          <!-- {{ item.Quantity }} -->
        </td>
         <td class="text-center">
          {{ item.uom }}
        </td>
        <td class="text-center">
         &#8377; {{calculatedPricePerUnit[index]}} <br> mar:{{item.total_given_margin}}
          <!-- &#8377;{{ item.PriceorUnit }} -->
        </td>
        <td class="text-center">
          &#8377;{{ calculatedTaxableAmount[index]}}
        </td>
        <td class="text-center">
          &#8377;{{ calculatedCGSTAmount[index]}} <br/> mar:{{item.cgst}}
          <!-- {{ item.cgst }} -->
        </td>
        <td class="text-center">
           &#8377;{{ calculatedSGSTAmount[index]}} <br/> mar:{{item.sgst}}
          <!-- {{ item.sgst }} -->
        </td>
        <td class="text-center">
          &#8377;{{ calculateTotalamount[index] }}
        </td>      
          <td >
                <VBtn
                icon
                variant="text"
                color="error"
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
            <td class="text-center"> &#8377;{{ allQuantity }}</td>
            <td></td>    
            <td></td>         
            <td class="text-center"> &#8377;{{ allTaxableAmmount }}</td>
            <td class="text-center"> &#8377;{{ allCGSTAmount }}</td>
            <td class="text-center"> &#8377;{{ allSGSTAmount }}</td>
            <td class="text-center"> &#8377;{{ allAmmount }}</td>   
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
          <td colspan="4" class="text-right">&#8377;{{ allCGSTAmount }}</td>
          
          <!-- Right Side: Subtotal -->
          <td colspan="4" class="text-left">SubTotal</td> <!-- Empty cells for merging -->
          <td colspan="4" class="text-center">&#8377;{{ allAmmount }}</td>
        </tr>

         <tr>
          <!-- Left Side: CGST -->
          <td class="text-left">SGST</td>
          <td colspan="4" class="text-right">&#8377;{{ allSGSTAmount }}</td>
          
          <!-- Right Side: Subtotal -->
          <td colspan="4" class="text-left">Total</td> <!-- Empty cells for merging -->
          <td colspan="4" class="text-center">&#8377;{{ allAmmount }}</td>
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
          <td colspan="4" class="text-center">&#8377;{{ allAmmount }}</td>
        </tr>

        <tr>
          <!-- Left Side: CGST -->
          <td class="text-left"></td>
          <td colspan="4" class="text-right"></td>
          
          <!-- Right Side: Subtotal -->
          <td colspan="4" class="text-left">You Saved</td> <!-- Empty cells for merging -->
          <td colspan="4" class="text-center">&#8377;{{ savedamount }}</td>
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
    
      quantityInput:0,
      AllBrandproducts:[],
      createdBy:'',
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

    //       data: [
    //         {
    //             po: '1',
    //             Brand: 'Jai Fresh Eggs & Meat Products',
    //             SKU: 'Normal Eggs',
    //             HSN:' ',
    //             MRP: '65',
    //             Quantity: 0,
    //             UOM: 'Pack of 6',
    //             PriceorUnit: '1428',
    //             TaxableAmmount:'1200',
    //             CGST: '3%',
    //             SGST: '2%',
    //             Ammount: '12000',

    //         },
    //          {
    //             po: '2',
    //             Brand: 'Jai Fresh Eggs & Meat Products',

    //             SKU: 'Premium Eggs',
    //             HSN:' ',
    //             MRP: '65',
    //             Quantity: 0,
    //             UOM: 'Pack of 6',
    //             PriceorUnit: '1428',
    //             TaxableAmmount:'1200',
    //             CGST: '3%',
    //             SGST: '2%',
    //             Ammount: '12000',

    //         },
    //          {
    //             po: '3',
    //             Brand: 'Jai Fresh Eggs & Meat Products',
    //             SKU: 'Normal Eggs',
    //             HSN:' ',
    //             MRP: '65',
    //             Quantity: 0,
    //             UOM: 'Pack of 6',
    //             PriceorUnit: '1428',
    //             TaxableAmmount:'1200',
    //             CGST: '3%',
    //             SGST: '2%',
    //             Ammount: '12000',

    //         },
    //          {
    //             po: '4',
    //             Brand: 'Jai Fresh Eggs & Meat Products',

    //             SKU: 'Premium Eggs',
    //             HSN:' ',
    //             MRP: '65',
    //             Quantity: 0,
    //             UOM: 'Pack of 6',
    //             PriceorUnit: '1428',
    //             TaxableAmmount:'1200',
    //             CGST: '3%',
    //             SGST: '2%',
    //             Ammount: '12000',

    //         },
    //          {
    //             po: '5',
    //             Brand: 'Jai Fresh Eggs & Meat Products',
    //             SKU: 'Premium Eggs',
    //             HSN:' ',
    //             MRP: '65',
    //             Quantity: 0,
    //             UOM: 'Pack of 6',
    //             PriceorUnit: '1428',
    //             TaxableAmmount:'1200',
    //             CGST: '3%',
    //             SGST: '2%',
    //             Ammount: '12000',

    //         },
    //         {
    //             po: '1',       
    //             Brand: 'Ammammas easy2cook',         

    //             SKU: 'Poori',
    //             HSN:'19059090',
    //             MRP: '70',
    //             Quantity: 2,
    //             UOM: '10 Pcs',
    //             PriceorUnit: '1428',
    //             "TaxableAmmount":'1200',
    //             CGST: '3%',
    //             SGST: '2%',
    //             Ammount: '12000',
    //         },
    //          {
    //             po: '2',             
    //             Brand: 'Ammammas easy2cook',         

    //             SKU: 'Methi Chapathi',
    //             HSN:'19059090',
    //             MRP: '70',
    //             Quantity: 2,
    //             UOM: '10 Pcs',
    //             PriceorUnit: '1428',
    //             "TaxableAmmount":'1200',
    //             CGST: '3%',
    //             SGST: '2%',
    //             Ammount: '12000',
    //         },
    //          {
    //             po: '3',       
    //             Brand: 'Ammammas easy2cook',         

    //             SKU: 'Ragi Chapathi',
    //             HSN:'19059090',
    //             MRP: '70',
    //             Quantity: 2,
    //             UOM: '10 Pcs',
    //             PriceorUnit: '1428',
    //             "TaxableAmmount":'1200',
    //             CGST: '3%',
    //             SGST: '2%',
    //             Ammount: '12000',
    //         },
    //          {
    //             po: '4',     
    //             Brand: 'Ammammas easy2cook',         

    //             SKU: 'Methi Chapathi',
    //             HSN:'19059090',
    //             MRP: '70',
    //             Quantity: 2,
    //             UOM: '10 Pcs',
    //             PriceorUnit: '1428',
    //             "TaxableAmmount":'1200',
    //             CGST: '3%',
    //             SGST: '2%',
    //             Ammount: '12000',
    //         },
    //          {
    //             po: '5',    
    //             Brand: 'Ammammas easy2cook',         
    //             SKU: 'Methi Chapathi',
    //             HSN:'19059090',
    //             MRP: '70',
    //             Quantity: 2,
    //             UOM: '10 Pcs',
    //             PriceorUnit: '1428',
    //             "TaxableAmmount":'1200',
    //             CGST: '3%',
    //             SGST: '2%',
    //             Ammount: '12000',
    //         },
    //         {
    //             po: '1',
    //             Brand: 'Organic Express',

    //              SKU: ' A2 Gir Ghee',
    //             HSN:' ',
    //             MRP: '1250',
    //             Quantity: 5,
    //             UOM: '500 ml',
    //             PriceorUnit: '1200',
    //             "TaxableAmmount":'1000',
    //             CGST: '3%',
    //             SGST: '2%',
    //             Ammount: '10000',

    //         },
    //         {
    //             po: '2',
    //             Brand: 'Organic Express',

    //              SKU: 'Pure Honey',
    //             HSN:' ',
    //             MRP: '1250',
    //             Quantity: 5,
    //             UOM: '500 ml',
    //             PriceorUnit: '1200',
    //             "TaxableAmmount":'1000',
    //             CGST: '3%',
    //             SGST: '2%',
    //             Ammount: '10000',

    //         },
    //         {
    //             po: '3',
    //             Brand: 'Organic Express',

    //              SKU: 'Wood Press Coconut Oil',
    //             HSN:' ',
    //             MRP: '1250',
    //             Quantity: 5,
    //             UOM: '500 ml',
    //             PriceorUnit: '1200',
    //             "TaxableAmmount":'1000',
    //             CGST: '3%',
    //             SGST: '2%',
    //             Ammount: '10000',

    //         },
    //         {
    //             po: '4',
    //             Brand: 'Organic Express',

    //              SKU: 'Appemidi Pickle',
    //             HSN:' ',
    //             MRP: '1250',
    //             Quantity: 5,
    //             UOM: '500 ml',
    //             PriceorUnit: '1200',
    //             "TaxableAmmount":'1000',
    //             CGST: '3%',
    //             SGST: '2%',
    //             Ammount: '10000',

    //         },
    //         {
    //             po: '5',
    //             Brand: 'Organic Express',

    //              SKU: 'Jeerige Midi Pickle',
    //             HSN:' ',
    //             MRP: '1250',
    //             Quantity: 5,
    //             UOM: '500 ml',
    //             PriceorUnit: '1200',
    //             "TaxableAmmount":'1000',
    //             CGST: '3%',
    //             SGST: '2%',
    //             Ammount: '10000',

    //         },
    //         {
    //             po: '1',
    //             Brand: 'Vijay Eggs',

    //              SKU: 'Premium Eggs',
    //             HSN:' ',
    //             MRP: '79',
    //             Quantity: 5,
    //             UOM: 'Pack of 6',
    //             PriceorUnit: '1500',
    //             "TaxableAmmount":'1200',
    //             CGST: '3%',
    //             SGST: '2%',
    //             Ammount: '3000',

    //         },
    //         {
    //             po: '2',
    //             Brand: 'Vijay Eggs',

    //              SKU: 'Brown Eggs',
    //             HSN:' ',
    //             MRP: '79',
    //             Quantity: 5,
    //             UOM: 'Pack of 6',
    //             PriceorUnit: '1500',
    //             "TaxableAmmount":'1200',
    //             CGST: '3%',
    //             SGST: '2%',
    //             Ammount: '3000',

    //         },
    //         {
    //             po: '3',
    //             Brand: 'Vijay Eggs',

    //              SKU: 'Brown Eggs',
    //             HSN:' ',
    //             MRP: '79',
    //             Quantity: 5,
    //             UOM: 'Pack of 6',
    //             PriceorUnit: '1500',
    //             "TaxableAmmount":'1200',
    //             CGST: '3%',
    //             SGST: '2%',
    //             Ammount: '3000',

    //         },
    //         {
    //             po: '4',
    //             Brand: 'Vijay Eggs',

    //              SKU: 'Premium Eggs',
    //             HSN:' ',
    //             MRP: '79',
    //             Quantity: 5,
    //             UOM: 'Pack of 6',
    //             PriceorUnit: '1500',
    //             "TaxableAmmount":'1200',
    //             CGST: '3%',
    //             SGST: '2%',
    //             Ammount: '3000',

    //         },
    //         {
    //             po: '5',
    //             Brand: 'Vijay Eggs',

    //              SKU: 'Premium Eggs',
    //             HSN:' ',
    //             MRP: '79',
    //             Quantity: 5,
    //             UOM: 'Pack of 6',
    //             PriceorUnit: '1500',
    //             "TaxableAmmount":'1200',
    //             CGST: '3%',
    //             SGST: '2%',
    //             Ammount: '3000',

    //         },
    //         {
    //             po: '6',
    //             Brand: 'Vijay Eggs',

    //              SKU: 'Brown Eggs',
    //             HSN:' ',
    //             MRP: '79',
    //             Quantity: 5,
    //             UOM: 'Pack of 6',
    //             PriceorUnit: '1500',
    //             "TaxableAmmount":'1200',
    //             CGST: '3%',
    //             SGST: '2%',
    //             Ammount: '3000',

    //         },
    //         {
    //             po: '1',
    //             Brand: 'Roxy Roller Flour Mills (P) Ltd',

    //             SKU: 'Nivah Sharbati Atta 1Kg',
    //             HSN:' ',
    //             MRP: '200',
    //             Quantity: 2,
    //             UOM: '1 Kg',
    //             PriceorUnit: '1200',
    //             "TaxableAmmount":'1000',
    //             CGST: '3%',
    //             SGST: '2%',
    //             Ammount: '2000',

    //         },
    //          {
    //             po: '2',
    //             Brand: 'Roxy Roller Flour Mills (P) Ltd',

    //             SKU: 'Nivah Sharbati Atta 1 Kg',
    //             HSN:' ',
    //             MRP: '200',
    //             Quantity: 2,
    //             UOM: '1 Kg',
    //             PriceorUnit: '1200',
    //             "TaxableAmmount":'1000',
    //             CGST: '3%',
    //             SGST: '2%',
    //             Ammount: '2000',

    //         },
    //            {
    //             po: '3',
    //             Brand: 'Roxy Roller Flour Mills (P) Ltd',

    //             SKU: 'Nivah Sharbati Atta 2 Kg',
    //             HSN:' ',
    //             MRP: '200',
    //             Quantity: 2,
    //             UOM: '2 Kg',
    //             PriceorUnit: '1200',
    //             "TaxableAmmount":'1000',
    //             CGST: '3%',
    //             SGST: '2%',
    //             Ammount: '2000',

    //         },
    //            {
    //             po: '4',
    //             Brand: 'Roxy Roller Flour Mills (P) Ltd',

    //             SKU: 'Nivah Sharbati Atta 5 Kg',
    //             HSN:' ',
    //             MRP: '200',
    //             Quantity: 2,
    //             UOM: '5 Kg',
    //             PriceorUnit: '1200',
    //             "TaxableAmmount":'1000',
    //             CGST: '3%',
    //             SGST: '2%',
    //             Ammount: '2000',

    //         },
    //            {
    //             po: '5',
    //             Brand: 'Roxy Roller Flour Mills (P) Ltd',
    //             SKU: 'Nivah High Quality Maida',
    //             HSN:' ',
    //             MRP: '200',
    //             Quantity: 2,
    //             UOM: '1 Kg',
    //             PriceorUnit: '1200',
    //             "TaxableAmmount":'1000',
    //             CGST: '3%',
    //             SGST: '2%',
    //             Ammount: '2000',

    //         },
            
              
    // ],

      headers: [
        // { text: 'Purchase Order', value: 'po' },
        { text: 'Product Name', value: 'sku_name' },
        { text: 'HSN', value: 'hsn_code' },
        { text: 'MRP', value: 'mrp' },
        { text: 'Quantity', value: 'quantity'},
        { text: 'UOM', value: 'uom' },
        { text: 'Price/Unit', value: 'calculatedPricePerUnit' },        
        { text: 'TaxableAmmount', value: 'calculatedTaxableAmount' },   
        { text: 'CGST', value: 'calculatedCGSTAmount' },  
        { text: 'SGST', value: 'calculatedSGSTAmount' },  
        { text: 'Ammount', value: 'calculateTotalamount' }, 
        { text: 'Actions', value: 'action' }, 


      ],

    }
   },
     computed: {
       totalIndividualAmount() {
          return this.AllBrandproducts.reduce((total, item) => {
          const MRPP = parseFloat(item.mrp);
          const quant = parseFloat(item.quantity);
        const individualAmount = MRPP * quant;
        console.log('check', total + individualAmount );
          return total + individualAmount;
        }, 0);
          
    
      },
      savedamount() {
        const totalSavings = this.totalIndividualAmount - parseFloat(this.allAmmount);
        console.log('totalsave',totalSavings)
        return Math.max(0, totalSavings).toFixed(2);
      },

      allAmmount(){
         const AllAmount = this.calculateTotalamount.reduce((tot, amo) => tot + parseFloat(amo), 0);
        return parseFloat(AllAmount.toFixed(2));
      },
       allSGSTAmount(){
        const totalSGSTAmount = this.calculatedSGSTAmount.reduce((to, am) => to + parseFloat(am), 0);
        return parseFloat(totalSGSTAmount.toFixed(2));

      },
      allCGSTAmount(){
        const totalCGSTAmount =  this.calculatedCGSTAmount.reduce((t, a) => t + parseFloat(a), 0);
        return parseFloat(totalCGSTAmount.toFixed(2));
      },
      allTaxableAmmount(){
      const allTaxAmount = this.calculatedTaxableAmount.reduce((total, amount) => total + parseFloat(amount) , 0);
        return parseFloat(allTaxAmount.toFixed(2));
        
      },
     allQuantity() {
      // Calculate the total quantity dynamically
      return this.AllBrandproducts.reduce((total, item) => total + parseFloat(item.quantity), 0);
    },
      calculateTotalamount(){
         return this.AllBrandproducts.map((item,index) => {
            const taxableammounts = parseFloat(this.calculatedTaxableAmount[index]);
            const cgstamount = parseFloat(this.calculatedCGSTAmount[index]);
            const sgstamount = parseFloat(this.calculatedSGSTAmount[index]);
            const tamount = taxableammounts+cgstamount+sgstamount;
             return isNaN(tamount) ? 0 : tamount.toFixed(2);
         })
      },
      calculatedSGSTAmount(){
         return this.AllBrandproducts.map((item,index) => {
            const taxamount = parseFloat(this.calculatedTaxableAmount[index]);
            const SGST = parseFloat(item.sgst.replace('%', ''));
            const sgstdata = taxamount*SGST / 100;
             return isNaN(sgstdata) ? 0 : sgstdata.toFixed(2);
         })
      },
      calculatedCGSTAmount(){
         return this.AllBrandproducts.map((item,index) => {
            const taxamount = parseFloat(this.calculatedTaxableAmount[index]);
            const CGST = parseFloat(item.cgst.replace('%', ''));
            const cgstdata = (taxamount*CGST) / 100;
             return isNaN(cgstdata) ? 0 : cgstdata.toFixed(2);
         })
      },
    calculatedPricePerUnit() {
      // const item = this.AllBrandproducts[index];
     return this.AllBrandproducts.map(item => {
      const mrp = parseFloat(item.mrp);
      const totalGivenMargin = parseFloat(item.total_given_margin.replace('%', ''));
      // const quantity = parseFloat(item.quantity);
      // Calculate the price per unit using the formula
      const pricePerUnit = mrp - (mrp * totalGivenMargin) / 100;

      // Round the result to two decimal places
      return isNaN(pricePerUnit) ? 0 : pricePerUnit.toFixed(2);
      // return pricePerUnit.toFixed(2);
      //  const roundedPricePerUnit = pricePerUnit.toFixed(2);
      //   this.AllBrandproducts[index] = { ...item, roundedPricePerUnit };
        // Vue.set(this.AllBrandproducts, index, { ...item, roundedPricePerUnit });
    });
  },
  calculatedTaxableAmount() {
    // const rawPricePerUnit = this.calculatedPricePerUnit[index];
    //     console.log("check PU",rawPricePerUnit);
    return this.AllBrandproducts.map((item, index) => {
      // console.log("check item",item);
      const quantitt = parseFloat(item.quantity);      
      // console.log("check quan",quantitt);
      const rawPricePerUnit = this.calculatedPricePerUnit[index];
      const pricePerUnit = parseFloat(rawPricePerUnit);

        if (isNaN(pricePerUnit)) {
          console.log(`Invalid value at index ${index}: ${rawPricePerUnit}`);
          return 0; // or any default value
        }
  
      const taxableAmount = quantitt * pricePerUnit;
       return isNaN(taxableAmount) ? 0 : taxableAmount.toFixed(2);
    });
  },
      
      brandNames() {
      return this.Brandname.map((brand) => brand.brand_name);
    },
    
    },
    mounted(){
      this.getBrandsdata();
      this.createdBy = localStorage.getItem('createdby');
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
                  this.AllBrandproducts = response.data;
                  console.log("BrandID",this.AllBrandproducts);
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
    
      const index = this.AllBrandproducts.indexOf(item);
      if (index !== -1) {
        this.AllBrandproducts.splice(index, 1);
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