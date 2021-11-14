let expect = require('chai').expect
let chaiHttp = require('chai-http')
let chai = require('chai')
chai.should()
chai.use(chaiHttp)

let BASE_URL= 'http://localhost:7000'
let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MTdmNmU1ZjliZTQ0YzYxOGFiZDliNGYiLCJuYW1lIjoicGV0ZXIiLCJpYXQiOjE2MzY5MDYyODEsImV4cCI6MTYzOTQ5ODI4MX0.lArZgUmtuQbT5EJQC_atYLPquR3_TqfXBGv2XOJOCgM'
describe('JOBS API', () => {
    
    describe('GET /' ,()=>{
        //the main route
        it('it should return the home page', (done)=>{
            chai.request(BASE_URL)
            .get('/')
            .end((err,res) =>{
                res.should.have.status(200)
                res.text.should.equal('Welcome')
                done()
            })
        })

        //get all public jobs
        it('it should return the public jobs' ,(done) => {
            chai.request(BASE_URL)
            .get('/api/v1')
            .end((err,res) =>{
                res.should.have.status(200)
                res.body.should.a('object')
                // res.body.length.should.not.be.equal(0)
                done()
            })
        })

        it('it should return error msg to unauthorized access' , (done) =>{
            chai.request(BASE_URL)
            .get('/api/v1/job')
            .end((err,res) => {
                res.text.should.equal('Authentication failed')
                done()
            })
        })

        it('it should check the authorized route' , (done) =>{
            chai.request(BASE_URL)
            .get('/api/v1/user/login')
            .set({'Authorization':`Bearer ${token}`})
            .end( (err,res) =>{
                res.should.have.status(200)
                const data = res.body
                console.log(data)
                done()
            })
        })

        

    })
})