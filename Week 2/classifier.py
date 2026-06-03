from typing import List, Dict


def classify_predictions( predictions: List[Dict], threshold: float) -> Dict[str, List[Dict]]:
    accepted = []
    rejected = []

    for prediction in predictions:

        if prediction["confidence"] >= threshold:
            accepted.append(prediction)
        else:
            rejected.append(prediction)

    return {
        "accepted": accepted,
        "rejected": rejected
    }

detections = [
    {"label": "person", "confidence": 0.95},
    {"label": "dog", "confidence": 0.82},
    {"label": "cat", "confidence": 0.41},
    {"label": "car", "confidence": 0.67},
    {"label": "bicycle", "confidence": 0.29}
]

result = classify_predictions(detections, 0.70)

print("Accepted Detections:")
for item in result["accepted"]:
    print(item)

print("\nRejected Detections:")
for item in result["rejected"]:
    print(item)