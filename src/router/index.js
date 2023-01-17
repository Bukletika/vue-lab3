import { createRouter, createWebHistory } from 'vue-router'

// Импортируем страницы
import New from '../views/New';
import Task from '../views/Task';
import Tasks from '../views/Tasks';
import NotFound from '../views/NotFound';


const router = createRouter({
  history: createWebHistory(), // сохранение истории

  routes: [
    {
      // alias: '/', указывает по какому адресу мы еще можем перейти с этим компонентом
      path: '/',
      component: Tasks,
    },
    {
      path: '/new',
      component: New,
    },
    {
      path: '/task/:taskId',
      component: Task,
    },
    { path: '/:notFound(.*)', component: NotFound } // 404
  ],
  //  Задаем класс активной ссылки у меню
  linkActiveClass: 'active',
  linkExactActiveClass: 'active'
})

export default router
