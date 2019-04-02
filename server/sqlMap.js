var sqlMap = {
    login: {
      selectUser:'select * from administrator where name = ?',
    },
  }
  
  module.exports = sqlMap;