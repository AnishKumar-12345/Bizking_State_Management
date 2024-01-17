<script>
// import upgradeBannerDark from '@/assets/images/pro/upgrade-banner-dark.png'
// import upgradeBannerLight from '@/assets/images/pro/upgrade-banner-light.png'
// import logo from '@/assets/images/logos/aws.png'
import { VerticalNavLink, VerticalNavSectionTitle } from '@layouts'
import { useTheme } from 'vuetify'
import Index from '@/pages/index.vue'
// import { PerfectScrollbar } from 'vue3-perfect-scrollbar'

export default{
  name: "DrawerContent",
 components:{
 Index,

 },
 
  data(){
    return{
       miniVariant: false,
       parentItems: [
        {
          id: 1,
          title: 'Dashboard',
          route: '/',
          expanded: false,
          icon: "ri-home-smile-line"
        },
        {
          id: 2,
          title: 'Purchase Management ',
          icon: "mdi-account-cog-outline",
          children: [
            { id: 21, title: 'Create Purchase Order', route: '/Createpurchaseorder' },
            { id: 22, title: 'View Purchase Order', route: '/Viewpurchaseorder' },
            { id: 23, title: 'View Purchase History', route: '/Viewpurchasehistory' },

          ],
          expanded: false,
        },
        //  {
        //   id: 3,
        //   title: 'Sales Management ',
        //   icon: "mdi-account-group-outline",
        //   children: [
        //     { id: 23, title: 'View Oppertunity', route: '/account-settings' },
        //     { id: 24, title: 'Update Oppertunity', route: '/tables' },
        //      { id: 25, title: 'Generate Quote', route: '/tables' },
        //       { id: 26, title: 'Close Oppertunity', route: '/tables' },          

        //   ],
        //   expanded: false,
        // },
        {
          id: 4,
          title: 'Warehouse Management',
          icon: "mdi-account-wrench-outline",
          children: [
            { id: 27, title: 'Input Stock', route: '/Createwarehouseinput' },
            { id: 28, title: 'Output Stock', route: '/tables' },
             { id: 29, title: 'Generate D.C', route: '/tables' },                    
              { id: 30, title: 'Update RTV', route: '/tables' },  
          ],
          expanded: false,
        },
        {
          id: 5,
          title: 'Store Inventory Management',
          icon: "mdi-book-open-outline",
          children: [
            { id: 31, title: 'View Store Level', route: '/account-settings' },
            { id: 32, title: 'Update Input Stock', route: '/tables' },
             { id: 33, title: 'Delete Product', route: '/tables' },                    

          ],
          expanded: false,
        },
        // {
        //   id: 6,
        //   title: 'Merchant',
        //   icon: "mdi-account-arrow-right-outline",
        //   children: [
        //     { id: 33, title: 'Onboard Merchant', route: '/account-settings' },
        //     { id: 34, title: 'Update Merchant ', route: '/tables' },
        //      { id: 35, title: 'Update Merchant ', route: '/tables' },                    

        //   ],
        //   expanded: false,
        // },
        //   {
        //   id: 7,
        //   title: 'Brand',
        //   icon: "mdi-alpha-b-circle-outline",
        //   children: [
        //     { id: 35, title: 'Onboard Manufacturer', route: '/account-settings' },
        //     { id: 36, title: 'Update Manufacturer ', route: '/tables' },                            

        //   ],
        //   expanded: false,
        // },
         
        // Add more parent items with or without children as needed
      ],
      selectedChild: null,
    }
  },
  mounted(){
    const vuetifyTheme = useTheme()
  },
   methods: {
    toggleChildren(parentItem) {
      parentItem.expanded = !parentItem.expanded;   
       this.parentItems.forEach(item => {
        if (item !== parentItem) {
          item.expanded = false;

        }
      });  
    },
    navigateTo(route) {
      this.$router.push(route);
      //  this.selectedChild = childItem.id;
    },
  },
}
</script>

