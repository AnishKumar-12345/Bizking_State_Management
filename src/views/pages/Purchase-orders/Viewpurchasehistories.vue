<template>
  <div>
<VTable
       :headers="headers"
       :items="purchaseHistory"
        item-key="dessert"
      class="table-rounded"      
       height="400"
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
        v-for="(item,index) in purchaseHistory"
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
          {{ item.protein }}
        </td>
        <td  class="text-center ">
          {{item.actions}}
            <!-- <VBtn
                icon
                variant="text"
                color="default"
                class="me-2"
                size="x-small"
            >
              <VIcon
              icon="bitcoin-icons:receive-filled"
              color="success"
              size="30"
              />
            </VBtn> -->
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
    mounted(){
   
       this.createdBy = localStorage.getItem('createdby');
        this.userIds = localStorage.getItem('userId');
           this.getPurchasehistorydetails();
    },
    methods:{
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

