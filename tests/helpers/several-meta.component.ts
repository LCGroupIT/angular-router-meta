import { Component } from "@angular/core";
import { RouterMetaService } from "../../src";

@Component({
    template: `Home`
})
export class SeveralMetaComponent {
    constructor(private seo: RouterMetaService) { }
}
