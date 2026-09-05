Current delivery uses the original client video (`agl_hero_vid.mp4`) and original images, restored at the client’s request. The `optimized/` files are retained as optional alternatives and are not imported by the current website. Self-hosted fonts remain active.

Original client media is retained here for future editing. Only assets imported by
the application are emitted into the production build. The unused older video
`hero_video_agl.mp4` is not shipped.

`optimized/` contains delivery copies generated from `agl_hero_vid.mp4` and the
images referenced by the application. Both video variants retain the complete
clip, use H.264, 24 fps, no audio, and MP4 fast-start metadata. Desktop is 1280 px
wide; mobile is 640 px. The original files are never overwritten.

Regenerate with `python scripts/optimize-media.py` after installing Pillow and
imageio-ffmpeg. The script also updates source imports when a smaller image copy
is available, and writes the byte comparison to `reports/media-optimization.json`.

`fonts/` contains the existing Manrope, Inter and Space Grotesk Latin variable
fonts, downloaded from Google Fonts. Their SIL Open Font Licenses are included.
Run `python scripts/download-fonts.py` to refresh these assets.
