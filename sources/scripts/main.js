
define(['lib/pixi', 'core/engine', 'core/global', 'core/render', 'core/sound',
'control/mouse', 'control/keyboard', 'utils/animation'],
function(PIXI, Engine, Global, Render, Sound, Mouse, Keyboard, Animation)
{
  function init ()
  {
    Render.layerRoot.interactive = true
    Render.layerRoot.on('mousedown', Mouse.onClic).on('touchstart', Mouse.onClic)
    Render.layerRoot.on('mousemove', Mouse.onMove).on('touchmove', Mouse.onMove)
    document.addEventListener('keydown', Keyboard.onKeyDown)
    document.addEventListener('keyup', Keyboard.onKeyUp)

    Engine.init()
    Render.init()
    animate()
  }

  function animate ()
	{
    Engine.update()
    Animation.update()
    Render.update()
		requestAnimFrame(animate)
	}

	var assetToLoad = [ 'images/background.jpg' ]
	for (var i = 0; i < assetToLoad.length; ++i) { PIXI.loader.add(assetToLoad[i]) }
	PIXI.loader.once('complete', init).load();
})
