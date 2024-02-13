import fs from "fs";
import winston from "winston";
const fsPromise = fs.promises;

// async function log (logData){



//     logData = `${new Date().toString()} - ${logData} \n`;
//     try{
//         await fsPromise.appendFile('log.txt', logData);
//     }catch(err){
//         console.log(err);
//     }
// }

const logger = winston.createLogger({
    level:'info',
    format:winston.format.json(),
    defaultMeta:{
        service:'request-logging'
    },
    transports:[
        new winston.transports.File({filename:'logs.txt'})
    ]
});

const loggerMiddleware =  async (req, res,next)=>{
    if(!req.url.includes('signin')){
    const logData = `${new Date().toString()}-${req.url} - ${JSON.stringify(req.body)}`;
    // await log(logData);
    logger.info(logData);
    }
    next();
};

export default loggerMiddleware;

