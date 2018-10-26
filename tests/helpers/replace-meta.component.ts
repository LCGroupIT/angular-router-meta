import { Component } from "@angular/core";
import { RouterMetaService } from "../../src";

@Component({
    template: `Home`
})
export class ReplaceMetaComponent {
    constructor(private seo: RouterMetaService) { }
}
