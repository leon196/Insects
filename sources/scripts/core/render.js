
define(['../lib/pixi', '../core/global', '../gui/interface'],
function(PIXI, Global, Interface)
{
  var Render = function ()
  {
    // PIXI WebGL renderer
    this.renderer = PIXI.autoDetectRenderer(Global.width, Global.height, {view:Global.canvas})

    // Layers
    this.layerRoot = new PIXI.Container()

    this.background = new PIXI.Sprite(PIXI.Texture.fromImage('images/background.jpg'))
    this.background.width = Global.width
    this.background.height = Global.height
    // this.background = new PIXI.Graphics()
    // this.background.beginFill(0xcc0000)
    // this.background.drawRect(0, 0, Global.width, Global.height)
    this.layerRoot.addChild(this.background)

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
