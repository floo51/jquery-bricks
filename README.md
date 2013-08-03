jquery-bricks
=============

jQuery Bricks builds walls with your HTML elements.

First developed to mimic google+ albums image layout, it works with any HTML elements.

Demos :
- [with images](http://jsfiddle.net/rqb98/)
- [with divs](http://jsfiddle.net/3jTRG/)


# Usage

### HTML

- Import jQuery
- Import jquery-bricks.js for production / jquery-bricks.min.js for developpement
- Build your HTML

```html
<html>
  <head>
    <script src="jquery.js"></script>
    <script src="jquery-bricks.js"></script>
  </head>
  <body>
    <div id="container">
        <img src="http://placehold.it/225x300" />
        <img src="http://placehold.it/400x300" />
        <img src="http://placehold.it/317x400" />
        <img src="http://placehold.it/275x300" />
        <img src="http://placehold.it/127x300" />
        <img src="http://placehold.it/275x300" />
        <img src="http://placehold.it/127x300" />
        <img src="http://placehold.it/600x300" />
    </div>
  </body>
</html>
```

### CSS

- Items must be inline-blocks
- Container must have a 0px font-size to avoid spaces between items

```css
#container {
    font-size: 0px;
}
#container div.item{
  display: inline-block;
}
```

### JS
- Call bricks on ready

```javascript
$(function(){
  $('#container').bricks();
});
```

### Options

bricks can be called with arguments :
- *maxRowHeight* : maximum row height in the wall
- *itemSelector* : jquery selector for the items

```javascript
$(function(){
  $('#container').bricks({
    maxRowHeight: 100,
    itemSelector: 'div.item'
  });
});
```

### Methods


- *layout* : recomputes the layout (useful on resize, items added ...)

```javascript
$('#container').data('bricks').layout();
```

