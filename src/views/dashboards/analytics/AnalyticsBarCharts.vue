<script setup>
//Anish changes the code 
import { useTheme } from 'vuetify'
import triangleDark from '@/assets/images/misc/triangle-dark.png'
import triangleLight from '@/assets/images/misc/triangle-light.png'
import trophy from '@/assets/images/misc/trophy.png'
 
const vuetifyTheme = useTheme()
const triangleBg = computed(() => {
  return vuetifyTheme.global.name.value === 'light' ? triangleLight : triangleDark
})

// predefined codes
// import VueApexCharts from 'vue3-apexcharts'
// import { useTheme } from 'vuetify'

// const vuetifyTheme = useTheme()
// const currentTheme = computed(() => {
//   return vuetifyTheme.current.value.colors 
// })
// const series = [{
//   name: '2020',
//   data: [
//     45,
//     85,
//     65,
//     50,
//     70,
//   ],
// }]
// const chartOptions = computed(() => {
//   const backgroundColor = currentTheme.value.background
  
//   return {
//     chart: {
//       type: 'bar',
//       stacked: false,
//       parentHeightOffset: 0,
//       toolbar: { show: false },
//     },
//     grid: {
//       show: false,
//       padding: {
//         top: -10,
//         left: -7,
//         right: 0,
//         bottom: 5,
//       },
//     },
//     colors: [
//       currentTheme.value.error,
//       currentTheme.value.primary,
//       currentTheme.value.error,
//       currentTheme.value.primary,
//       currentTheme.value.primary,
//     ],
//     plotOptions: {
//       bar: {
//         horizontal: false,
//         columnWidth: '20%',
//         borderRadius: 4,
//         startingShape: 'rounded',
//         endingShape: 'rounded',
//         distributed: true,
//         colors: {
//           backgroundBarColors: [
//             backgroundColor,
//             backgroundColor,
//             backgroundColor,
//             backgroundColor,
//             backgroundColor,
//           ],
//           backgroundBarRadius: 5,
//         },
//       },
//     },
//     legend: { show: false },
//     dataLabels: { enabled: false },
//     xaxis: {
//       labels: { show: false },
//       axisBorder: { show: false },
//       axisTicks: { show: false },
//     },
//     yaxis: { show: false },
//     tooltip: { enabled: false },
//   }
// })
</script>

<template>
<!-- Anish defined template -->
 <VCard
    title="Active Appointments! 🎉"
    
    class="position-relative"
  >
    <VCardText>
      <h1 class="text-2xl font-weight-medium text-primary">
        2
      </h1>
      <p>78% of target 🚀</p>
      <VBtn size="small">
        View Appointments
      </VBtn>
    </VCardText>

    <!-- Triangle Background -->
    <VImg
      :src="triangleBg"
      class="triangle-bg flip-in-rtl"
    />

    <!-- Trophy -->
    <VImg
      :src="trophy"
      class="trophy"
    />
  </VCard>


<!-- predefined template -->
  <!-- <VCard>
    <VCardText>
      <h6 class="text-h6">
        2,856
      </h6>

      <VueApexCharts
        :options="chartOptions"
        :series="series"
        :height="95"
      />

      <p class="text-center font-weight-semibold mb-0">
        Sessions
      </p>
    </VCardText>
  </VCard> -->
</template>

<style lang="scss">
// Anish defined style
.triangle-bg {
  position: absolute;
  inline-size: 10.375rem;
  inset-block-end: 0;
  inset-inline-end: 0;
}

.trophy {
  position: absolute;
  inline-size: 4.9375rem;
  inset-block-end: 2rem;
  inset-inline-end: 2rem;
}
</style>

