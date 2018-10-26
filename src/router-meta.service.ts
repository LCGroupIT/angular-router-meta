import { Injectable } from '@angular/core';
import { Meta, MetaDefinition } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';

import { filter, map, mergeMap } from 'rxjs/operators';

const META_TAG_ATTRIBUTE = 'angular-router-meta';

@Injectable()
export class RouterMetaService {

    constructor(
        private meta: Meta,
        private router: Router
    ) {
        router.events
            .pipe(
                filter(event => event instanceof NavigationEnd),
                map(() => this.router.routerState.root),
                map(route => {
                    while (route.firstChild) {
                        route = route.firstChild;
                    }
                    return route;
                }),
                filter(route => route.outlet === 'primary'),
                mergeMap(route => route.data)
            )
            .subscribe(
                eventData => {
                    const metaList: MetaDefinition[] = eventData['meta'] || [];
                    this.meta.removeTag(META_TAG_ATTRIBUTE);
                    const tags = this.meta.addTags(metaList);
                    tags.forEach(t => t.setAttribute(META_TAG_ATTRIBUTE, ''));
                });
    }
}
