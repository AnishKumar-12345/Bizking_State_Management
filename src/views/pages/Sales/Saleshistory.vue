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
   <VTable 
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
            loaded: false,
       loading: false,
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
    },
    methods:{
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
          color: 'success',
          // text: 'Acknowledged',
        }
     
      
        
      else
        return {
          color: 'info',
          // text: 'Shared',
        }
      },
      getSalesorderdetails(){
        this.getSalesorders().then((response)=>{
          this.saleshistory = response.data;
          console.log('check rhe res',this.saleshistory);

        })
      },
       onClick () {
        this.loading = true

        setTimeout(() => {
          this.loading = false
          this.loaded = true
        }, 2000)
      },

      resolveStatusVariant (status){
      if (status == 'Acknowledged')
        return {
          color: 'warning',
          text: 'Acknowledged',
        }
     
      
        
      else
        return {
          color: 'info',
          text: 'Shared',
        }
      },
    }
}
</script>

<style scoped>

</style>>

