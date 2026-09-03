import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

let limiter = null;

function getLimiter(){
    if(limiter) return limiter;

    if(!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN){
        return null;
    }

    limiter = new Ratelimit({
        redis: Redis.fromEnv(),
        limiter: Ratelimit.slidingWindow(5,"1 m"),
        prefix: "statistici",
        analytics: false,
    });

    return limiter;
}

export async function VerificaRateLimit(identificator) {
    try{
        const rateLimit = getLimiter();
        
        if(!rateLimit) return true;

        const {success} = await rateLimit.limit(identificator);
        return success;
    }catch(err){
        console.error("Eroare VerificaRateLimit: ",err);
        return true;
    }
}
