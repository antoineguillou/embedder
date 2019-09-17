# embedder

### Installation

First include embedder's styles and javascript files in your page:

```html
<link rel="stylesheet" href="path/to/embedder.min.css">
<script src="path/to/embedder.min.js"></script>
```

### Usage

Then the easiest way to include a video is using the `data-embedder` attribute and the video Id.

##### Youtube

```html
<div data-embedder data-youtube="hTGJfRPLe08"></div>
```

##### Vimeo

```html
<div data-embedder data-vimeo="108071233"></div>
```

##### Twitch

```html
<div data-embedder data-twitch="twitchplayspokemon"></div>
```

##### Dailymotion

```html
<div data-embedder data-dailymotion="x7c1hw5"></div>
```

It's also possible to use embedder on any element using javascript :

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

Options can be set using data attributes :

```html
<div data-embedder data-youtube="hTGJfRPLe08" data-autoplay></div>
```

```html
<div data-embedder data-youtube="hTGJfRPLe08" data-ratio="4:3"></div>
```

### options

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
    <td>service</td><td>string</td><td>youtube</td><td>The video streaming site.</td>
  </tr>

</table>
