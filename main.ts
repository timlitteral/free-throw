namespace SpriteKind {
    export const Hoop = SpriteKind.create()
    export const Stage = SpriteKind.create()
    export const Backboard = SpriteKind.create()
}
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
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
    if (controller.B.isPressed()) {
        mySprite.sayText(":P", 500, true)
        if (controller.B.isPressed()) {
            music.playMelody("G F C G F C C5 C5 ", 274)
        }
    }
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Hoop, function (sprite, otherSprite) {
    mySprite2.startEffect(effects.halo, 200)
    music.pewPew.play()
    projectile.destroy()
    info.changeScoreBy(1)
    if (info.player1.score() > 55) {
        mySprite2.startEffect(effects.fire, 2000)
        music.pewPew.play()
        mySprite.vx += 5
    }
    if (info.player1.score() > 75) {
        mySprite2.startEffect(effects.ashes, 5000)
        music.zapped.play()
        mySprite.vx += 5
    }
    if (info.player1.score() > 90) {
        mySprite2.startEffect(effects.disintegrate, 6500)
        music.spooky.play()
        projectile.vy += 10
        mySprite.vx += 5
    }
    if (info.score() == 100) {
        game.over(true, effects.confetti)
    }
})
controller.A.onEvent(ControllerButtonEvent.Released, function () {
    projectile = sprites.createProjectileFromSprite(assets.image`Basketball`, mySprite, 0, -100)
    projectile.setFlag(SpriteFlag.DestroyOnWall, true)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Backboard, function (sprite, otherSprite) {
    mySprite.setStayInScreen(true)
    projectile.setBounceOnWall(true)
    sprites.destroyAllSpritesOfKind(SpriteKind.Projectile, effects.trail, 3300)
    music.knock.play()
    projectile.ay += 125
    projectile.ax += 35
    mySprite.vx += 1
})
let projectile: Sprite = null
let mySprite2: Sprite = null
let mySprite: Sprite = null
scene.setBackgroundImage(assets.image`Half-court`)
mySprite = sprites.create(assets.image`Player 1`, SpriteKind.Player)
mySprite.setVelocity(50, 0)
mySprite.setPosition(77, 62)
mySprite.setBounceOnWall(true)
let mySprite3 = sprites.create(assets.image`Backboard`, SpriteKind.Backboard)
mySprite3.setPosition(77, 7)
mySprite2 = sprites.create(assets.image`Hoop`, SpriteKind.Hoop)
mySprite2.setPosition(77, 12)
