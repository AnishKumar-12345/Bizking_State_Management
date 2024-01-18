<template>
    <div>
         <VRow>
      <VCol cols="12">
       <VCard title="Input Stock" class="mb-4">       

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
                  label="Purchase Order"
                  :items="['PO1', 'PO2', 'PO3','PO4','PO5']"
                />
               
              </VCol>


            
              <VCol
                cols="12"
                md="6"
              >
                <VTextField
                
                  label="Order To"
               
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
        <td class="text-center">{{ item.dessert }}</td>
        <td class="text-center">
          {{ item.calories }}
        </td>
        <td class="text-center">
          <VTextField v-model="item.fat" outlined dense />
          <!-- {{ item.fat }} -->
        </td>
        <td class="text-center">
          <VTextField v-model="item.carbs" outlined dense />

          <!-- {{ item.carbs }} -->
        </td>
        <td class="text-center">
          <VTextField v-model="item.protein" outlined dense />

          <!-- {{ item.protein }} -->
        </td>
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
        dessert: 'Frozen Yogurt',
        calories: 159,
        fat: 6,
        carbs: 24,
        protein: 4,
        purchaseOrder: 'PO1'
      },
      {
        id:2,
        dessert: 'Ice cream sandwich',
        calories: 237,
        fat: 6,
        carbs: 24,
        protein: 4,
        purchaseOrder: 'PO2'
      },
      {
        id:3,
        dessert: 'Eclair',
        calories: 262,
        fat: 6,
        carbs: 24,
        protein: 4,
        purchaseOrder: 'PO3'
      },
      {
        id:4,
        dessert: 'Cupcake',
        calories: 305,
        fat: 6,
        carbs: 24,
        protein: 4,
        purchaseOrder: 'PO4'
      },
      {
        id:5,
        dessert: 'Gingerbread',
        calories: 356,
        fat: 6,
        carbs: 24,
        protein: 4,
        purchaseOrder: 'PO5'
      },
      ],
      headers: [
        { text: 'Product ID', value: 'id'},
        { text: 'Product Name', value: 'dessert' },
        { text: 'Ordered Quantity', value: 'calories' },
        { text: 'Received Quantity', value: 'fat' },
        { text: 'RTM', value: 'carbs' },
        { text: 'Remarks', value: 'protein' },
      ],
    }
   },
   computed: {
  filteredDesserts() {
    if (!this.selectedPurchaseOrder) {
      // return this.desserts; 
    }

    return this.desserts.filter(item => item.purchaseOrder === this.selectedPurchaseOrder);
  },
},
   methods:{
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