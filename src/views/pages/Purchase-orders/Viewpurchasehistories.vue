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

      <VRow v-if="this.filteredPurchaseHistory == null">
      <VCol cols="12"> 
        <VCard title="Purchase Order View">
          <VCardText> 
            <!-- 👉 Checkbox and Button  -->
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
     </VRow>

     <VTable v-if="this.filteredPurchaseHistory != null"
       :headers="headers"
       :items="filteredPurchaseHistory"
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
        v-for="(item,index) in filteredPurchaseHistory"
        :key="index"

         
      >       
        <td class="text-center">{{ item.po_number }}</td>
        <td class="text-center">
          {{ item.created_date }}
        </td>
        <td class="text-center">
           <VChip
        :color="resolveStatusVariant(item.po_status).color"
        class="font-weight-medium"
        size="small"
      >
        {{ item.po_status }}
          <!-- {{ item.fat }} -->
            </VChip>
        </td>
        <td class="text-center">
          {{ item.brand_name }}
        </td>
        <td class="text-center">
          {{ item.brand_name }}
        </td>
        <td  class="text-center " v-if="item.po_status != 'Received'">
          <!-- {{item.actions}} -->
            <VBtn
                icon
                variant="text"
                color="success"
                class="me-2"
                size="small"                
            >
            <!-- Receive Stock -->
              <VIcon
              icon="mdi-invoice-receive-outline"
              color="success"
              size="30"
              @click="inputstock(item)"
              />
            </VBtn>
              <!-- <VBtn
                icon
                variant="text"
                color="default"
                class="me-2"
                size="x-small"
                @click="deleteRow(item)"
            >
                <VIcon
                icon="ri-pencil-line"
                size="22"
                />
            </VBtn>
            <VBtn
                icon
                variant="text"
                color="default"
                class="me-2"
                size="x-small"
                @click="deleteRow(item)"
            >
                <VIcon
                icon="ri-delete-bin-line"
                size="22"
                />
            </VBtn> -->
          </td>
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
          userRoles:'',
          loading:true,
    purchaseHistory:[],
    userIds:'',
    createdBy:'',
      headers: [
          { text: 'PO Number', value: 'po_number' },
          { text: 'Order Date', value: 'created_date' },
          { text: 'Status', value: 'po_status' },
          { text: 'Order To', value: 'brand_name'},
          { text: 'Shipped To', value: 'brand_name' },
          // { text: 'Price/Unit', value: 'price_per_unit' },        
          // { text: 'TaxableAmount', value: 'taxable_amount' },   
          // { text: 'CGST', value: 'csgt' },  
          // { text: 'SGST', value: 'sgst' },  
          { text: 'Action', value: 'actions' }, 
         ],
        }
    },
     computed: {
    filteredPurchaseHistory() {
      // Filter purchaseHistory based on the condition
      return this.purchaseHistory.filter(item => item.po_status === 'Acknowledged' || item.po_status === 'Shared' || item.po_status === 'Received');
    }
  },
    mounted(){
   
       this.createdBy = localStorage.getItem('createdby');
       this.userIds = localStorage.getItem('userId');
       this.userRoles = localStorage.getItem('userRole')
       this.getPurchasehistorydetails();
           setTimeout(() => {
              this.loading = false; // Set loading to false when the operation is complete
            }, 4000);
    },
    methods:{
      inputstock(itm){
        console.log('check the detials',itm.po_id);
         this.$router.push({
          name: 'Createwarehouseinput', // Replace with the actual name of your route
          query: { po_id: itm.po_id }
        });
        // this.navigateTo('/Createwarehouseinput', 42);
        
      },
      getPurchasehistorydetails(){
        this.getPurchaseorder(this.userIds,this.userRoles).then((response) =>{
          console.log('check the view purchase order',response.data);
          this.purchaseHistory = response.data;
          console.log('check the view purchase History',this.purchaseHistory);

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

