/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { getImageRefuelingByIDRequest } from '../../../api/images';

export function ImageDisplay() {
    const [imageSrc, setImageSrc] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchImage = async () => {
            try {
                //
            } catch (error) {
                //
            }
        };
    });
}
