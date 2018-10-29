import { RouterTestingModule } from "@angular/router/testing";
import { async, inject, TestBed, tick, fakeAsync } from '@angular/core/testing';

import { RouterMetaModule, RouterMetaService } from '../src';
import { Router } from '@angular/router';
import { Location } from "@angular/common";
import { Meta } from "@angular/platform-browser";
import {
    routes,
    AppComponent,
    HomeComponent,
    ChangeMetaComponent,
    ReplaceMetaComponent,
    SeveralMetaComponent,
    NoMetaComponent
} from "./helpers";


describe('HomeComponent', () => {
    let testBedService: RouterMetaService;
    let meta: Meta;
    let location: Location;
    let router: Router;
    let fixture;
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                AppComponent,
                HomeComponent,
                ChangeMetaComponent,
                ReplaceMetaComponent,
                SeveralMetaComponent,
                NoMetaComponent
            ],
            imports: [
                RouterTestingModule.withRoutes(routes),
                RouterMetaModule.forRoot()
            ],
            providers: []
        }).compileComponents();
        testBedService = TestBed.get(RouterMetaService);
        meta = TestBed.get(Meta);
        router = TestBed.get(Router);
        location = TestBed.get(Location);

        fixture = TestBed.createComponent(AppComponent);
        router.initialNavigation();
    });

    it('SeoService should be provided',
        inject([RouterMetaService], (injectService: RouterMetaService) => {
            expect(injectService).toBe(testBedService);
        })
    );

    it('navigate to "" redirects you to /home', fakeAsync(() => {
        router = TestBed.get(Router);
        router.navigate(['']).then(() => {
            expect(location.path()).toBe('/home');
        });
        tick();
    }));

    it('navigation to the route with data.meta should set meta tag', fakeAsync(() => {
        meta = TestBed.get(Meta);
        router = TestBed.get(Router);
        router.navigate(['']).then(() => {
            expect(location.path()).toBe('/home');
            const tag = meta.getTag('name="render:status_code"');
            const value = tag.content;
            expect(tag).toBeTruthy();
            expect(value).toContain('000');
        });
        tick();
    }));

    it('navigation to the route with the same name of data.meta changes content value', fakeAsync(() => {
        meta = TestBed.get(Meta);
        router = TestBed.get(Router);
        router.navigate(['']);
        tick();
        router.navigate(['changemeta']).then(() => {
            expect(location.path()).toBe('/changemeta');
            const tag = meta.getTag('name="render:status_code"');
            const value = tag.content;
            expect(document.body.querySelector('ng-component').innerHTML).toContain('Change meta');
            console.log('expected Change meta', document.body.querySelector('ng-component').innerHTML);
            // тест не прошел (expected '000' to contain '001'), но на странице верный компонент
            expect(tag).toBeTruthy();
            expect(value).toContain('001');
        });
        tick();
    }));

    it('navigation to the route with different name of data.meta replaces previous with the new one', fakeAsync(() => {
        meta = TestBed.get(Meta);
        router = TestBed.get(Router);
        router.navigate(['']);
        tick();
        router.navigate(['replacemeta']).then(() => {
            expect(location.path()).toBe('/replacemeta');
            const oldTag = meta.getTag('name="render:status_code"');
            const newTag = meta.getTag('name="test:replace"');
            const value = newTag.content;
            expect(document.body.querySelector('ng-component').innerHTML).toContain('Replace meta');
            console.log('expected Replace meta', document.body.querySelector('ng-component').innerHTML);
            // тут на странице еще HomeComponent
            expect(oldTag).toBeNull();
            expect(newTag).toBeTruthy();
            expect(value).toContain('replaced');
        });
        tick();
        
    }));

    it('navigation to the route with several meta defined sets several meta tags', fakeAsync(() => {
        meta = TestBed.get(Meta);
        router = TestBed.get(Router);
        router.navigate(['']);
        tick();
        router.navigate(['severalmeta']).then(() => {
            expect(location.path()).toBe('/severalmeta');
            const oldTag = meta.getTag('name="render:status_code"');
            expect(oldTag).toBeNull();
    
            const firstTag = meta.getTag('name="test:first"');
            const secondTag = meta.getTag('name="test:second"');
            const value1 = firstTag.content;
            const value2 = secondTag.content;
            expect(firstTag).toBeTruthy();
            expect(value1).toContain('several-1');
            expect(secondTag).toBeTruthy();
            expect(value2).toContain('several-2');
        });
        tick();
        
    }));

    it('navigation to the route without meta removes previous', fakeAsync(() => {
        meta = TestBed.get(Meta);
        router = TestBed.get(Router);
        router.navigate(['']);
        tick();
        router.navigate(['severalmeta']);
        tick();
        router.navigate(['nometa']).then(() => {
            expect(location.path()).toBe('/nometa');
            const oldTag = meta.getTag('name="render:status_code"');
            const oldTag1 = meta.getTag('name="several-1"');
            const oldTag2 = meta.getTag('name="several-2"');
            expect(oldTag).toBeNull();
            expect(oldTag1).toBeNull();
            expect(oldTag2).toBeNull();
        });
        tick();
    }));
});
