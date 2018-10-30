# angular-router-meta
Angular v4+ meta helper.

<!-- The package helps to manage meta tags more conveniently setting them directly in routes. The tags set in routes appear in the *head* tag right after the navigation is completed.

This package is a powerful instrument in seo setting. -->


- [Installation](#installation)
- [Usage](#usage)
- [Result](#result)

## Installation

### 1. Install the package
```bash
$ npm install angular-router-meta --save
```

### 2. Import RouterMetaModule from *node_modules/angular-router-meta* folder

```typescript
import { RouterMetaModule } from 'angular-router-meta';
```
Add imported module to the *imports* section in NgModule decorator
```typescript
@NgModule({
  .
  .
  .
  imports: [
    :
    RouterMetaModule.forRoot()
  ]
})
```
**NOTE:** *forRoot()* method isn't optional. The module won't work if you do not call this method

### 3. Inject service in AppComponent constructor

```typescript

import { Component } from '@angular/core';
import { RouterMetaService } from 'angular-router-meta';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    private routerMeta: RouterMetaService
  ){ }
}
```

## Usage
Add an array of meta tags inside the *data* property in your *routes* constant

```typescript
export const appRoutes: Routes = [
  {
    path: 'somepath',
    loadChildren: 'modules/some/some.module#SomeModule',
    data: {
        meta: [
            {
                name: 'my_name',
                content: 'the_name',
                charset: 'utf-8',
                property: 'some_property'
            },
            {
                name: 'render:status_code',
                content: '200'
            }
        ]
    }
  }
];
```

## Result
These settings in *appRoutes* constant will render the following code in *head* tag:
```html
<meta name="my_name" content="the_name" charset="utf-8" property="some_property" angular-router-meta>
<meta name="render:status_code" content="200" angular-router-meta>
```

