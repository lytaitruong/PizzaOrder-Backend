module.exports = {
    "roots": [
      "<rootDir>/"
    ],
    "transform": {
      "^.+\\.jsx?$": "js-jest"
    },
    "coverageReporters": ['lcov', 'text', 'text-summary'],
    "testMatch": ["(/__tests__/.*/.*(test|spec))\\.js?$", '**/?(*.)(spec|test).js'],
    "moduleFileExtensions": [
      "js",
      "jsx",
      "json",
      "node"
    ],
    "coveragePathIgnorePatterns": [
      'index.js'
    ],
    "testPathIgnorePatterns": [
      "test/helpers/"
    ],
    "collectCoverageFrom": [
      "src/api/**/*.js",
      "src/services/*.js"
    ],
}
  
  