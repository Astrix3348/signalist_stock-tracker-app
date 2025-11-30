import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

declare global {
    var mongooseCache: {
        conn : typeof mongoose | null;
        promise: Promise<typeof mongoose> | null;
        
    }
}

let cached = global.mongooseCache;


if(!cached){
    cached = global.mongooseCache = {conn : null, promise: null};
}

export const connectToDatabase = async () => {
    if(!MONGODB_URI) throw new Error("MongoDB URI must be set within .env");
    // we do all this to remove any duplicate connections and it is very important as next js runs the code again and again when there is a change.

    //this function stores the connection in global cache.

    if(cached.conn) return cached.conn;  //if a connection exists this returns it immediately
    
    if(!cached.promise) { // if connection does not exists then it creates a new connection and saves it in the cache.
        cached.promise = mongoose.connect(MONGODB_URI, { bufferCommands: false });
    }
    
    try{
        cached.conn = await cached.promise;
    } catch(err){ //if connection fails it retries.
        cached.promise = null;
        throw err;
    }
    console.log(`connected to database ${process.env.NODE_ENV} - ${MONGODB_URI}`);
    
    return cached.conn;
}