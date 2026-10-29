# Telegram bridge demo video

53 s, 1920x1080, no voice, captions on screen. Shows how Telegram works with
OpenSource Everything: Telegram login, a bridged group (two chats, one
conversation), a live card that opens our app, one-to-one through our bot, and
the bot holding a stock-tip scam.

    python3 videos/telegram-bridge/sound.py /tmp/bed.wav
    ffmpeg -i /tmp/bed.wav -af loudnorm=I=-16:TP=-1.5:LRA=11 -ar 44100 /tmp/bed16.wav
    node videos/render.cjs videos/telegram-bridge/scene.html videos/telegram-bridge/out/telegram-bridge.mp4 \
      --fps 30 --width 1920 --height 1080 --audio /tmp/bed16.wav

Sample people. Telegram's side is a generic chat look, never its logo.
