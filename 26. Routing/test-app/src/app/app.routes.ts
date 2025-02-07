import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { DiscountInfoComponent } from './discount-info/discount-info.component';
import { AppRoutes } from './router.service';

export const routes: Routes = [
    {
        path: 'discount-info',
        component: DiscountInfoComponent,
        outlet: 'discount'
    },
    {
        path: AppRoutes.LOGIN,// example.com/login
        component: LoginComponent,
        data: {
            customTitle: 'Hello world!'
        }
    },
    {
        path: AppRoutes.HOME,// https://my-site.com/home
        component: HomeComponent,
        loadChildren: () => import('./home/routes')
    },
    {
        path: AppRoutes.CONTACT, // example.com/contact
        redirectTo: `/${AppRoutes.HOME}`,
        pathMatch: 'full' // example.com/contact/5
    },
    {
        path: '', // example.com
        redirectTo: `/${AppRoutes.LOGIN}`,
        pathMatch: 'full'
    },
    {
        path: '**',
        component: NotFoundComponent
    },
];
