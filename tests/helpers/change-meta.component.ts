import { Component } from "@angular/core";
import { RouterMetaService } from "../../src";

@Component({
    template: `Change meta`
})
export class ChangeMetaComponent {
    constructor(private seo: RouterMetaService) { }
}
