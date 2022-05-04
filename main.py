@namespace
class SpriteKind:
    Hoop = SpriteKind.create()

def on_on_overlap(sprite, otherSprite):
    game.over(True, effects.confetti)
sprites.on_overlap(SpriteKind.projectile, SpriteKind.Hoop, on_on_overlap)

def on_a_released():
    global projectile
    projectile = sprites.create_projectile_from_sprite(assets.image("""
        Basketball
    """), mySprite, 0, -100)
controller.A.on_event(ControllerButtonEvent.RELEASED, on_a_released)

projectile: Sprite = None
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