
define(['../lib/pixi', '../core/render', '../settings', '../core/logic',
'../control/mouse', '../control/keyboard', '../core/sound', '../color',
'../utils/tool', '../core/global', '../utils/animation',
'../base/leg', '../base/body'],
function(PIXI, Render, Settings, Logic, Mouse, Keyboard,
  Sound, Color, Tool, Global, Animation,
  Leg, Body)
{
  var Engine = function ()
  {
    this.body

    this.init = function ()
    {
      Global.timeStarted = new Date() / 1000

      this.body = new Body()
      this.body.x = Global.width / 2
      this.body.y = Global.height / 2
      this.body.init()
  	}

    this.update = function ()
    {
      Global.timeElapsed = new Date() / 1000 - Global.timeStarted

      this.body.update()
      this.body.draw()
    }

  }

  return new Engine()
})
