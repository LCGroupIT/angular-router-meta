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
        router.navigate(['']);
        tick();
        expect(location.path()).toBe('/home');
    }));

    it('navigation to the route with data.meta should set meta tag', fakeAsync(() => {
        router.navigate(['']);
        tick();
        const tag = meta.getTag('name="render:status_code"');
        const value = tag.content;
        expect(tag).toBeTruthy();
        expect(value).toContain('000');
    }));

    it('navigation to the route with the same name of data.meta changes content value', fakeAsync(() => {
        router.navigate(['']);
        tick();
        router.navigate(['changemeta']);
        tick();
        const tag = meta.getTag('name="render:status_code"');
        const value = tag.content;
        expect(tag).toBeTruthy();
        expect(value).toContain('001');
    }));

    it('navigation to the route with different name of data.meta replaces previous with the new one', fakeAsync(() => {
        router.navigate(['']);
        tick();
        router.navigate(['replacemeta']);
        tick();
        const oldTag = meta.getTag('name="render:status_code"');
        const newTag = meta.getTag('name="test:replace"');
        const value = newTag.content;
        expect(oldTag).toBeNull();
        expect(newTag).toBeTruthy();
        expect(value).toContain('replaced');
    }));

    it('navigation to the route with several meta defined sets several meta tags', fakeAsync(()=>{
        router.navigate(['']);
        tick();
        router.navigate(['severalmeta']);
        tick();
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
    }));
});
