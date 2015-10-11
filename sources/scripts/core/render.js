
define(['../lib/pixi', '../core/global', '../gui/interface'],
function(PIXI, Global, Interface)
{
  var Render = function ()
  {
    // PIXI WebGL renderer
    this.renderer = PIXI.autoDetectRenderer(Global.width, Global.height, {view:Global.canvas})

    // Layers
    this.layerRoot = new PIXI.Container()

    this.init = function ()
    {
    }

    this.update = function ()
    {
      this.renderer.render(this.layerRoot)
    }
  }

  return new Render()
})
