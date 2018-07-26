require("dotenv").config({ path: __dirname + "/./../../../.env" })
const supertest = require("supertest")
const should = require("should")

const server = supertest.agent("http://localhost:9007/api/v1")

describe("Unit Test for RestfulAPI: Banks", function() {
	it("Should return success banks", function(done) {
		server
			.get("/general/banks")
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
