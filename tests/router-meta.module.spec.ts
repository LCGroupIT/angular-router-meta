import { RouterTestingModule } from '@angular/router/testing';
import { async, inject, TestBed } from '@angular/core/testing';

import { RouterMetaModule, RouterMetaService } from '../src';
import { Router } from '@angular/router';
import { Location } from "@angular/common";
import { Meta } from "@angular/platform-browser";
import {
    routes,
    AppComponent,
    HomeComponent
} from "./helpers";

describe('AppComponent', () => {
    let testBedService: RouterMetaService;
    let meta: Meta;
    let location: Location;
    let router: Router;
    let fixture;
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                AppComponent,
                HomeComponent
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
        meta.removeTag('angular-router-meta');
        router.initialNavigation();

    });

    it('SeoService should be provided',
        inject([RouterMetaService], (injectService: RouterMetaService) => {
            expect(injectService).toBe(testBedService);
        })
    );

    it('navigate to "" redirects you to /home', async(() => {
        router = TestBed.get(Router);
        router.navigate(['']).then(() => {
            expect(location.path()).toBe('/home');
        });
    }));

    it('should set meta tag', async(() => {
        meta = TestBed.get(Meta);
        router = TestBed.get(Router);
        router.navigate(['']).then(() => {
            expect(location.path()).toBe('/home');
            const tag = meta.getTag('name="render:status_code"');
            const value = tag.content;
            expect(tag).toBeTruthy();
            expect(value).toContain('000');
        });
    }));

    it('should change content value', async(() => {
        meta = TestBed.get(Meta);
        router = TestBed.get(Router);
        router.navigate(['']);
        router.navigate(['changemeta']).then(() => {
            expect(location.path()).toBe('/changemeta');
            const tag = meta.getTag('name="render:status_code"');
            const value = tag.content;
            expect(tag).toBeTruthy();
            expect(value).toContain('001');
        });

    }));

    it('should delete old tag and add new one', async(() => {
        meta = TestBed.get(Meta);
        router = TestBed.get(Router);
        router.navigate(['']);
        router.navigate(['replacemeta']).then(() => {
            expect(location.path()).toBe('/replacemeta');
            const oldTag = meta.getTag('name="render:status_code"');
            const newTag = meta.getTag('name="test:replace"');
            const value = newTag.content;
            expect(oldTag).toBeNull();
            expect(newTag).toBeTruthy();
            expect(value).toContain('replaced');
        });
    }));

    it('should define several meta tags', async(() => {
        meta = TestBed.get(Meta);
        router = TestBed.get(Router);
        router.navigate(['']);
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
    }));

    it('should delete meta tag', async(() => {
        meta = TestBed.get(Meta);
        router = TestBed.get(Router);
        router.navigate(['']);
        router.navigate(['severalmeta']);
        router.navigate(['nometa']).then(() => {
            expect(location.path()).toBe('/nometa');
            const oldTag = meta.getTag('name="render:status_code"');
            const oldTag1 = meta.getTag('name="several-1"');
            const oldTag2 = meta.getTag('name="several-2"');
            expect(oldTag).toBeNull();
            expect(oldTag1).toBeNull();
            expect(oldTag2).toBeNull();
        });
    }));
});
