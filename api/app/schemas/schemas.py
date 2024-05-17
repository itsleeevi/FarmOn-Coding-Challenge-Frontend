import typing as t

import pymongo
from beanie import Document
from pydantic import BaseModel, field_validator, validator
from pymongo import IndexModel
from typing import List, Optional
from datetime import date, datetime


class Geometry(BaseModel):
    type: str
    coordinates: t.Any


class Parcel(BaseModel):
    objectid: int
    area: float
    crop_type: str
    geometry: Geometry


class ParcelDB(Document, Parcel):
    class Settings:
        name = "Parcel"
        indexes = [
            IndexModel([("objectid", pymongo.ASCENDING)], unique=True),
            IndexModel([("area", pymongo.ASCENDING)]),
            IndexModel([("crop_type", pymongo.ASCENDING)]),
            IndexModel([("geometry", pymongo.GEOSPHERE)]),
        ]


class Geometry(BaseModel):
    coordinates: List
    type: str


class Feature(BaseModel):
    type: str
    properties: dict
    geometry: Geometry


class DailyData(BaseModel):
    Date: date
    NDVI: Optional[float]
    NDVI_Interpolated: Optional[float]
    Covered: Optional[bool]
    Crop: Optional[str]

    @field_validator("Date", mode="before")
    def parse_date(cls, value):
        return (
            datetime.strptime(value, "%Y-%m-%d").date()
            if isinstance(value, str)
            else value
        )


class ParcelResponse(BaseModel):
    parcel_id: int
    parcel_name: str
    parcel_owner: str
    parcel_area: float
    parcel_area_unit: str
    parcel_location: Feature
    parcel_geometry: Feature
    parcel_daily_data: List[DailyData]


class Message(BaseModel):
    message: str
