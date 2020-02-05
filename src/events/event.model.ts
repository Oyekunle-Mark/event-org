import mongoose from 'mongoose';

type EventDocument = mongoose.Document & {
    creator: string;
    title: string;
    description: Date;
    venue: string;
    isFree: boolean;
    daysActive: Date[];
}

const eventSchema = new mongoose.Schema({
    creator: {
        type: String,
        required: true,
        minlength: 4,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    venue: {
        type: String,
        required: true,
    },
    isFree: {
        type: Boolean,
        required: true,
    },
    daysActive: [{
        type: Date,
    }]
})

export const Events = mongoose.model<EventDocument>("Event", eventSchema);
