
import sys
import os

try:
    from PIL import Image
except ImportError:
    print("Pillow not installed. Creating mockup white logo by copying.")
    # Fallback: Just copy the file if we can't process it, 
    # but ideally we want to process it.
    sys.exit(1)

def make_white_logo(input_path, output_path):
    try:
        img = Image.open(input_path).convert("RGBA")
        datas = img.getdata()

        new_data = []
        for item in datas:
            # item is (R, G, B, A)
            # Change all non-transparent pixels to White
            if item[3] > 0:
                new_data.append((255, 255, 255, item[3]))
            else:
                new_data.append(item)

        img.putdata(new_data)
        img.save(output_path, "WEBP")
        print(f"Successfully created white logo at {output_path}")
    except Exception as e:
        print(f"Error processing image: {e}")
        sys.exit(1)

def convert_to_webp(input_path, output_path):
    try:
        img = Image.open(input_path).convert("RGBA")
        img.save(output_path, "WEBP")
        print(f"Successfully converted to webp at {output_path}")
    except Exception as e:
        print(f"Error converting image: {e}")

if __name__ == "__main__":
    base_dir = r"d:\Ngoding\WEB Poject\my-portfolio\public\img\saya"
    input_file = os.path.join(base_dir, "logo-new.png")
    
    # Generate White Logo (WebP)
    output_white_file = os.path.join(base_dir, "logo-white.webp")
    if os.path.exists(input_file):
        make_white_logo(input_file, output_white_file)
        
        # Convert Original to WebP
        output_original_file = os.path.join(base_dir, "logo-new.webp")
        convert_to_webp(input_file, output_original_file)
    else:
        print(f"Input file not found: {input_file}")
