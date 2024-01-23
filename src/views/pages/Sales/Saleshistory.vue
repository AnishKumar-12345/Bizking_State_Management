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
    <div style="max-width:400px">
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
    </div>
<VTable
       :headers="headers"
       :items="desserts"
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
        v-for="item in desserts"
        :key="item.dessert"
      >     
        <td class="text-center">{{ item.salesorder }}</td>

        <td class="text-center">{{ item.orderdate }}</td>
        <td class="text-center">
          {{ item.status }}
        </td>
        <td class="text-center">
           <!-- <VChip
        :color="resolveStatusVariant(item.fat).color"
        class="font-weight-medium"
        size="small"
      > -->
        <!-- {{ resolveStatusVariant(item.fat).text }} -->
          {{ item.orderfrom }}
            <!-- </VChip> -->
        </td>
        <td class="text-center">
          {{ item.shippedto }}
        </td>
        <td class="text-center">
            &#8377;{{ item.ordervalue }}
        </td>
        <td  class="text-center" style="display: flex;align-items: center;">
          
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
             <VBtn
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
            </VBtn> 
          </td>
      </tr>
      </tbody>        
        </VTable>
  </div>
</template>

<script>
export default {
    data(){
        return{
            loaded: false,
      loading: false,
       desserts: [
            {
                salesorder: 'SO1',
                orderdate: '19-01-2024',
                status: 'Acknowledged',
                orderfrom: 'A One mart',
                shippedto: 'Ams Mini Mart',
                ordervalue: '10000'

            },
            {
                salesorder: 'SO2',
                orderdate: '19-01-2024',
                status: 'Acknowledged',
              orderfrom: 'A One mart',
                shippedto: 'Aishwary Super Market-Hsr',
                ordervalue: '20000'

            },
            {
                salesorder: 'SO3',
                orderdate: '19-01-2024',
                status: 'Acknowledged',
               orderfrom: 'A To Z Mini Mart',
                shippedto: 'Aishwarya Hyper Mart',
                ordervalue: '11000'

            },
            {
               salesorder: 'SO4',
                orderdate: '19-01-2024',
                status: 'Acknowledged',
                orderfrom: 'A.M. Enterpirses-Bellandur',
                shippedto: 'ALV Fresh Super Market',
                ordervalue: '320000'

            },
            {
               salesorder: 'SO5',
                orderdate: '19-01-2024',
                status: 'Acknowledged',
               orderfrom: 'A2Z Shopping Mall',
                shippedto: 'Annapureneshwari Enteprises',
                ordervalue: '200000'

            },
              {
                salesorder: 'SO6',
                orderdate: '19-01-2024',
                status: 'Acknowledged',
             orderfrom: 'Adak Enterprises',
                shippedto: 'Bangalore Horticultural Fruit And Vegetables Sales Centre',
                ordervalue: '1000000'

            },
              {
              salesorder: 'SO7',
                orderdate: '19-01-2024',
                status: 'Acknowledged',
                orderfrom: 'Adak Enterprises',
                shippedto: 'Bangalore Home Needs Departmental Stores',
                ordervalue: '10000'

            },
              {
                salesorder: 'SO8',
                orderdate: '19-01-2024',
                status: 'Acknowledged',
                orderfrom: 'A2Z Shopping Mall',
                shippedto: 'Aishwary Super Market-Hsr',
                ordervalue: '210000'
            },
    ],
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
    methods:{
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

