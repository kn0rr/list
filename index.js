#!/usr/bin/env node

const fs= require('fs');
const util= require('util');
const chalk = require('chalk');
const path = require('path');

//Method two
//const lstat=util.promisify(fs.lstat);

//Method three

const {lstat}=fs.promises;

const targetDir=process.argv[2]|| process.cwd();

fs.readdir(targetDir, async (err, filenames)=>{
    if(err){
        throw new Error(err);
    }

    const statPromises= filenames.map(filename=>{
        return lstat(path.join(targetDir,filename));
    });
    const allStats= await Promise.all(statPromises);

    for (let stats of allStats){
        const index=allStats.indexOf(stats);
        
        stats.isFile()?console.log(filenames[index]):console.log(chalk.blue(filenames[index]));
    }

});


//Method one
/* const lstat=(filename) =>{
    return new Promise ((resolve,reject)=>{
        fs.lstat(filename, (err,stats)=>{
            if (err){
                reject(err);
            }
            resolve(stats);
        })
    });
} */