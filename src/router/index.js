import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/views/HomePage.vue';
import RegisterPage from '@/views/RegisterPage.vue';
import LoginPage from '@/views/LoginPage.vue';
import ContactPage from '@/views/ContactPage.vue';
import GalleryPage from '@/views/GalleryPage.vue';
import HuntingOfferPage from '@/views/HuntingOfferPage.vue';
import HuntingLogsPage from '@/views/HuntingLogsPage.vue';
import UserCalendar from '@/views/UserCalendar.vue'

const routes = [
  { path: '/', name: 'Home', component: HomePage },
  { path: '/register', name: 'Register', component: RegisterPage },
  { path: '/login', name: 'Login', component: LoginPage },
  { path: '/contact', name: 'Contact', component: ContactPage },
  { path: '/gallery', name: 'Gallery', component: GalleryPage },
  { path: '/offer/:offer', name: 'HuntingOffer', component: HuntingOfferPage },
  { path: '/what-we-offer', name: 'WhatWeOffer', component: HuntingOfferPage },
  { path: '/logs', name: 'Logs', component: HuntingLogsPage },
  { path: '/calendar', name: 'UserCalendar', component: UserCalendar }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;