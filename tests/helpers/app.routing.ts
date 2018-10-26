import { Routes } from "@angular/router";
import { HomeComponent } from "./home.component";
import { NoMetaComponent } from "./no-meta.component";
import { ChangeMetaComponent } from "./change-meta.component";
import { ReplaceMetaComponent } from "./replace-meta.component";
import { SeveralMetaComponent } from "./several-meta.component";

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
    { path: 'nometa', component: NoMetaComponent },
    {
        path: 'changemeta', component: ChangeMetaComponent,
        data: {
            meta: [{
                name: 'render:status_code',
                content: '001'
            }]
        }
    },
    {
        path: 'replacemeta', component: ReplaceMetaComponent,
        data: {
            meta: [{
                name: 'test:replace',
                content: 'replaced'
            }]
        }
    },
    {
        path: 'severalmeta', component: SeveralMetaComponent,
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