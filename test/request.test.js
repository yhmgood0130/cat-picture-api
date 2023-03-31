const supertest = require("supertest");
const should = require("should");

let user_id;
let cat_id;

const server = supertest.agent("http://localhost:4000");

describe("/user requests", function () {
  describe("POST /users ", function () {
    it("should create a user", function (done) {
      server
        .post("/auth")
        .send({
          first_name: "nyan",
          last_name: "cat",
          email: "nein@cat.com",
          password: "catmeme",
        })
        .end(function (err, res) {
          should(res.status).be.eql(200);
          user_id = res.body.user_id;
          done();
        });
    });
  });

  describe("After creating a profile", function () {
    const auth = {};
    before(loginUser(auth));
    describe("/POST /cats", function () {
      it("should upldad a new cat picture", function (done) {
        server
          .post(`/cats`)
          .set("Authorization", "bearer " + auth.token)
          .attach("image", "./images/cat3.png")
          .field("name", "test1")
          .end(function (err, res) {
            should(res.status).be.eql(200);
            should(res.body.data.user_id).be.eql(user_id);
            should(res.body.message).be.eql("Image added");
            cat_id = res.body.data.id;
            done();
          });
      });
    });

    describe("/PUT /cats/:id", function () {
      it("should update the cat picture", function (done) {
        server
          .put(`/cats/${cat_id}`)
          .set("Authorization", "bearer " + auth.token)
          .attach("image", "./images/cat6.png")
          .field("name", "test2")
          .end(function (err, res) {
            should(res.status).be.eql(200);
            should(res.body.data.name).be.eql("test2");
            should(res.body.data.user_id).be.eql(user_id);
            should(res.body.message).be.eql("Image updated");
            done();
          });
      });
    });

    describe("/DELETE /cats/:id", function () {
      it("should delete the cat picture", function (done) {
        server
          .delete(`/cats/${cat_id}`)
          .set("Authorization", "bearer " + auth.token)
          .end(function (err, res) {
            should(res.status).be.eql(204);
            should(res.body.message).be.eql("Image removed");
            done();
          });
      });
    });
  });
});

function loginUser(auth) {
  return function (done) {
    server
      .post("/auth/login")
      .send({
        email: "nein@cat.com",
        password: "catmeme",
      })
      .expect(200)
      .end(onResponse);

    function onResponse(err, res) {
      auth.token = res.body.token;
      return done();
    }
  };
}
