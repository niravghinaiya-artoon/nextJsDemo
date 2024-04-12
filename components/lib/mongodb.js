import mongoose from 'mongoose';

export async function connectToDatabase() {
    try {
        await mongoose.connect(process.env.MONGODB_URL).then(() => console.log('connect To Database'))
    } catch (error) {
        console.log('error', error)
    }
}