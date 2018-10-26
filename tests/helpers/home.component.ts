import { Component } from "@angular/core";
import { RouterMetaService } from "../../src";

@Component({
    template: `Home`
})
export class HomeComponent {
    constructor(private seo: RouterMetaService) { }
}
