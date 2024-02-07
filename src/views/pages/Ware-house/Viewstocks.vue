<template>
  <div>
      <div v-if="loading"  class="loading-container">
      <VProgressLinear
            height="5"
            color="primary"
            indeterminate
            class="custom-loader"  
            full-width              
        />          
     </div>

      <!-- <VRow v-if="this.filteredPurchaseHistory == null">
      <VCol cols="12"> 
        <VCard title="Purchase Order View">
          <VCardText> 
     
            <VAlert
              color="warning"
              variant="tonal"
              class="mb-4"              
              border="top"
            >
              <VAlertTitle class="mb-1"> Are you sure you gave Purchase Orders? </VAlertTitle>
              <p class="mb-0">
                The system is not retrieving the Purchase Histories from Purchase Orders. Please ensure that you have applied for Purchase Orders !</p>
            </VAlert>
          </VCardText>
        </VCard>
      </VCol>
     </VRow> -->

     <VTable 
       :headers="headers"
       :items="this.Allstocks"
       item-key="dessert"
       class="table-rounded"      
       height="500"
       fixed-header 
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
      
            v-for="(item,index) in this.Allstocks.data"
        :key="index"
         
      >       
        <td class="text-center">{{ item.brand_name }}</td>
        <td class="text-center">
          {{ item.sku_name }}
        </td>
        <!-- <td class="text-center">
           <VChip
        :color="resolveStatusVariant(item.po_status).color"
        class="font-weight-medium"
        size="small"
      >
        {{ item.po_status }}
       
            </VChip>
        </td> -->
        <td class="text-center">
          {{ item.uom }}
        </td>
        <td class="text-center">
          {{ item.hsn_code }}
        </td>
          <td class="text-center">
          {{ item.available_qty }}
        </td>
          <td class="text-center">
          {{ item.stock_updated_date }}
        </td>
        <!-- <td  class="text-center " v-if="item.po_status != 'Received'">
   
            <VBtn
                icon
                variant="text"
                color="success"
                class="me-2"
                size="small"                
            >
          
              <VIcon
              icon="mdi-invoice-receive-outline"
              color="success"
              size="30"
              @click="inputstock(item)"
              />
            </VBtn>
             
          </td> -->
      </tr>
      </tbody>        
        </VTable>
  </div>
</template>

<script>
import servicescall from "@/Services";

export default {
  mixins: [servicescall],

    data(){
        return{
      
          loading:true,
    Allstocks:[],

      headers: [
          { text: 'Brand Name', value: 'brand_name' },
          { text: 'SKU Name', value: 'sku_name' },
          { text: 'UOM', value: 'uom' },
          { text: 'HSN Code', value: 'hsn_code'},
          { text: 'Available Quantity', value: 'available_qty' },
          // { text: 'Price/Unit', value: 'price_per_unit' },        
          // { text: 'TaxableAmount', value: 'taxable_amount' },   
          // { text: 'CGST', value: 'csgt' },  
          // { text: 'SGST', value: 'sgst' },  
          { text: 'Stock Updated Date', value: 'stock_updated_date' }, 
         ],
        }
    },
  
    mounted(){
   
 
       this.getstocksdetails();
           setTimeout(() => {
              this.loading = false; // Set loading to false when the operation is complete
            }, 4000);
    },
    methods:{
    //   inputstock(itm){
    //     console.log('check the detials',itm.po_id);
    //      this.$router.push({
    //       name: 'Createwarehouseinput', // Replace with the actual name of your route
    //       query: { po_id: itm.po_id }
    //     });
        
    //   },
      getstocksdetails(){
        this.getAllstocks().then((response) =>{
          console.log('check the view stocks',response.data);
          this.Allstocks = response.data;
          console.log('check the view purchase History',this.Allstocks);

        })
      },
      resolveStatusVariant (status){
      if (status == 'Acknowledged')
        return {
          color: 'warning',
          // text: 'Acknowledged',
        }
     
      
        
      else
        return {
          color: 'info',
          // text: 'Shared',
        }
      },
    }
}
</script>

<style scoped>

</style>>

