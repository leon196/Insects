
define(['../lib/pixi', '../core/render', '../settings', '../core/logic',
'../control/mouse', '../control/keyboard', '../core/sound', '../color',
'../utils/tool', '../core/global', '../utils/animation'],
function(PIXI, Render, Settings, Logic, Mouse, Keyboard,
  Sound, Color, Tool, Global, Animation)
{
  var Engine = function ()
  {
    this.init = function ()
    {
      Global.timeStarted = new Date() / 1000
  	}

    this.update = function ()
    {
    }
  }

  return new Engine()
})
