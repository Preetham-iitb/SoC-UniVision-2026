from image_ops import *

def main():
    # Setup paths (Assuming you have an image named 'sample.jpg' in your root folder)
    input_path = "sample.png"
    output_gray_path = "output_grayscale.jpg"
    output_crop_path = "output_cropped.jpg"

    print("Learning OpenCV")

    img = load_image(input_path)
    if img is None:
        return

    h, w, c = inspect_shape(img)
    print(f"Original Image Shape: Height={h}, Width={w}, Channels={c}")

    resized_img = resize_image(img, target_size=(640, 640))
    print(f"Resized Image Shape: {resized_img.shape}")

    gray_img = convert_to_grayscale(resized_img)
    print(f"Grayscale Image Shape: {gray_img.shape} (no. of channels reduced if image was bgr)")
    
    save_image(output_gray_path, gray_img)

    # Cropping Image (Selecting a 200x200 region of interest from the center)
    cropped_img = crop_image(gray_img, y_start=220, y_end=420, x_start=220, x_end=420)
    print(f"Cropped Image Shape: {cropped_img.shape}")
    save_image(output_crop_path, cropped_img)

    normalized_img = normalize_image(cropped_img)
    print(f"Normalized Pixel Values Range: Min={normalized_img.min()}, Max={normalized_img.max()}")
    
    print("\nExecution complete")

if __name__ == "__main__":
    main()