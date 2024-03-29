import { createUploadthing, type FileRouter } from 'uploadthing/next';

const f = createUploadthing();

const auth = (req: Request) => ({ id: 'fakeId' }); // Fake auth function

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
    // Define as many FileRoutes as you like, each with a unique routeSlug
    pdfUploader: f({ pdf: { maxFileSize: '4MB' } }).onUploadComplete(async ({ metadata, file }) => {
        // This code RUNS ON YOUR SERVER after upload
        console.log('file url', file.url);
    }),
    companyImageUploader: f({ image: { maxFileSize: '2MB' } }).onUploadComplete(async ({ metadata, file }) => {
        // This code RUNS ON YOUR SERVER after upload
        console.log('image file url', file.url);
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
