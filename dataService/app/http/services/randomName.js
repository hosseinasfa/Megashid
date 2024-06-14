const createRandomName = () => {
    return 'connection_' + Math.random().toString(36).substring(2, 9);
  };
  
  module.exports = { createRandomName };