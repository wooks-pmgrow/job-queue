/* eslint-disable no-console */
const { handlerFailure, handlerCompleted, handlerStalled } = require('./handler')
const { connectQueue } = require('./config')
const fs = require('fs')
const path = require('path')
const util = require('util')

const nameQueue = 'audio'
const cases = connectQueue(nameQueue)
/*
  @description initial all job queue
*/

const processJob = (job, done) => {
    try {
        console.info(`running job! with id ${job.id}`)
        const obj = JSON.parse(fs.readFileSync(path.join("countries.json"), "utf8"));
        console.info('obj ' + util.inspect(obj, {depth: null}));
        const data = obj.find(item => {
            return item.code == job.data.param
        })
        console.info('data ' + util.inspect(data, {depth: -1}));
        fs.writeFile(`${job.data.param}.json`, JSON.stringify(data), function (err) {
            if (err) throw err;
        }
        );
        done(null, 'success')
    } catch (error) {
        done(null, error)
    }
}

const initJob = () => {
    console.info('job is working!');
    cases.process('transcode', processJob);
    cases.on('failed', handlerFailure);
    cases.on('completed', handlerCompleted);
    cases.on('stalled', handlerStalled);
}

initJob()
