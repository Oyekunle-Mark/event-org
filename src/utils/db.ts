import mongoose from 'mongoose';

export default (url: string): Promise<typeof mongoose> => mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
})
