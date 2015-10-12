
define(['../lib/pixi', '../utils/tool', '../control/mouse', '../control/keyboard', '../core/render', '../core/global',
'../base/leg', '../color'],
function(PIXI, Tool, Mouse, Keyboard, Render, Global, Leg, Color)
{
  var Body = function ()
  {
    this.x = 0
    this.y = 0
    this.size = 16
    this.legList = []
    this.legCount = 4
    this.graphics = new PIXI.Graphics()
    Render.layerRoot.addChild(this.graphics)

    this.init = function ()
    {
      this.legList = []
      for (var i = 0; i < this.legCount; ++i)
      {
        var leg = new Leg()
        leg.init()
        this.legList.push(leg)
      }
    }

    this.update = function ()
    {
      if (Keyboard.A.down)
      {
        this.x -= 1
      }
      else if (Keyboard.D.down)
      {
        this.x += 1
      }
      if (Keyboard.W.down)
      {
        this.y -= 1
      }
      else if (Keyboard.S.down)
      {
        this.y += 1
      }
      for (var i = 0; i < this.legCount; ++i)
      {
        var angle = i / this.legCount * Math.PI * 2
        var x = this.x + Math.cos(angle) * this.size / 2
        var y = this.y + Math.sin(angle) * this.size / 2
        this.legList[i].setRootPosition(x, y)
        this.legList[i].updateInverseKinematic(Mouse.x, Mouse.y, i % 2 == 0 ? 1 : -1 )
      }
    }

    this.draw = function ()
    {
      this.graphics.clear()
      for (var i = 0; i < this.legCount; ++i)
      {
        this.legList[i].draw(this.graphics)
      }
      this.graphics.endFill()
    }
  }

  return Body
})
