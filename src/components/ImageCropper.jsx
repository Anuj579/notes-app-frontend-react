import React, { useRef } from 'react';
import { Cropper } from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import { Button } from './ui/button';
import { Crop } from 'lucide-react';

function ImageCropper({ image, onCrop, onClose }) {
    const cropperRef = useRef(null);

    const handleCrop = () => {
        const cropper = cropperRef.current?.cropper;
        if (cropper) {
            const croppedImage = cropper.getCroppedCanvas().toDataURL();
            onCrop(croppedImage);
            onClose();
        }
    };

    return (
        <div>
            <Cropper
                src={image}
                style={{ height: 400, width: '100%' }}
                aspectRatio={1}
                viewMode={1}
                background={false}
                guides={false}
                ref={cropperRef}
                zoomable={true}
                scalable={true}
            />
            <div className="flex justify-end mt-4">
                <Button onClick={handleCrop}>
                    <Crop className='h-4 w-4 mr-2' />
                    Crop & Save
                </Button>
            </div>
        </div>
    );
}

export default ImageCropper;
