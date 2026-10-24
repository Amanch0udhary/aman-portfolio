Add-Type -AssemblyName System.Drawing

$srcPath = "C:\Users\Admin\.gemini\antigravity-ide\brain\7ccb639c-3846-4c74-8dfa-52e73e1b64e8\.user_uploaded\media_1792785853841.png"
$bmp = New-Object System.Drawing.Bitmap($srcPath)

$w = $bmp.Width
$h = $bmp.Height
Write-Host "Source Width: $w, Height: $h"

# The image contains 3 cards horizontally.
# Let's inspect the cards:
# Total width $w is around 1000px, height $h is around 400-500px.
# Card 1 image: left ~ 3%, top ~ 4%, width ~ 30%, height ~ 50%
# Card 2 image: left ~ 35%, top ~ 4%, width ~ 30%, height ~ 50%
# Card 3 image: left ~ 67%, top ~ 4%, width ~ 30%, height ~ 50%

# Let's crop each card's image area cleanly:
# Let's find card borders or calculate precise bounding boxes:
# Card width: roughly ($w / 3)
$cardW = [int]($w * 0.305)
$cardH = [int]($h * 0.54)
$topY = [int]($h * 0.04)

$x1 = [int]($w * 0.035)
$x2 = [int]($w * 0.355)
$x3 = [int]($w * 0.675)

function CropAndSave($x, $y, $width, $height, $outPath) {
    $rect = New-Object System.Drawing.Rectangle($x, $y, $width, $height)
    $cropped = $bmp.Clone($rect, $bmp.PixelFormat)
    $cropped.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Jpeg)
    $cropped.Dispose()
    Write-Host "Saved $outPath"
}

CropAndSave $x1 $topY $cardW $cardH "assets/images/dance-drama.jpg"
CropAndSave $x2 $topY $cardW $cardH "assets/images/dance-folk.jpg"
CropAndSave $x3 $topY $cardW $cardH "assets/images/dance-crew.jpg"

$bmp.Dispose()
Write-Host "Done cropping dance images!"
