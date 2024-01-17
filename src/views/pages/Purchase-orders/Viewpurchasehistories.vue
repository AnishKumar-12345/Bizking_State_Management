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
          {{ item.fat }}
        </td>
        <td class="text-center">
          {{ item.carbs }}
        </td>
        <td class="text-center">
          {{ item.protein }}
        </td>
        <td  class="text-center ">
            
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
              {
                dessert: 'Gingerbread',
                calories: 356,
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
              {
                dessert: 'Gingerbread',
                calories: 356,
                fat: 6,
                carbs: 24,
                protein: 4,
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
    }
}
</script>

<style scoped>

</style>>

