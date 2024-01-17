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
        v-for="item in data"
        :key="item.po"
      >
       
        <td class="text-center">{{ item.po }}</td>
        <td class="text-center">
          {{ item.ODate }}
        </td>
        <td class="text-center">
          {{ item.status }}
        </td>
        <td class="text-center">
          {{ item.OT }}
        </td>
        <td class="text-center">
          {{ item.ST }}
        </td>
         <td class="text-center">
          {{ item.total }}
        </td>
        <td  class="text-center">
            <!-- <v-btn @click="deleteRow(item)" icon> -->
              <!-- <v-icon small> - </v-icon> -->
             
            <!-- </v-btn> -->
            <VBtn               
                icon
                variant="text"
                color="default"
                class="me-2"
                size="x-small"
                @click="editrow(item)"
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
            </VBtn>
              <!-- <VBtn
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
            </VBtn> -->
          </td>
      </tr>
      </tbody>
        <!-- <thead>
      <tr>
        <th class="text-uppercase">
          Dessert (100g serving)
        </th>
        <th class="text-center text-uppercase">
          Calories
        </th>
        <th class="text-center text-uppercase">
          Fat (g)
        </th>
        <th class="text-center text-uppercase">
          Carbs (g)
        </th>
        <th class="text-center text-uppercase">
          Protein (g)
        </th>
      </tr>
    </thead> -->
    <!-- <tbody>
      <tr
        v-for="item in desserts"
        :key="item.dessert"
      >
        <td>{{ item.dessert }}</td>
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
    </tbody> -->
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
          data: [
            {
                po: 'PO001',
                ODate: '2024.01.12',
                status: 'Draft',
                OT: 24,
                ST: 4,
                total: 5,

            },
            {
                po: 'PO002',
                ODate: '2024.01.12',
                status: 'Created',
                OT: 24,
                ST: 4,
                total: 5,

            },
            {
                po: 'PO003',
                ODate: '2024.01.12',
                status: 'Created',
                OT: 24,
                ST: 4,
                total: 5,

            },
            {
                po: 'PO004',
                ODate: '2024.01.12',
                status: 'Draft',
                OT: 24,
                ST: 4,
                total: 5,

            },
            {
                po: 'PO005',
                ODate: '2024.01.12',
                status: 'Shared',
                OT: 24,
                ST: 4,
                total: 5,

            },
              {
                po: 'PO006',
                ODate: '2024.01.12',
                status: 'Acknowledged',
                OT: 24,
                ST: 4,
                total: 5,

            },
              {
                po: 'PO007',
                ODate: '2024.01.12',
                status: 'Acknowledged',
                OT: 24,
                ST: 4,
                total: 5,

            },
              {
                po: 'PO008',
                ODate: '2024.01.12',
                status: 'Acknowledged',
                OT: 24,
                ST: 4,
                total: 5,
            },
    ],
      headers: [
        { text: 'Purchase Order', value: 'po' },
        { text: 'Order Date', value: 'ODate' },
        { text: 'Status', value: 'status' },
        { text: 'Order To', value: 'OT' },
        { text: 'Shipped To', value: 'ST' },
        { text: 'Total', value: 'total' },
        { text: 'Action', value: 'actions', sortable: false },        

      ],
    }
   },
   methods:{
     deleteRow(item) {
      // Implement your logic to delete the row
      const index = this.data.indexOf(item);
      if (index !== -1) {
        this.data.splice(index, 1);
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