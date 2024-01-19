<template>
    <div>
         <VRow>
      <VCol cols="12">
       <VCard title="Output Stock" class="mb-4">       

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
                  label="Sales Order"
                  :items="['SO1', 'SO2', 'SO3','SO4','SO5']"
                />
               
              </VCol>


            
              <VCol
                cols="12"
                md="6"
              >
                <VTextField
                
                  label="Order From"
               
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
                 
                  label="SO Status"
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
        :key="item.id"
      >
       <td  class="text-center">
           {{item.id}}
          </td>
        <td class="text-center">{{ item.EQuantity }}</td>
        <td class="text-center">
          {{ item.OQuantity }}
        </td>
        <td class="text-center">
          <VChip
        :color="resolveStatusVariant(item).color"
        class="font-weight-medium"
        size="small"
      >
        {{ item.available }}
      </VChip>
          <!-- {{ item.available }} -->
        </td>
        <td class="text-center">
          <VTextField v-model="item.shipped" outlined dense />

          <!-- {{ item.carbs }} -->
        </td>
        <!-- <td class="text-center">
          <VTextField v-model="item.protein" outlined dense />

        
        </td> -->
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

 
    </div>
</template>
<script>
export default {
   data(){
    return{
      selectedPurchaseOrder: null,
        dialog: false,
     desserts: [
         {
          id:1,
        oid:"SO1",

        // dessert: 'Frozen Yogurt',
        EQuantity: 159,
        OQuantity: 6,
        available: 24,
        shipped: 22,
        // purchaseOrder: 'SO1'
      },
      {
        id:2,
        oid:"SO2",

        // dessert: 'Ice cream sandwich',
        EQuantity: 237,
        OQuantity: 6,
        available: 24,
        shipped: 20,
        // purchaseOrder: 'SO2'
      },
      {
        id:3,
        oid:"SO3",

        // dessert: 'Eclair',
        EQuantity: 262,
        OQuantity: 6,
        available: 3,
        shipped: 2,
        // purchaseOrder: 'SO3'
      },
      {
        id:4,
        oid:"SO4",
        // dessert: 'Cupcake',
        EQuantity: 305,
        OQuantity: 6,
        available: 15,
        shipped: 7,
        // purchaseOrder: 'SO4'
      },
      {
        id:5,
        oid:"SO5",

        // dessert: 'Gingerbread',
        EQuantity: 356,
        OQuantity: 6,
        available: 17,
        shipped: 10,
        // purchaseOrder: 'SO5'
      },
      ],
      headers: [
        { text: 'Product ID', value: 'id'},
        { text: 'Exchange Quantity', value: 'EQuantity' },
        { text: 'Ordered Quantity', value: 'OQuantity' },
        { text: 'Available', value: 'available' },
        { text: 'Shipped', value: 'shipped' },
        // { text: 'Remarks', value: 'protein' },
      ],
    }
   },
   computed: {
  filteredDesserts() {
    if (!this.selectedPurchaseOrder) {
      // return this.desserts; 
    }

    return this.desserts.filter(item => item.oid === this.selectedPurchaseOrder);
  },
},
   methods:{
     resolveStatusVariant (itm){
      if (itm.available < itm.OQuantity)
        return {
          color: 'error',
          // text: 'Created',
        }   
      
      
      else
        return {
          color: 'success',
          // text: 'Shared',
        }
      },
     deleteRow(item) {
      // Implement your logic to delete the row
      const index = this.desserts.indexOf(item);
      if (index !== -1) {
        this.desserts.splice(index, 1);
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