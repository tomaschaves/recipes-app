## Biblioteca
### Clipboard copy
* Serve para copiar o texto 
* https://www.npmjs.com/package/clipboard-copy
<!-- * Comando `npm install clipboard-copy` -->
* Instalar: `npm install clipboard-copy`
* Uso: 
```js
const copy = require('clipboard-copy')
```
 
```js
button.addEventListener('click', function () {
  copy('This is some cool text')
})
```