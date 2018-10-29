import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RouterMetaService } from './router-meta.service';


@NgModule({
    imports: [
        RouterModule
    ],
    providers: []
})
export class RouterMetaModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: RouterMetaModule,
            providers: [
                RouterMetaService
            ]
        };
    }
}
