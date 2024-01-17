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
               <VTextField
                
                  label="Purchase Order"
               
                />
                <!-- <VSelect
                 
                  label="Brand or Manufacturer"
                  :items="['TATA','Britania','Reliance','Arnapurna','Pepsico']"
                /> -->
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

     <VDivider />
    <V-btn
     icon
     variant="text"
     color="default"
     class="mb-4 mt-4"
     size="small"
     style="margin-left: auto; display: block;"
     @click="openproductdialog()"
    >
      <!-- class="mb-4 mt-4" -->
        <VIcon
          icon="mdi-plus-box"
          size="30"        
          color="#9155FD"       
          />   
        </V-btn>         

<!-- <v-container fluid> -->
    <!-- item-key="fullName"
        class="table-rounded"
        hide-default-footer
        disable-sort -->
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
        v-for="item in desserts"
        :key="item.dessert"
      >
       <td  class="text-center">
            <!-- <v-btn @click="deleteRow(item)" icon> -->
              <!-- <v-icon small> - </v-icon> -->
             
            <!-- </v-btn> -->
              <VBtn
                icon
                variant="text"
                color="default"
                class="me-2"
                size="small"
                @click="deleteRow(item)"
            >
                <VIcon
                icon="mdi-minus-circle-outline"
                size="24"
                />
            </VBtn>
          </td>
        <td class="text-center">{{ item.dessert }}</td>
        <td class="text-center">
          {{ item.calories }}
        </td>
        <td class="text-center">
          {{ item.fat }}
        </td>
        <td class="text-center">
          {{ item.carbs }}
        </td>
        <td class="text-center">
          {{ item.protein }}
        </td>
      </tr>
      </tbody>        
        </VTable>

 <VDialog v-model="dialog" max-width="600">
      <VCard title="Dialog Title">
        <VCardText>
          <!-- Dialog content -->
          <p>Dialog content goes here.</p>
          <!-- Include your existing code inside the dialog -->
          <VForm class="mt-6 ">
            <VRow>
    
              <VCol
                md="6"
                cols="12"
              >
                <VSelect
                 
                  label="Brand or Manufacturer"
                  :items="['TATA','Britania','Reliance','Arnapurna','Pepsico']"
                />
              </VCol>


            
              <VCol
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
                  @click="closeDialog"
                >
                  Close
                </VBtn>
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
        <VCardActions>
          <!-- <VBtn @click="saveAndClose">Save</VBtn> -->
          <!-- <VBtn @click="resetAndClose" color="secondary" variant="tonal">Reset</VBtn> -->
          <!-- <VBtn @click="closeDialog">Close</VBtn> -->
        </VCardActions>
      </VCard>
    </VDialog>
    </div>
</template>
<script>
export default {
   data(){
    return{
        dialog: false,
         desserts: [
         {
    dessert: 'Frozen Yogurt',
    calories: 159,
    fat: 6,
    carbs: 24,
    protein: 4,
  },
  {
    dessert: 'Ice cream sandwich',
    calories: 237,
    fat: 6,
    carbs: 24,
    protein: 4,
  },
  {
    dessert: 'Eclair',
    calories: 262,
    fat: 6,
    carbs: 24,
    protein: 4,
  },
  {
    dessert: 'Cupcake',
    calories: 305,
    fat: 6,
    carbs: 24,
    protein: 4,
  },
  {
    dessert: 'Gingerbread',
    calories: 356,
    fat: 6,
    carbs: 24,
    protein: 4,
  },
      ],
      headers: [
        { text: 'Action', value: 'actions', sortable: false },
        { text: 'Dessert', value: 'dessert' },
        { text: 'Calories', value: 'calories' },
        { text: 'Fat (g)', value: 'fat' },
        { text: 'Carbs (g)', value: 'carbs' },
        { text: 'Protein (g)', value: 'protein' },
      ],
    }
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