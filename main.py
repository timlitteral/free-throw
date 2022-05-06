@namespace
class SpriteKind:
    Hoop = SpriteKind.create()
    Stage = SpriteKind.create()
    Backboard = SpriteKind.create()

def on_b_pressed():
    
    def on_throttle():
        animation.run_movement_animation(mySprite,
            animation.animation_presets(animation.bobbing),
            2000,
            False)
        music.zapped.play_until_done()
        animation.run_image_animation(mySprite, assets.animation("""
            Movement
        """), 200, True)
        animation.run_movement_animation(mySprite,
            animation.animation_presets(animation.fly_to_center),
            450,
            False)
        statusbar.value += -100
    timer.throttle("action", 12000, on_throttle)
    
controller.B.on_event(ControllerButtonEvent.PRESSED, on_b_pressed)

def on_on_overlap(sprite, otherSprite):
    mySprite2.start_effect(effects.halo, 200)
    music.pew_pew.play()
    projectile.destroy()
    info.change_score_by(1)
    if info.player1.score() > 55:
        mySprite2.start_effect(effects.fire, 2000)
        mySprite.vx += 10
    if info.player1.score() > 75:
        mySprite2.start_effect(effects.ashes, 5000)
        mySprite.vx += 10
    if info.player1.score() > 90:
        mySprite2.start_effect(effects.warm_radial, 6500)
        music.spooky.play()
        projectile.vy += 10
        mySprite.vx += 10
    if info.score() >= 100:
        game.over(True, effects.confetti)
sprites.on_overlap(SpriteKind.projectile, SpriteKind.Hoop, on_on_overlap)

def on_a_released():
    global projectile
    projectile = sprites.create_projectile_from_sprite(assets.image("""
        Basketball
    """), mySprite, 0, -100)
    music.footstep.play()
    projectile.set_flag(SpriteFlag.DESTROY_ON_WALL, True)
controller.A.on_event(ControllerButtonEvent.RELEASED, on_a_released)

def on_down_pressed():
    mySprite.say_text(":P", 500, True)
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
    music.play_melody("G F C G F C C5 C5 ", 274)
    animation.run_image_animation(mySprite, assets.animation("""
        Movement
    """), 200, True)
controller.down.on_event(ControllerButtonEvent.PRESSED, on_down_pressed)

def on_on_overlap2(sprite2, otherSprite2):
    projectile.set_stay_in_screen(True)
    projectile.set_bounce_on_wall(True)
    sprites.destroy_all_sprites_of_kind(SpriteKind.projectile, effects.trail, 3300)
    music.knock.play()
    scene.camera_shake(4, 100)
    projectile.ay += 125
    projectile.ax += 65
sprites.on_overlap(SpriteKind.projectile, SpriteKind.Backboard, on_on_overlap2)

projectile: Sprite = None
statusbar: StatusBarSprite = None
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
animation.run_image_animation(mySprite, assets.animation("""
    Movement
"""), 200, True)
mySprite3 = sprites.create(assets.image("""
    Backboard
"""), SpriteKind.Backboard)
mySprite3.set_position(77, 7)
mySprite2 = sprites.create(assets.image("""
    Hoop
"""), SpriteKind.Hoop)
mySprite2.set_position(77, 12)
statusbar = statusbars.create(8, 1, StatusBarKind.energy)
statusbar.attach_to_sprite(mySprite, -20, 0)
statusbar.set_status_bar_flag(StatusBarFlag.SMOOTH_TRANSITION, True)
statusbar.set_color(5, 0)
statusbar.max = 100
seconds = 10000
game.set_dialog_frame(assets.image("""
    timer
"""))
game.set_dialog_cursor(img("""
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
"""))
game.set_dialog_text_color(2)
game.show_long_text(seconds, DialogLayout.BOTTOM)

def on_forever():
    pause(500)
    statusbar.value += 5
forever(on_forever)
