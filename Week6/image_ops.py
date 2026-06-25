import cv2
import numpy as np
from typing import Tuple, Optional

def load_image(filepath: str) -> Optional[np.ndarray]:
    image = cv2.imread(filepath)
    if image is None:
        print(f"Error: Could not load image from {filepath}")
        return None
    return image

def inspect_shape(image: np.ndarray) -> Tuple[int, int, int]:
    shape = image.shape
    height, width = shape[0], shape[1]
    channels = shape[2] if len(shape) > 2 else 1
    return height, width, channels

def resize_image(image: np.ndarray, target_size: Tuple[int, int]) -> np.ndarray:
    return cv2.resize(image, target_size)

def convert_to_grayscale(image: np.ndarray) -> np.ndarray:
    # OpenCV loads images in BGR format by default, not RGB
    return cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

def crop_image(image: np.ndarray, y_start: int, y_end: int, x_start: int, x_end: int) -> np.ndarray:
    return image[y_start:y_end, x_start:x_end]

def normalize_image(image: np.ndarray) -> np.ndarray:
    return image.astype(np.float32) / 255.0

def save_image(filepath: str, image: np.ndarray) -> bool:
    return cv2.imwrite(filepath, image)