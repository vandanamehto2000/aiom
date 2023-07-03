const cron = require('node-cron');
const { facebook_get_Insights } = require('../platform/facebook');


// Create a function to save a chunk of data to the database
async function saveDataToDatabase(data, startIndex, endIndex) {
  try {
 

    // Get the chunk of data to be saved
    const dataChunk = data.slice(startIndex, endIndex);

    // Insert the data into the collection
    await collection.insertMany(dataChunk);

    console.log(`Data saved to the database. Chunk ${startIndex + 1}-${endIndex}`);


    // Stop the cron job after all the data is saved
    if (endIndex >= data.length) {
      job.stop();
      console.log('All data has been saved. Cron job stopped.');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

const chunkSize = 100;

// function to process the next chunk of data
async function processNextChunk(data, startIndex, endIndex) {
  console.log(`Processing data chunk ${startIndex + 1}-${endIndex}...`);
  await saveDataToDatabase(data, startIndex, endIndex);

  // Update the start and end indexes for the next chunk
  startIndex = endIndex;
  endIndex = Math.min(endIndex + chunkSize, data.length);

  // Schedule the next chunk if there are more chunks remaining
  if (endIndex < data.length) {
    setTimeout(() => {
      processNextChunk(data, startIndex, endIndex);
    }, 1000); // Delay the execution by 1 second
  }
}


async function startCronJob(allData) {
    // cron job to run every hour
    const job = cron.schedule('0 * * * *', () => {
      console.log('Running the cron job...');
  
      if (allData && allData.length > 0) {
        const startIndex = 0;
        const endIndex = Math.min(chunkSize, allData.length);
        processNextChunk(allData, startIndex, endIndex);
      } else {
        console.log('No data available to process.');
      }
    });
  }
  
  // Export the cron job function
  module.exports = startCronJob;
