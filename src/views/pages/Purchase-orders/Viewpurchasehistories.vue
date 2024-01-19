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
        v-for="item in desserts"
        :key="item.dessert"
      >       
        <td class="text-center">{{ item.dessert }}</td>
        <td class="text-center">
          {{ item.calories }}
        </td>
        <td class="text-center">
           <VChip
        :color="resolveStatusVariant(item.fat).color"
        class="font-weight-medium"
        size="small"
      >
        {{ resolveStatusVariant(item.fat).text }}
          <!-- {{ item.fat }} -->
            </VChip>
        </td>
        <td class="text-center">
          {{ item.carbs }}
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
export default {
    data(){
        return{
     desserts: [
            {
                dessert: 'Frozen Yogurt',
                calories: '19-01-2024',
                fat: 'Acknowledged',
                carbs: 24,
                protein: 4,
                actions: 'Receive Stock'

            },
            {
                dessert: 'Ice cream sandwich',
                calories: '19-01-2024',
                fat: 'Shared',
                carbs: 24,
                protein: 4,
                actions: 'Receive Stock'

            },
            {
                dessert: 'Eclair',
                calories: '19-01-2024',
                fat: 'Acknowledged',
                carbs: 24,
                protein: 4,
                actions: 'Receive Stock'

            },
            {
                dessert: 'Cupcake',
                calories: '19-01-2024',
                fat: 'Acknowledged',
                carbs: 24,
                protein: 4,
                actions: 'Receive Stock'

            },
            {
                dessert: 'Gingerbread',
                calories: '19-01-2024',
                fat: 'Shared',
                carbs: 24,
                protein: 4,
                actions: 'Receive Stock'

            },
              {
                dessert: 'Gingerbread',
                calories: '19-01-2024',
                fat: 'Shared',
                carbs: 24,
                protein: 4,
                actions: 'Receive Stock'

            },
              {
                dessert: 'Gingerbread',
                calories: '19-01-2024',
                fat: 'Shared',
                carbs: 24,
                protein: 4,
                actions: 'Receive Stock'

            },
              {
                dessert: 'Gingerbread',
                calories: '19-01-2024',
                fat: 'Acknowledged',
                carbs: 24,
                protein: 4,
                actions: 'Receive Stock'
            },
    ],
      headers: [
        
        { text: 'Purchase Order', value: 'dessert' },
        { text: 'Order Date', value: 'calories' },
        { text: 'Status', value: 'fat' },
        { text: 'Order To', value: 'carbs' },
        { text: 'Shipped To', value: 'protein' },
        { text: 'Action', value: 'actions', sortable: false },
      ],
        }
    },
    methods:{
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

