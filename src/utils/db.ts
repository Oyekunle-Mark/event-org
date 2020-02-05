import mongoose from 'mongoose';

export const connect = (url: string): Promise<typeof mongoose> => mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
