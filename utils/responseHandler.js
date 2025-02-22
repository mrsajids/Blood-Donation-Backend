// Utility function to send all response in json
const sendResponse = (res, statuscode, responsemessage, data = null) => {
  const response = {
    statuscode,
    responsemessage,
    data,
  };
  res.status(statuscode).json(response);
};

// Utility function to parse the database response
const parseDbResponse = (dbResponse) => {
  const [statuscode, message] = dbResponse[0].inoutresponse.split("#");
  return { statuscode: parseInt(statuscode, 10), message };
};

module.exports = { sendResponse, parseDbResponse };
