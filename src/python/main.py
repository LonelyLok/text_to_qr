import qrcode
import sys
from io import BytesIO
from PIL import Image

def generate_qr_code(text, fixed_size=200):
    qr = qrcode.QRCode(
    version=1,  # controls the size of the QR Code
    error_correction=qrcode.constants.ERROR_CORRECT_L,
    box_size=10,  # size of each box in the QR code grid
    border=4,  # thickness of the border (minimum is 4)
)
    qr.add_data(text)
    qr.make(fit=True)

    # Create an image of the QR code
    img = qr.make_image(fill_color="black", back_color="white")
    img = img.resize((fixed_size, fixed_size), Image.LANCZOS)
    buffer = BytesIO()
    img.save(buffer, format="PNG")
    buffer.seek(0)
    return buffer.getvalue()

if __name__ == "__main__":
    text = sys.argv[1]
    qr_binary = generate_qr_code(text)
    sys.stdout.buffer.write(qr_binary)
