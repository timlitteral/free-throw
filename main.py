@namespace
class SpriteKind:
    Hoop = SpriteKind.create()
    Stage = SpriteKind.create()

def on_b_pressed():
    animation.run_image_animation(mySprite,
        [img("""
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
            """),
            img("""
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
            """),
            img("""
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
            """)],
        800,
        False)
    if controller.B.is_pressed():
        mySprite.say_text(":P", 500, True)
        if controller.B.is_pressed():
            music.play_melody("G F C G F C C5 C5 ", 274)
controller.B.on_event(ControllerButtonEvent.PRESSED, on_b_pressed)

def on_on_overlap(sprite, otherSprite):
    mySprite2.start_effect(effects.halo, 200)
    music.pew_pew.play()
    projectile.destroy()
    info.change_score_by(1)
    if info.player1.score() > 55:
        mySprite2.start_effect(effects.fire, 2000)
        music.pew_pew.play()
    if info.player1.score() > 75:
        mySprite2.start_effect(effects.ashes, 5000)
        music.zapped.play()
    if info.player1.score() > 90:
        mySprite2.start_effect(effects.disintegrate, 5000)
        music.spooky.play()
    if info.score() == 100:
        game.over(True, effects.confetti)
sprites.on_overlap(SpriteKind.projectile, SpriteKind.Hoop, on_on_overlap)

def on_a_released():
    global projectile
    projectile = sprites.create_projectile_from_sprite(assets.image("""
        Basketball
    """), mySprite, 0, -100)
    projectile.set_flag(SpriteFlag.DESTROY_ON_WALL, True)
controller.A.on_event(ControllerButtonEvent.RELEASED, on_a_released)

projectile: Sprite = None
mySprite2: Sprite = None
mySprite: Sprite = None
scene.set_background_image(assets.image("""
    Half-court
"""))
mySprite = sprites.create(assets.image("""
    Player 1
"""), SpriteKind.player)
mySprite.set_velocity(50, 0)
mySprite.set_position(77, 62)
mySprite.set_bounce_on_wall(True)
mySprite2 = sprites.create(assets.image("""
    Hoop
"""), SpriteKind.Hoop)
mySprite2.set_position(77, 9)