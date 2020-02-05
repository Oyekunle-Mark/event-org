import mongoose from 'mongoose';

type EventDocument = mongoose.Document & {
    creator: string;
    title: string;
    description: Date;
    venue: string;
    free: boolean;
    daysActive: Date[];
}
