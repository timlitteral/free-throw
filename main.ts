namespace SpriteKind {
    export const Hoop = SpriteKind.create()
}

sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Hoop, function on_on_overlap(sprite: Sprite, otherSprite: Sprite) {
    game.over(true, effects.confetti)
})
controller.A.onEvent(ControllerButtonEvent.Released, function on_a_released() {
    
    projectile = sprites.createProjectileFromSprite(assets.image`
        Basketball
    `, mySprite, 0, -100)
})
let projectile : Sprite = null
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
let mySprite2 = sprites.create(assets.image`
    Hoop
`, SpriteKind.Hoop)
mySprite2.setPosition(77, 9)
