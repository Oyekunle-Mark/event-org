import mongoose from 'mongoose';

export const connect = (url: string) => mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
