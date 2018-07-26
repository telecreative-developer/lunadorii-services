const supertest = require("supertest")
const should = require("should")

const server = supertest.agent("http://localhost:9009/api/v1")

describe("Unit Test for RestfulAPI: Search", function() {
	it("Should return success search", function(done) {
		server
			.get("/search?payload=Pro")
			.set("Accept", "application/json")
			.expect("Content-type", /json/)
			.expect(200)
			.end(function(err, res) {
				res.status.should.equal(200)
				res.body.name.should.equal("success")
				done()
			})
	})

	it("Should return success search with subcategories", function(done) {
		server
			.get("/search?payload=Pro&subcategories=[1,2,3]")
			.set("Accept", "application/json")
			.expect("Content-type", /json/)
			.expect(200)
			.end(function(err, res) {
				res.status.should.equal(200)
				res.body.name.should.equal("success")
				done()
			})
	})

	it("Should return success search with maxPrice & minPrice", function(done) {
		server
			.get("/search?payload=Pro&maxPrice=100000&minPrice=1000")
			.set("Accept", "application/json")
			.expect("Content-type", /json/)
			.expect(200)
			.end(function(err, res) {
				res.status.should.equal(200)
				res.body.name.should.equal("success")
				done()
			})
	})

	it("Should return success search with all attributes", function(done) {
		server
			.get(
				"/search?payload=Pro&subcategories=[1,2,3]&maxPrice=100000&minPrice=1000"
			)
			.set("Accept", "application/json")
			.expect("Content-type", /json/)
			.expect(200)
			.end(function(err, res) {
				res.status.should.equal(200)
				res.body.name.should.equal("success")
				done()
			})
	})
})

describe("Unit Test for RestfulAPI: Search Logged", function() {
	it("Should return success search logged", function(done) {
		server
			.get("/search?payload=Pro&id=1")
			.set("Accept", "application/json")
			.expect("Content-type", /json/)
			.expect(200)
			.end(function(err, res) {
				res.status.should.equal(200)
				res.body.name.should.equal("success")
				done()
			})
	})

	it("Should return success search with subcategories", function(done) {
		server
			.get("/search?payload=Pro&subcategories=[1,2,3]&id=1")
			.set("Accept", "application/json")
			.expect("Content-type", /json/)
			.expect(200)
			.end(function(err, res) {
				res.status.should.equal(200)
				res.body.name.should.equal("success")
				done()
			})
	})

	it("Should return success search with maxPrice & minPrice", function(done) {
		server
			.get("/search?payload=Pro&maxPrice=100000&minPrice=1000&id=1")
			.set("Accept", "application/json")
			.expect("Content-type", /json/)
			.expect(200)
			.end(function(err, res) {
				res.status.should.equal(200)
				res.body.name.should.equal("success")
				done()
			})
	})

	it("Should return success search with all attributes", function(done) {
		server
			.get(
				"/search?payload=Pro&subcategories=[1,2,3]&maxPrice=100000&minPrice=1000&id=1"
			)
			.set("Accept", "application/json")
			.expect("Content-type", /json/)
			.expect(200)
			.end(function(err, res) {
				res.status.should.equal(200)
				res.body.name.should.equal("success")
				done()
			})
	})
})
