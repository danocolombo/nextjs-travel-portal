import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

function ImageInput() {
    // THIS IS FORM COMPONENTS TO UPLOAD AN IMAGE....
    // can pass in props for name and label, if desired, but we know
    // this will be file input for image, so we just define it here
    // and set the name to 'image'
    // also, zod checks for required fields, but we validate here
    // for clarity
    const name = 'image';
    return (
        <div className='mb-2'>
            <Label htmlFor={name} className='capitalize'>
                Image
            </Label>
            <Input
                id={name}
                name={name}
                type='file'
                required
                accept='image/*'
                className='max-w-xs'
            />
        </div>
    );
}
export default ImageInput;
