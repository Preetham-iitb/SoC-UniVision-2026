from fastapi import FastAPI, HTTPException, status
from pydantic import BaseModel, HttpUrl
from typing import List, Optional

app = FastAPI(title="Tiny Image-Analysis API")

# Input format
class ImageAnalysisRequest(BaseModel):
    image_url: HttpUrl
    tasks: List[str]
    min_confidence: Optional[float] = 0.5  # Defaults to 0.5 if not provided

# Format of response after each task
class AnalysisResult(BaseModel):
    task: str
    status: str
    detected_items: List[str]
    confidence_scores: List[float]

# Final output format
class ImageAnalysisResponse(BaseModel):
    success: bool
    image_url: str
    results: List[AnalysisResult]

# app.post is decorator which makes analyze_image function the one executed when
# called with url /api/analyze-image
@app.post(
    "/api/analyze-image", 
    response_model=ImageAnalysisResponse,
    status_code=status.HTTP_200_OK
)
async def analyze_image(payload: ImageAnalysisRequest):
    # Input validation happens automatically here via pydantic
    # If the payload is wrong, FastAPI automatically throws a 422 Unprocessable Entity error
    
    # Running the logic
    supported_tasks = ["detect_objects", "ocr"]
    analysis_results = []
    
    for task in payload.tasks:
        if task not in supported_tasks:
            # Custom validation error for unsupported operations
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Unsupported task: '{task}'. Supported tasks are {supported_tasks}."
            )
        
        # Simulate processing output
        if task == "detect_objects":
            analysis_results.append({
                "task": task,
                "status": "completed",
                "detected_items": ["laptop", "coffee_cup"],
                "confidence_scores": [0.92, 0.88]
            })
        elif task == "ocr":
            analysis_results.append({
                "task": task,
                "status": "completed",
                "detected_items": ["Text found: 'Hello World'"],
                "confidence_scores": [0.99]
            })

    # Return a structured response matching the contract
    return {
        "success": True,
        "image_url": str(payload.image_url),
        "results": analysis_results
    }

"""
Example input JSON:
{
  "image_url": "https://example.com/images/office-desk.jpg",
  "tasks": [
    "detect_objects",
    "find_me"
  ],
  "min_confidence": 0.75
}

Example output JSON:
{
    "success": true,
    "image_url": "https://example.com/images/office-desk.jpg",
    "results": [
        {
            "task": "detect_objects",
            "status": "completed",
            "detected_items": [
                "laptop",
                "coffee_cup"
            ],
            "confidence_scores": [
                0.92,
                0.88
            ]
        },
        {
            "task": "ocr",
            "status": "completed",
            "detected_items": [
                "Text found: 'Hello World'"
            ],
            "confidence_scores": [
                0.99
            ]
        }
    ]
}

Example error JSON:
{
    "detail": "Unsupported task: 'find_me'. Supported tasks are ['detect_objects', 'ocr']."
}
"""
