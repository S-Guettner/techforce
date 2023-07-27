import { generateComponents } from '@uploadthing/react';

import type { OurFileRouter } from '../api/fileUpload/core';

export const { UploadButton, UploadDropzone, Uploader } = generateComponents<OurFileRouter>();
