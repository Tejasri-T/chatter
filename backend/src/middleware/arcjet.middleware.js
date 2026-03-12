import aj from "../lib/arcjet.js";
import { isSpoofedBot } from "@arcjet/inspect";

export const arcjetProtection = async (req, res, next) => {
    try {
        const decision = await aj.protect(req);

        if (decision.isDenied()) {
            if (decision.reason.isRateLimit()) {
                return res.status(429).json({ message: "Too many requests. Please try again later." });
            } else if (decision.reason.isBot()) {
                return res.status(403).json({ message: "Bots are not allowed.Try again when you are a human." });

            }else {
                return res.status(403).json({ message: "Request denied by security policy." });
            }

        }

        //check for spoofed bot
        if (decision.results.some(isSpoofedBot)) {
            return res.status(403).json({ 
                error: "Spoofed bot detected and blocked.",
                message: "Request denied by security policy."
            });

        }

        next();

    }catch (error) {
        console.error("Error in Arcjet protection middleware", { error });
        // return res.status(500).json({ message: "Server error" });
        next();
    }
};