### Description


### Dependencies
---
All dependencies are handled internally by the component with one exception - the Web Components polyfills for Custom Elements. Keep in mind that this polyfill will need to load BEFORE other related assets so add it in the head of the document and as close to the opening of the head tag as possible.

```html
<script async src='https://cdnjs.cloudflare.com/ajax/libs/custom-elements/1.1.0/custom-elements.min.js' ></script>
```

### Usage and Limitations
---

No build necessary. No complexities. Just add this script to the head of your HTML document below the Custom Elements polyfill.

When you want to use it simply add it to your markup
````html
<img-icon></img-icon>
````

### Browser Support
---------------

| <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/chrome/chrome_64x64.png" width="48px" height="48px" alt="Chrome logo"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/edge/edge_64x64.png" width="48px" height="48px" alt="Edge logo"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/firefox/firefox_64x64.png" width="48px" height="48px" alt="Firefox logo"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/opera/opera_64x64.png" width="48px" height="48px" alt="Opera logo"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/safari/safari_64x64.png" width="48px" height="48px" alt="Safari logo"> |
|:---:|:---:|:---:|:---:|:---:|
| Latest ✔ | Latest ✔ | Latest ✔ | Latest ✔ | Latest ✔ |

### API
---

##### Attributes

| Attribute Name | Required | Type | Example | Comments |
| --- | --- | --- | --- | --- |
| fill | **No** | integer | 70 | fill is a number from 0 to 100 which is an integer representation of the color fill percentage |
| shape | **No** | string | "menu" | This attribute isthe name of the svg path used to create the icon |

##### Methods

| name | description | method type | usage | returns |
| ---- | ----------- | ----- |  ----- | --- |
| **shapes** | 'shapes' returns an array of all the possible shape names | instance | `document.querySelector('img-icon').shapes` | array |
| **shape** | 'shape' returns the current shape value | instance | `document.querySelector('img-icon').shape` | string |
| **fill** | 'fill' returns the integer representation of the icon fill | instance | `document.querySelector('img-icon').fill` | number |

### Events
---

##### **`fillUpdated (TODO)`**
##### **`shapeUpdated (TODO)`**

<!-- **ratingUpdated** is a DOM Custom Event that fires whenever the value of the `star-rating` element is updated.

| event detail | default value | type |
| --- |:---:|:---:|
| `event.detail.maxValue` | `5` | `number` |
| `event.detail.value` | `0` | `number` | -->

<!-- ##### Usage Example
Add an event listener as seen below. When you tap or click on a star, the console should output the correct state information of that element.

```javascript
    document.querySelector('star-rating').addEventListener('ratingUpdated', function(evt){
        // do something with the event information `evt.detail`
        console.log(evt.detail.maxValue, evt.detail.value);
    });
``` -->

<!-- ### Development
---

Use an existing application server to load the demos and set the root to the folder. Then you can navigate with your browser to the localhost & port. If you want a quick and easy server user `serve`. Serve uses port 3000 by default.

##### Download webpack & serve (optional)
```shell
$ npm i serve webpack -g
```
###### Running the server locally (using `serve`)
```shell
$ npm run demo
```

To view the demo in the browser using the serve module, navigate in your browser to `localhost:3000` after running the above command. Most API examples are testable on the demo page.

Online examples are on the the project [github pages](http://nevraeka.github.io/star-rating/) -->

### <img-icon> Demos
---
TODO
<!-- ##### Changing the image src attribute
[![changing the image src attribute](https://raw.githubusercontent.com/Nevraeka/star-rating/master/img/changing-the-image-source.png)](http://codepen.io/Nevraeka/pen/qZpryV/) -->

### Contributing
---

To contribute to this project all you will need is NPM installed and a love of web components. Please submit any suggestions or changes with a pull request (when possible). Here is the [Code of Conduct]() for contributions