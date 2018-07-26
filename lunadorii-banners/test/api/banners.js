require("dotenv").config({ path: __dirname + "/./../../../.env" })
const supertest = require("supertest")
const should = require("should")

const server = supertest.agent("http://localhost:9006/api/v1")

describe("Unit Test for RestfulAPI: Banners", function() {
	it("Should return success get banners", function(done) {
		server
			.get("/banners")
			.set("Accept", "application/json")
			.expect("Content-type", /json/)
			.expect(200)
			.end(function(err, res) {
				res.status.should.equal(200)
				res.body.name.should.equal("success")
				done()
			})
	})

	it("Should return success get product banners", function(done) {
		server
			.get("/product-banners/1")
			.set("Accept", "application/json")
			.expect("Content-type", /json/)
			.expect(200)
			.end(function(err, res) {
				res.status.should.equal(200)
				res.body.name.should.equal("success")
				done()
			})
	})

	it("Should return success get product banners logged", function(done) {
		server
			.get("/product-banners/1?id=1")
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
