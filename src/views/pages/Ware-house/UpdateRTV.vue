<template>
  <div>
    
   

     <VTable
       :headers="headers"
      
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
          
      headers: [
          { text: 'Brand Name', value: 'po_number' },
          { text: 'Merchant Name', value: 'created_date' },
          { text: 'SO No.', value: 'po_status' },
          // { text: 'Order To', value: 'brand_name'},
          // { text: 'Shipped To', value: 'brand_name' },          
          { text: 'Action', value: 'actions' }, 
         ],
        }
    },
     computed: {
   
  },
    mounted(){
   
    
    },
    methods:{
     
      
    }
}
</script>

<style scoped>

</style>>

