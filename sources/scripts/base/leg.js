

define(['../lib/pixi', '../utils/tool', '../control/mouse', '../core/render', '../core/global'],
function(PIXI, Tool, Mouse, Render, Global)
{
  var Part = function ()
  {
    this.x = 0
    this.y = 0
    this.angle = 0
    this.length = 200
    this.target = Tool.vec2(0,0)
    this.setPosition = function (x, y)
    {
      this.x = x
      this.y = y
    }
    this.setTarget = function (x, y)
    {
      this.target.x = x
      this.target.y = y
    }
    this.getTarget = function ()
    {
      return Tool.vec2(this.x + Math.cos(this.angle) * this.length, this.y + Math.sin(this.angle) * this.length)
    }
  }

  var Leg = function ()
  {
    this.segmentCount = 2
    this.partList = []
    this.target = Tool.vec2(0,0)
    this.segmentLength = 100

    this.init = function ()
    {
      this.partList = []
      for (var i = 0; i < this.segmentCount; ++i)
      {
        var part = new Part()
        var ratio = i / this.segmentCount
        part.length /= 1 + (1 - ratio) * 2
        this.partList.push(part)
      }
    }

    this.update = function ()
    {
      this.updateInverseKinematic(Mouse.x, Mouse.y, 1)
    }

    this.draw = function (graphics)
    {
      graphics.beginFill(0x3c5f90)
      for(var i = 0; i < this.segmentCount; ++i)
      {
        var part = this.partList[i]
        var target = part.target
        var thinckness = this.segmentCount - i
        var right = Tool.vec2(target.y - part.y, -(target.x - part.x))
        right = Tool.normalize(right.x, right.y)
        graphics.moveTo(part.x + right.x * thinckness, part.y + right.y * thinckness)
        graphics.lineTo(target.x + right.x * thinckness / 2, target.y + right.y * thinckness / 2)
        graphics.lineTo(target.x - right.x * thinckness / 2, target.y - right.y * thinckness / 2)
        graphics.lineTo(part.x - right.x * thinckness, part.y - right.y * thinckness)
      }
      graphics.endFill()
    }

    this.setRootPosition = function (x, y)
    {
      this.partList[this.partList.length - 1].x = x
      this.partList[this.partList.length - 1].y = y
    }

    this.getRootPosition = function ()
    {
      return Tool.vec2(this.partList[this.partList.length - 1].x, this.partList[this.partList.length - 1].y)
    }

    // Thanks to DillingerLee
    // https://www.khanacademy.org/computer-programming/inverse-kinematics/1191743453
    this.updateInverseKinematic = function (targetX, targetY, preferredRotation)
    {
      var root = this.getRootPosition()
      var direction = Tool.vec2(targetX - root.x, targetY - root.y)
      var distance = Tool.length(direction.x, direction.y)
      direction = Tool.normalize(direction.x, direction.y)

      var poleVector = Tool.vec2(0,0)
      var disc = this.segmentLength * this.segmentLength - distance * distance / 4
      if(disc < 0)
      {
          poleVector.x = root.x + direction.x * this.segmentLength
          poleVector.y = root.y + direction.y * this.segmentLength
          targetX = root.x + direction.x * this.segmentLength * 2
          targetY = root.y + direction.y * this.segmentLength * 2
      }
      else
      {
          poleVector.x = root.x + direction.x * distance / 2
          poleVector.y = root.y + direction.y * distance / 2
          disc = Math.sqrt(disc)
          if(preferredRotation < 0)
          {
              disc = -disc
          }
          poleVector.x -= direction.y * disc
          poleVector.y += direction.x * disc
      }
      this.partList[0].setPosition(root.x, root.y)
      this.partList[0].setTarget(poleVector.x, poleVector.y)
      this.partList[1].setPosition(poleVector.x, poleVector.y)
      this.partList[1].setTarget(targetX, targetY)
    }

    // Thanks to Casey Reas, Ben Fry and Keith Peters
    this.updateInverseKinematicKeithPeters = function (ratio, offset, speed)
    {
      var firstPart = this.partList[0]
      var radius = 32 * (Math.sin(Global.timeElapsed * speed + offset) * 0.5 + 0.5)

      var mX = Mouse.x + Math.cos(ratio * Math.PI * 2) * 8
      var mY = Mouse.y + Math.sin(ratio * Math.PI * 2) * 8
      var x = mX - Math.cos(firstPart.angle) * radius
      var y = mY - Math.sin(firstPart.angle) * radius
      this.reachSegment(0, x, y)

      for (var i = 1; i < this.segmentCount; ++i)
      {
        this.reachSegment(i, this.target.x, this.target.y)
      }

      for (var i = this.segmentCount - 1; i >= 1; --i)
      {
        var target = this.partList[i].getTarget()
        this.partList[i - 1].x = target.x
        this.partList[i - 1].y = target.y
      }
    }

    this.reachSegment = function (i, xin, yin)
    {
      var part = this.partList[i]
      var dx = xin - part.x
      var dy = yin - part.y
      part.angle = Math.atan2(dy, dx)
      this.target.x = xin - Math.cos(part.angle) * part.length
      this.target.y = yin - Math.sin(part.angle) * part.length
    }
  }

  return Leg
})
