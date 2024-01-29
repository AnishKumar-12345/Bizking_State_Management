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
                  readonly
                />
              </VCol>
      
              <VCol
                cols="12"
                md="6"
              >
              <!-- {{formData.created_date}} -->
                <VTextField
                  v-model="formData.created_date"
                  type="date"
                  label="Date"
                  :min="today"
                
                />
              </VCol>
            
            <VCol
                md="6"
                cols="12"
              >
              <!-- {{formData.po_status}}  -->
                <VSelect
                  v-model="formData.po_status"
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
          <VTextField  @keydown="preventDecimal"    
          step="1"  type="number" v-model="item.quantity" style="min-width:80px;"/>
          <!-- {{ item.Quantity }} -->
        </td>
         <td class="text-center">
          {{ item.uom }}
        </td>
        <td class="text-center">
         &#8377; {{calculatedPricePerUnit[index]}} <br>
          <!-- &#8377;{{ item.total_given_margin }} -->
           <VChip
        :color="colorTGMmargin(item.total_given_margin).color"
        class="font-weight-medium"
        size="small"
      >
        ({{ item.total_given_margin }})
          <!-- {{ item.fat }} -->
            </VChip>
        </td>
        <td class="text-center">
          &#8377;{{ calculatedTaxableAmount[index]}}
        </td>
        <td class="text-center">
          &#8377;{{ calculatedCGSTAmount[index]}} <br/> 
          <!-- {{ item.cgst }} -->         
        <VChip
        :color="colorCGSTmargin(item.cgst).color"
        class="font-weight-medium"
        size="small"
      >
        ({{ item.cgst }})
          <!-- {{ item.fat }} -->
            </VChip>
        </td>
        <td class="text-center">
           &#8377;{{ calculatedSGSTAmount[index]}} <br/> 
          <!-- {{ item.sgst }} -->
           <VChip
        :color="colorSGSTmargin(item.sgst).color"
        class="font-weight-medium"
        size="small"
      >
        ({{ item.sgst }})
          <!-- {{ item.fat }} -->
            </VChip>
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
            <td class="text-center"> {{ allQuantity }}</td>
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
          <td class="text-left" color="success">Tax Details</td>
          <td colspan="4" class="text-right"></td>
          
          <!-- Right Side: Subtotal -->
          <td colspan="4" class="text-left">Amounts:</td> <!-- Empty cells for merging -->
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
                <VBtn @click="saveData">Save</VBtn>

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
      v-model="snackbar" :timeout="4000"
      :color="color"
      
    >
      {{ snackbarText }}
     <!-- <VBtn text @click="snackbar = false">Close</VBtn> -->
    </VSnackbar> 

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

import servicescall from "@/Services";

export default {
  mixins: [servicescall],
  components:{

  },
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

      formData: {
            brand_id: "",
            user_id: "",
            created_date: "",
            po_status: "",
            total_cgst: "",
            total_sgst: "",
            you_saved: "",
            'sub_total(taxable_amount_total)': "", // Rename the property as per your API
            total_so_amount: "",
            products: [
                {
                    brand_product_id: "",
                    sku_name: "",
                    hsn_code: "",
                    mrp: "",
                    quantity: "",
                    uom: "",
                    price_per_unit: "",
                    taxable_amount: "",
                    cgst: "",
                    sgst: "",
                    amount: "",
                    total_give_margin: ""
                },
                // ... additional products
            ]
        },
      quantityInput:0,
      AllBrandproducts:[],
      createdBy:'',
      userIds:'',
      Brandname:[],
      totals: {
          Quantity: 0,
          TaxableAmmount: 0,
          CGST: 0,
          SGST: 0,
          Ammount: 0,
        },

       today: new Date().toISOString().substr(0, 10), 
      // selectedDate: new Date().toISOString().substr(0, 10),
      landscape: false,
      noTitle: false,
        selectedPurchaseOrder: null,
        dialog: false,

           
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
        { text: 'Amount', value: 'calculateTotalamount' }, 
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
        // return Math.max(0, totalSavings).toFixed(2);
       return isNaN(totalSavings) ? 0 : Math.max(0, totalSavings).toFixed(2);
        //  if (isNaN(totalSavings)) {
        //   console.log('totalsave', 0);
        //   return '0'; // or return 0; depending on your use case
        // } else {
        //   console.log('totalsave', totalSavings.toFixed(2));
        //   return Math.max(0, totalSavings).toFixed(2);
        // }
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
      const AllBproducts =  this.AllBrandproducts.reduce((total, item) => total + parseFloat(item.quantity), 0);

      return isNaN(AllBproducts) ? 0 : AllBproducts.toFixed(0);

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
      this.userIds = localStorage.getItem('userId');
     
    },
    
   methods:{ 
    preventDecimal(event) {     
      if (event.key === '.' || event.key === ',') {
        event.preventDefault();
      }
    },
     saveData(){
        console.log('check the brandId',this.allCGSTAmount);
        const postData = {
          "brand_id": this.selectedBrandId,
          "user_id": this.userIds,
          "created_date": this.formData.created_date,
          "po_status": this.formData.po_status,
          "total_cgst": `${this.allCGSTAmount}`,
          "total_sgst": `${this.allSGSTAmount}`,
          "you_saved": `${this.savedamount}`,
          "sub_total": `${this.allAmmount}`,
          "total_so_amount": '',
          "products": this.AllBrandproducts.map((product,index) => ({
            "brand_product_id": product.brand_product_id,
            "sku_name": product.sku_name,
            "hsn_code": product.hsn_code,
            "mrp": product.mrp,
            "quantity":`${product.quantity}`,
            "uom":product.uom,
            "price_per_unit": `${this.calculatedPricePerUnit[index]}`,
            "taxable_amount":`${this.calculatedTaxableAmount[index]}`,
            "csgt":`${this.calculatedCGSTAmount[index]}`,
            "sgst":`${this.calculatedSGSTAmount[index]}`,
            "amount":`${this.calculateTotalamount[index]}`,
            "total_give_margin": product.total_given_margin,
            // Add other product properties as needed
            // ...
          })),
        };
        console.log('check the post data',postData);
        this.postPurchaseorder(postData).then((response) =>{
          console.log('check the response',response);
            if (response.status == 1) {              
               this.snackbar = true;
               this.color = "success";
               this.formData = {};
               this.snackbarText = response.message;  
               setTimeout(() => {
                window.location.reload(true);
            }, 2000);    
            } else {          
                 this.snackbar = true;
                 this.color = "error";
              };
           
        })
     },
  colorTGMmargin(text){
    if(text){
      return {
          color: 'success',
          // text: 'Shared',
        }
    }else{
      return{
        color: 'error'
      }
    }
   },
    colorSGSTmargin(text){
    if(text){
      return {
          color: 'success',
          // text: 'Shared',
        }
    }else{
      return{
        color: 'error'
      }
    }
   },

   colorCGSTmargin(text){
    if(text){
      return {
          color: 'success',
          // text: 'Shared',
        }
    }else{
      return{
        color: 'error'
      }
    }
   },

    handleBrandSelection() {
      console.log('Brand changed:', this.selectedPurchaseOrder);
      const selectedBrand = this.Brandname.find(
        (brand) => brand.brand_name === this.selectedPurchaseOrder
      );
        console.log("Select Brand Details",selectedBrand);

      if (selectedBrand) {
        this.selectedBrandId = selectedBrand.brand_id;
         console.log('check the brandId',this.selectedBrandId);
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