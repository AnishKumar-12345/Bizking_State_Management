<template>
  <div>
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
        v-for="item in data"
        :key="item.po"
      >       
        <td class="text-center">{{ item.po }}</td>
        <td class="text-center">
          {{ item.ODate }}
        </td>
        <td class="text-center">
          <VChip
        :color="resolveStatusVariant(item.status).color"
        class="font-weight-medium"
        size="small"
      >
        {{ resolveStatusVariant(item.status).text }}
      </VChip>
          <!-- {{ item.status }} -->
        </td>
        <td class="text-center">
          {{ item.OT }}
        </td>
        <td class="text-center">
          {{ item.ST }}
        </td>
        <td class="text-center">{{item.total}}</td>
        <td  class="text-center ">
            
              <VBtn
                v-if='item.status!="Acknowledged" && item.status!="Shared"'
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
            <!-- <VBtn
            v-if='item.status!="Acknowledged" && item.status!="Shared"'
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
            <VBtn
            v-if='item.status=="Acknowledged" || item.status=="Shared"'
                icon
                variant="text"
                color="default"
                class="me-2"
                size="x-small"
                @click="viewrow(item)"
            >
                <VIcon
                icon="basil:eye-outline"
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
       resolveStatusVariant (status){
      if (status == 'Created')
        return {
          color: 'primary',
          text: 'Created',
        }
      else if (status == 'Draft')
        return {
          color: 'success',
          text: 'Draft',
        }
      // else if (status === 3)
      //   return {
      //     color: 'error',
      //     text: 'Rejected',
      //   }
      else if (status == 'Acknowledged')
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
      editrow(item){

      }
    }
}
</script>

<style scoped>

</style>>

