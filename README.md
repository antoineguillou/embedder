# Embedder

Embedder is a lightweight javascript tool making it simple to embed responsive videos in a webpage. Right now, Embedder works with youtube, vimeo, twitch and dailymotion but more streaming services will be added soon.

Here's a [demo](https://antoineguillou.github.io/embedder/) where you can see it in action.

![how Embedder works](https://i.imgur.com/Wj9SMKX.jpg)

## Installation

First include Embedder's styles and javascript files in your page:

```html
<link rel="stylesheet" href="path/to/embedder.min.css">
<script src="path/to/embedder.min.js"></script>
```

## Usage

The easiest way to include a video is using the `data-embedder` attribute and the video Id.

### Youtube
```html
<div data-embedder data-youtube="NzmF4lby-GM"></div>
```

### Vimeo
```html
<div data-embedder data-vimeo="192854788"></div>
```

### Dailymotion
```html
<div data-embedder data-dailymotion="x3jfp9v"></div>
```

### Twitch
```html
<div data-embedder data-twitch="1051246608"></div>
```

You can also paste an URL and embedder will try to determine the service & ID.

```html
<div data-embedder data-url="https://www.youtube.com/watch?v=G-n9p28Yh8w"></div>
```

It's also possible to use embedder on any element using javascript

```javascript
new embedder(element, options);
```

Here's an example :

```html
<div id="video"></div>

<script>
  var element = document.getElementById('video');

  var embed = new embedder(element, {
    id: 'hTGJfRPLe08',
    service: 'youtube'
  });
</script>
```

## Options

<table>
  <tr>
    <th>Option</th><th>Type</th><th>Default</th><th>Description</th>
  </tr>
  <tr>
    <td>autoplay</td><td>bool</td><td>false</td><td>Defines if the video should autoplay or not.</td>
  </tr>
  <tr>
    <td>id</td><td>string</td><td>ayf1sYiNLhQ</td><td>The video ID.</td>
  </tr>
  <tr>
    <td>ratio</td><td>string</td><td>16:9</td><td>The video's aspect ratio.</td>
  </tr>
  <tr>
    <td>service</td><td>string</td><td>null</td><td>The video streaming site.</td>
  </tr>
  <tr>
    <td>url</td><td>string</td><td>null</td><td>Some video URL.</td>
  </tr>
</table>


Options can also be set using data attributes :

### Autoplay
```html
<div data-embedder data-youtube="hTGJfRPLe08" data-autoplay></div>
```

### Ratio
```html
<div data-embedder data-youtube="hTGJfRPLe08" data-ratio="4:3"></div>
```
Any valid aspect ratio works, the video proportions are set automatically.
* 16:9 (default)
* 4:3
* 2.35:1
* 2:1
* 1.85:1
* 1:1
* etc

## Thumbnail
```html
<div data-embedder data-youtube="hTGJfRPLe08" data-autoplay>
  <img src="https://via.placeholder.com/960x540/" srcset="https://via.placeholder.com/1920x1080/ 2x" alt="">
</div>
```
You can add any picture or img tag inside your element to be used as thumbnail

## Built With

* [Gulp](https://gulpjs.com/) The streaming build system

## Authors

* **Antoine Guillou** - *Initial work* - [Front-end developer](https://antoineguillou.fr)
