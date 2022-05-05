namespace SpriteKind {
    export const Hoop = SpriteKind.create()
    export const Stage = SpriteKind.create()
}

controller.B.onEvent(ControllerButtonEvent.Pressed, function on_b_pressed() {
    animation.runImageAnimation(mySprite, [img`
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
            `, img`
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
            `, img`
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
            `], 800, false)
    if (controller.B.isPressed()) {
        mySprite.sayText(":P", 500, true)
        if (controller.B.isPressed()) {
            music.playMelody("G F C G F C C5 C5 ", 274)
        }
        
    }
    
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Hoop, function on_on_overlap(sprite: Sprite, otherSprite: Sprite) {
    mySprite2.startEffect(effects.halo, 200)
    music.pewPew.play()
    projectile.destroy()
    info.changeScoreBy(1)
    if (info.player1.score() > 55) {
        mySprite2.startEffect(effects.fire, 2000)
        music.pewPew.play()
    }
    
    if (info.player1.score() > 75) {
        mySprite2.startEffect(effects.ashes, 5000)
        music.zapped.play()
    }
    
    if (info.player1.score() > 90) {
        mySprite2.startEffect(effects.disintegrate, 5000)
        music.spooky.play()
    }
    
    if (info.score() == 100) {
        game.over(true, effects.confetti)
    }
    
})
controller.A.onEvent(ControllerButtonEvent.Released, function on_a_released() {
    
    projectile = sprites.createProjectileFromSprite(assets.image`
        Basketball
    `, mySprite, 0, -100)
    projectile.setFlag(SpriteFlag.DestroyOnWall, true)
})
let projectile : Sprite = null
let mySprite2 : Sprite = null
let mySprite : Sprite = null
scene.setBackgroundImage(assets.image`
    Half-court
`)
mySprite = sprites.create(assets.image`
    Player 1
`, SpriteKind.Player)
mySprite.setVelocity(50, 0)
mySprite.setPosition(77, 62)
mySprite.setBounceOnWall(true)
mySprite2 = sprites.create(assets.image`
    Hoop
`, SpriteKind.Hoop)
mySprite2.setPosition(77, 9)
