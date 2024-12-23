import Location from "../models/location.js";

// create new location
export const save = async (newLocation) => {
    const alreadyPresent = await findLocationById(newLocation?.id);
    if (!alreadyPresent) {
        const location = new Location(newLocation)
        return await location.save()
    }
    else {
        throw new Error("Location already present");
    }
}

// find all locations
export const getAll = async () => {
    return await Location.find();
}

// fetch by id
export const getById = async (id) => {
    const location = await findLocationById(id);
    if (!location) {
        throw new Error("Location not found");
    }
    return location;
};

// Update by id
export const update = async (id, updatedData) => {
    const location = await findLocationById(id);
    if (location.length === 0) {
        throw new Error("Location not found");
    }

    updatedData.modifiedDate = Date.now();
    // Update location with the new data
    return await Location.findByIdAndUpdate(id, updatedData, { new: true, runValidators: true });
};

// Delete a location by ID
export const deleteLocationById = async (id) => {
    const location = await Location.findByIdAndDelete(id);
    if (!location) {
        throw new Error("Location not found");
    }
    return location;
}


// Since fetch by id is used multiple times a common function
const findLocationById = async (id) => {
    const location = await Location.findById(id);
    return location;
}