<template>
  <!-- 👉 Nav header -->
  <div class="nav-header">
    <RouterLink
      to="/"
      class="app-logo d-flex align-center gap-x-3 app-title-wrapper"
    >
      <!-- ℹ️ You can also use img tag or VImg here -->
      <!-- <div v-html="logo" /> -->
      <img src="@/assets/images/logos/comlogo.jpeg" height="60" width="60" style="padding:5px;">

      <Transition name="vertical-nav-app-title">
        <h1 class="font-weight-semibold leading-normal text-xl text-uppercase">BIZKINGZ
         <!-- <span>WE LAUNCH YOUR SUCCESS</span> -->
        </h1>
      </Transition>
      <!-- <span>anish</span> -->
 <!-- <Transition >
       <h3 class="font-weight-semibold leading-normal text-xl text-uppercase">WE LAUNCH YOUR SUCCESS</h3>
 
       
      </Transition> -->
    </RouterLink>
  </div>

  <!-- 👉 Nav items -->
    <!-- <v-navigation-drawer > -->
      <!-- <v-container class="custom-scrollbar"> -->

    <VerticalNavLink class="custom-scrollbar"> 
    
      <v-list-item-group  v-for="parentItem in parentItems" :key="parentItem.id">
        <v-list-item 
       class="list-item"
          style="margin:8px; border-top-right-radius: 30px;
                border-bottom-right-radius: 30px;width:95%;"
         :to="parentItem.route"
         @click="toggleChildren(parentItem)">
          <!-- <v-list-item-icon style="gap: 0.5rem;">
            <v-icon style="display:flex;float:left;margin-right:0.5rem;">{{ parentItem.icon || 'mdi-folder' }}</v-icon>
          </v-list-item-icon> -->
          <v-list-item-content >
            <v-list-item-title style="line-height: 1.375rem;letter-spacing: 0.15px;margin-inline-end: auto;fontsize:x-small;font-size: 0.8rem;">     
              
              {{ parentItem.title }}    
            
                <v-icon v-if="parentItem.children && parentItem.expanded==false" style="display:flex;float:right;">mdi-chevron-right</v-icon>
                <v-icon v-if="parentItem.expanded && parentItem.children"  style="display:flex;float:right">mdi-chevron-down</v-icon>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

    
        <v-list-item-group v-if="parentItem.expanded">
          <v-list-item 
          style="margin:5px"
           v-for="childItem in parentItem.children" :key="childItem.id" @click="navigateTo(childItem.route)">
            <v-list-item-content>
              <v-list-item-title class="d-flex" style="font-size: 0.8rem;">
                <v-icon v-if="parentItem.children" style="float:left;margin-right:20px;margin-top:5px;font-size:.75rem">ri-checkbox-blank-circle-line</v-icon>
                
              {{ childItem.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list-item-group>
    </VerticalNavLink>
    <!-- </v-container> -->
  <!-- </v-navigation-drawer> -->
   
  <ul style="margin-top:10px">
 <!-- <VerticalNavLink
      :item="{
        title: 'Dashboard',
        to: 'index',
        icon: { icon: 'mdi-home-outline' },
      }"
    /> -->
     <!-- <VerticalNavLink
      :item="{
        title: 'Dashboard',
        to: 'index',
        icon: { icon: 'mdi-home-outline' },
      }"
    />
       
    <VerticalNavLink
      :item="{
        title: 'Lead',
        to: 'account-settings',
        icon: { icon: 'mdi-account-cog-outline' },
      }"
    />
   
    <VerticalNavLink
      :item="{
        title: 'Oppertunity',
        to: '',
        icon: { icon: 'mdi-account-group-outline' },
      }"
    /> -->
      <!-- to: 'account-settings', -->
     <!-- <VerticalNavLink
      :item="{
        title: 'Service',
      
        icon: { icon: 'mdi-account-wrench-outline' },
      }"
    /> -->
    <!-- to: 'account-settings', -->
     <!-- <VerticalNavLink
      :item="{
        title: 'Product',
        
        icon: { icon: 'mdi-book-open-outline' },
      }"
    /> -->
           <!-- to: 'account-settings', -->
     <!-- <VerticalNavLink
      :item="{
        title: 'Merchant',
 
        icon: { icon: 'mdi-account-arrow-right-outline' },
      }"
    /> -->
       <!-- to: 'account-settings', -->
     <!-- <VerticalNavLink
      :item="{
        title: 'Brand',
     
        icon: { icon: 'mdi-alpha-b-circle-outline' },
      }"
    /> -->
    <!-- 👉 Pages -->
    <!-- <VerticalNavSectionTitle :item="{ heading: 'Pages' }" />
    <VerticalNavLink
      :item="{
        title: 'Login',
        to: 'login',
        target: '_blank',
        icon: { icon: 'mdi-login' },
      }"
    />
    <VerticalNavLink
      :item="{
        title: 'Register',
        to: 'register',
        target: '_blank',
        icon: { icon: 'mdi-account-plus-outline' },
      }"
    /> -->

    <!-- ℹ️ This path doesn't exist so 404 route will catch this undefined path -->
    <!-- <VerticalNavLink
      :item="{
        title: 'Error',
        to: { path: '/error' },
        target: '_blank',
        icon: { icon: 'mdi-alert-circle-outline' },
      }"
    /> -->

    <!-- 👉 User Interface -->
    <!-- <VerticalNavSectionTitle :item="{ heading: 'User Interface' }" />

    <VerticalNavLink
      :item="{
        title: 'Typography',
        to: 'typography',
        icon: { icon: 'mdi-alpha-t-box-outline' },
      }"
    />
    <VerticalNavLink
      :item="{
        title: 'Icons',
        to: 'icons',
        icon: { icon: 'mdi-eye-outline' },
      }"
    />
    <VerticalNavLink
      :item="{
        title: 'Cards',
        to: 'card-basic',
        icon: { icon: 'mdi-credit-card-outline' },
      }"
    />
    <VerticalNavLink
      :item="{
        title: 'Tables',
        to: 'tables',
        icon: { icon: 'mdi-table' },
      }"
    />
    <VerticalNavLink
      :item="{
        title: 'Form Layouts',
        to: 'form-layouts',
        icon: { icon: 'mdi-form-select' },
      }"
    /> -->
  </ul>

  <!-- 👉 illustration -->
  <!-- <a
    href="https://themeselection.com/item/materio-vuetify-vuejs-admin-template"
    target="_blank"
    rel="noopener noreferrer"
  >
    <img
      :src="upgradeBanner"
      alt="upgrade-banner"
      transition="scale-transition"
      class="upgrade-banner mx-auto"
      style="max-width: 230px"
    />
  </a> -->
</template>

<style scoped>
.custom-scrollbar {

    overflow-y: auto;
    scrollbar-width: thin; /* For Firefox */
    scrollbar-color: var(--scrollbar-track) var(--scrollbar-thumb); /* For Firefox */
  }

  /* Webkit (Chrome, Safari) scrollbar styles */
  .custom-scrollbar::-webkit-scrollbar {
    width: 6px; /* Width of the scrollbar */
  }

  .custom-scrollbar::-webkit-scrollbar-thumb {
    background-color: var(--scrollbar-thumb); /* Color of the scrollbar thumb */
    border-radius: 4px; /* Rounded corners of the scrollbar thumb */
  }

  .custom-scrollbar::-webkit-scrollbar-track {
    background-color: var(--scrollbar-track); /* Color of the scrollbar track */
  }
</style>>





