'use strict';

describe('Service: geneHiveService', function () {

  // load the service's module
  beforeEach(module('ligatorApp'));

  // instantiate service
  var geneHiveService;
  beforeEach(inject(function (_geneHiveService_) {
    geneHiveService = _geneHiveService_;
  }));

  it('should do something', function () {
    expect(!!geneHiveService).toBe(true);
  });
  it('should create a user')

});
