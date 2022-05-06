namespace SpriteKind {
    export const Hoop = SpriteKind.create()
    export const Stage = SpriteKind.create()
    export const Backboard = SpriteKind.create()
}
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    timer.throttle("action", 10950, function () {
        animation.runMovementAnimation(
        mySprite,
        animation.animationPresets(animation.easeUp),
        3000,
        false
        )
        music.zapped.playUntilDone()
        animation.runImageAnimation(
        mySprite,
        assets.animation`Movement`,
        200,
        true
        )
        animation.runMovementAnimation(
        mySprite,
        animation.animationPresets(animation.flyToCenter),
        450,
        false
        )
        statusbar.value += -100
    })
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Hoop, function (sprite, otherSprite) {
    mySprite2.startEffect(effects.halo, 200)
    music.pewPew.play()
    projectile.destroy()
    info.changeScoreBy(1)
    if (info.player1.score() > 55) {
        mySprite2.startEffect(effects.fire, 2000)
        mySprite.vx += 10
    }
    if (info.player1.score() > 75) {
        mySprite2.startEffect(effects.ashes, 5000)
        mySprite.vx += 10
    }
    if (info.player1.score() > 90) {
        mySprite2.startEffect(effects.warmRadial, 6500)
        music.spooky.play()
        projectile.vy += 10
        mySprite.vx += 10
    }
    if (info.score() >= 100) {
        game.over(true, effects.confetti)
    }
})
controller.A.onEvent(ControllerButtonEvent.Released, function () {
    projectile = sprites.createProjectileFromSprite(assets.image`Basketball`, mySprite, 0, -100)
    music.footstep.play()
    projectile.setFlag(SpriteFlag.DestroyOnWall, true)
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    mySprite.sayText(":P", 500, true)
    animation.runImageAnimation(
    mySprite,
    [img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . f f f f f f . . . . . 
        . . . . . 4 4 4 4 4 4 . . . . . 
        . . . . . e f e e f e . . . . . 
        . . . . . e e e e e e . . . . . 
        . . . . . . . e e . . . . . . . 
        . . . . . e 8 8 8 8 e . . . . . 
        . . . . . e 8 8 8 8 e . . . . . 
        . . . . . e 8 8 8 8 e . . . . . 
        . . . . . 1 . 8 8 . 1 . . . . . 
        . . . . . e . 8 8 . e . . . . . 
        . . . . . . . 8 8 . . . . . . . 
        . . . . . . . 4 4 . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . 5 5 5 5 . . . . . . 
        . . . . . . 5 5 5 5 . . . . . . 
        . . . . . . . 5 5 . . . . . . . 
        . . . . . f f f f f f . . . . . 
        . . . e . 4 4 4 4 4 4 . e . . . 
        . . . 1 . e f e e f e . 1 . . . 
        . . . e . e e e e e e . e . . . 
        . . . e . . . e e . . . e . . . 
        . . . e e e 8 8 8 8 e e e . . . 
        . . . . . . 8 8 8 8 . . . . . . 
        . . . . . . 8 8 8 8 . . . . . . 
        . . . . . . . 8 8 . . . . . . . 
        . . . . . . 8 8 8 8 . . . . . . 
        . . . . . 8 8 . . 8 8 . . . . . 
        . . . . 4 4 . . . . 4 4 . . . . 
        . . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . f f f f f f . . . . . 
        . . . . . 4 4 4 4 4 4 . . . . . 
        . . . . . e f e e f e . . . . . 
        . . . . . e e e e e e . . . . . 
        . . . . . . . e e . . . . . . . 
        . . . . . e 8 8 8 8 e . . . . . 
        . . . . . e 8 8 8 8 e . . . . . 
        . . . . . e 8 8 8 8 e . . . . . 
        . . . . . 1 . 8 8 . 1 . . . . . 
        . . . . . e . 8 8 . e . . . . . 
        . . . . . . . 8 8 . . . . . . . 
        . . . . . . . 4 4 . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `],
    800,
    false
    )
    music.playMelody("G F C G F C C5 C5 ", 274)
    animation.runImageAnimation(
    mySprite,
    assets.animation`Movement`,
    200,
    true
    )
})
statusbars.onStatusReached(StatusBarKind.Energy, statusbars.StatusComparison.EQ, statusbars.ComparisonType.Percentage, 100, function (status) {
    music.beamUp.play()
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Backboard, function (sprite2, otherSprite2) {
    projectile.setStayInScreen(true)
    projectile.setBounceOnWall(true)
    sprites.destroyAllSpritesOfKind(SpriteKind.Projectile, effects.trail, 3300)
    music.knock.play()
    scene.cameraShake(4, 100)
    projectile.ay += 125
    projectile.ax += 65
})
let projectile: Sprite = null
let statusbar: StatusBarSprite = null
let mySprite2: Sprite = null
let mySprite: Sprite = null
scene.setBackgroundImage(assets.image`Half-court`)
mySprite = sprites.create(assets.image`Player 1`, SpriteKind.Player)
mySprite.setVelocity(50, 0)
mySprite.setPosition(77, 62)
mySprite.setBounceOnWall(true)
animation.runImageAnimation(
mySprite,
assets.animation`Movement`,
200,
true
)
let mySprite3 = sprites.create(assets.image`Backboard`, SpriteKind.Backboard)
mySprite3.setPosition(77, 7)
mySprite2 = sprites.create(assets.image`Hoop`, SpriteKind.Hoop)
mySprite2.setPosition(77, 12)
statusbar = statusbars.create(1, 8, StatusBarKind.Energy)
statusbar.attachToSprite(mySprite, -15, 3)
statusbar.setStatusBarFlag(StatusBarFlag.SmoothTransition, true)
statusbar.setColor(5, 0)
statusbar.max = 100
let seconds = 10000
game.setDialogFrame(assets.image`timer`)
game.setDialogCursor(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `)
game.setDialogTextColor(2)
game.showLongText(seconds, DialogLayout.Bottom)
forever(function () {
    pause(500)
    statusbar.value += 5
})
