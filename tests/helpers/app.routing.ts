import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';

export const routes: Routes = [
    {
        path: 'home', component: HomeComponent,
        data: {
            meta: [{
                name: 'render:status_code',
                content: '000'
            }]
        }
    },
    { path: 'nometa', component: HomeComponent },
    {
        path: 'changemeta', component: HomeComponent,
        data: {
            meta: [{
                name: 'render:status_code',
                content: '001'
            }]
        }
    },
    {
        path: 'replacemeta', component: HomeComponent,
        data: {
            meta: [{
                name: 'test:replace',
                content: 'replaced'
            }]
        }
    },
    {
        path: 'severalmeta', component: HomeComponent,
        data: {
            meta: [{
                name: 'test:first',
                content: 'several-1'
            },
            {
                name: 'test:second',
                content: 'several-2'
            }]
        }
    },
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    }
];