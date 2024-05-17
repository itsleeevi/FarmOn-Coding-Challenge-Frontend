import json
import typing as t

from app.schemas.schemas import Parcel, ParcelDB, ParcelResponse, Message
from fastapi import APIRouter, Query, HTTPException, Path
from shapely.geometry import mapping, shape

router = APIRouter(
    prefix="/parcels",
    tags=["Parcels"],
)


def validate_and_correct_geometry(geometry):
    shapely_geom = shape(dict(geometry))  # Convert to Shapely geometry
    if not shapely_geom.is_valid:
        corrected_geom = shapely_geom.buffer(0)
        return mapping(corrected_geom)  # Convert back to GeoJSON-like dict
    else:
        return geometry


@router.post("/add_parcels")
async def add_parcels(parcels: t.Union[Parcel, t.List[Parcel]]) -> t.List[str]:
    if len(parcels) > 50:
        return [
            "Too many parcels to add at once. Please add 50 or fewer parcels at a time."
        ]
    success = []
    if not isinstance(parcels, list):
        parcels = [parcels]
    for parcel in parcels:
        parcel.geometry = validate_and_correct_geometry(parcel.geometry)
        existing_doc = await ParcelDB.find_one(ParcelDB.objectid == parcel.objectid)
        if not existing_doc:
            try:
                await ParcelDB(
                    **parcel.model_dump()
                ).insert()  # Ensure to convert Pydantic model to dict
                success.append("Parcel added")
            except Exception as e:
                success.append(f"Error: {e}")
        else:
            success.append("Parcel already exists")
    return success


@router.get("/find_parcel_by_location")
async def find_parcel_by_location(
    latitude: float = Query(...),
    longitude: float = Query(...),
    crs: str = Query("EPSG:4326"),
) -> Parcel:
    pass


@router.get(
    "/{parcel_id}", response_model=ParcelResponse, responses={404: {"model": Message}}
)
async def get_parcel(
    parcel_id: str = Path(..., description="An id representing a parcel"),
) -> t.Union[Parcel, str]:
    async def load_data():
        try:
            with open("./parcels_data.json", "r") as f:
                parcels = json.load(f)
                return parcels
        except FileNotFoundError:
            raise HTTPException(status_code=500, detail="Parcels data not found.")

    try:
        parcels = await load_data()
        parcel = next(
            (
                parcel
                for parcel in parcels
                if str(parcel["parcel_id"]) == str(parcel_id)
            ),
            None,
        )
        if parcel:
            return parcel
        else:
            raise HTTPException(status_code=404, detail="Parcel not found")
    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail="Error decoding parcels data file")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error: {e}")
