<template>
  <div>
    <!-- <div class="search-container">
      <label for="search">Search:</label>
      <input
        type="text"
        id="search"
        v-model="searchQuery"
        @input="filterDesserts"
        placeholder="Enter search query"
      />
    </div> -->
    <!-- <div style="max-width:400px">
      <VTextField
      class="mb-3"
        v-model="searchQuery"  
        :loading="loading"
        density="compact"
        variant="solo"
        label="Search templates"
        append-inner-icon="mdi-magnify"
        single-line
        hide-details
        @click:append-inner="onClick" 
    />
    </div> -->
     <div v-if="loading"  class="loading-container">
      <VProgressLinear
            height="5"
            color="primary"
            indeterminate
            class="custom-loader"  
            full-width              
        />          
     </div>
       <div v-if="loading2"  class="loading-container">
      <VProgressLinear
            height="5"
            color="primary"
            indeterminate
            class="custom-loader"  
            full-width              
        />          
     </div>
       <VRow v-if="this.saleshistory == null">
      <VCol cols="12"> 
        <VCard title="Sales Order View">
          <VCardText> 
            <!-- 👉 Checkbox and Button  -->
            <VAlert
              color="warning"
              variant="tonal"
              class="mb-4"              
              border="top"
            >
              <VAlertTitle class="mb-1"> Are you sure you gave Sales Orders? </VAlertTitle>
              <p class="mb-0">
                The system is not retrieving the Sales Orders. Please ensure that you have applied for Sales Orders !</p>
            </VAlert>
          </VCardText>
        </VCard>
      </VCol>
     </VRow>
   <VTable 
       v-if="this.saleshistory != null"
       :headers="headers" 
       :items="saleshistory"
       
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
        v-for="(item,index) in saleshistory"
        :key="index"

         
      >       
        <td class="text-center">{{ item.so_number }}</td>
        <td class="text-center">
          {{ item.created_date }}
        </td>
        <td class="text-center">
           <VChip
        :color="resolveStatusVariant(item.so_status).color"
        class="font-weight-medium"
        size="small"
      >
        {{ item.so_status }}
          <!-- {{ item.fat }} -->
            </VChip>
        </td>
        <td class="text-center">
          {{ item.merchant_name }}
        </td>
        <td class="text-center">
          {{ item.merchant_name }}
        </td>
           <td class="text-center">
          {{ item.total_so_amount }}
        </td>
        <td  class="text-center ">
          <!-- {{item.actions}} -->
            <VBtn
            v-if="item.so_status != 'Shipped' && item.so_status != 'Delivered'"
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
              @click="outputstock(item)"
              />
            </VBtn>

             <VBtn

             v-if="item.so_status == 'Shipped' || item.so_status == 'Delivered'"
              icon
              variant="text"
              color="default"
              class="me-2"
              size="x-small"
              @click="getPDFupdate(item.delivery_challan_file)"
            >
              <VIcon
                color="error"
                icon="iwwa:file-pdf"
                size="26"
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
import servicescall from '@/Services'

export default {
  mixins: [servicescall],

    data(){
        return{
          loading2: false,
            loaded: false,
       loading: true,
     saleshistory:[],
      headers: [
        
        { text: 'Sales Order', value: 'salesorder' },
        { text: 'Order Date', value: 'orderdate' },
        { text: 'Status', value: 'status' },
        { text: 'Order From', value: 'orderfrom' },
        { text: 'Shipped To', value: 'shippedto' },
        { text: 'Order Value', value: 'ordervalue' },
        { text: 'Action', value: 'actions', sortable: false },
      ],
        }
    },
    mounted(){
      this.getSalesorderdetails();
        setTimeout(() => {
      this.loading = false; // Set loading to false when the operation is complete
    }, 2500);
    },
    methods:{
          getPDFupdate(id){
      this.loading2 = true;
       window.open(id, '_blank');
        this.loading2 = false;
      // this.getPurchasePDF(id).then((response)=>{
      //   console.log(response)
      //   const pdfUrl = response.data.po_file;
      //   this.loading2 = false;
        
      // })
    },
      outputstock(item){
          console.log('check the detials',item.so_id);
         this.$router.push({
          name: 'Createwarehouseoutput', // Replace with the actual name of your route
          query: { so_id: item.so_id }
        });
      },
         resolveStatusVariant (status){
      if (status == 'Acknowledged')
        return {
          color: 'warning',
          // text: 'Acknowledged',
        }
     
      
        
      else
        return {
          color: 'success',
          // text: 'Shared',
        }
      },
      getSalesorderdetails(){
        this.getSalesorders().then((response)=>{
          this.saleshistory = response.data;
          console.log('check rhe res',this.saleshistory);

        })
      },
      //  onClick () {
      //   this.loading = true

      //   setTimeout(() => {
      //     this.loading = false
      //     this.loaded = true
      //   }, 2000)
      // },

      // resolveStatusVariant (status){
      // if (status == 'Acknowledged')
      //   return {
      //     color: 'warning',
      //     text: 'Acknowledged',
      //   }
     
      
        
      // else
      //   return {
      //     color: 'info',
      //     text: 'Shared',
      //   }
      // },
    }
}
</script>

<style scoped>

</style>>

