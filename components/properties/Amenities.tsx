import { Amenity } from '@/utils/amenities';
import { LuFolderCheck } from 'react-icons/lu';
import Title from './Title';

function Amenities({ amenities }: { amenities: string }) {
    // the value of the amenities prop is a string stored in the database
    // so we need to parse it to an array of Amenity objects
    const amenitiesList: Amenity[] = JSON.parse(amenities as string);
    // if any amenity has selected = true, then this will be false,
    // since the every method will return false if any of the elements
    // in the array does not meet the condition
    const noAmenities = amenitiesList.every((amenity) => !amenity.selected);

    if (noAmenities) {
        return null;
    }
    return (
        <div className='mt-4'>
            <Title text='What this place offers' />
            <div className='grid md:grid-cols-2 gap-x-4'>
                {amenitiesList.map((amenity) => {
                    if (!amenity.selected) {
                        return null;
                    }
                    return (
                        <div
                            key={amenity.name}
                            className='flex items-center gap-x-4 mb-2 '
                        >
                            <LuFolderCheck className='h-6 w-6 text-primary' />
                            <span className='font-light text-sm capitalize'>
                                {amenity.name}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
export default Amenities;
