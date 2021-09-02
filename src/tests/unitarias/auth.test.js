import user from '../../models/user.model'
import request from 'supertest'
import express from 'express'
import { app, server } from '../../app'

let tokenLoggedIn
const userObj = {
    email: 'authUser@gmail.com',
    password: '215421'
}

describe('Post auth/login', () => {
    it('Should require authorization', (done) => {
        request(app)
            .post('/auth/login')
            .expect(401)
            .end((err, res) => {
                tokenLoggedIn = res.body.token
                if (err) return done(err)
                done()
            })
    })

    it('responds with json', function (done) {
        request(app)
            .get('/user')
            .send({
                email: 'authUser@gmail.com',
                password: '215421'
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err)
                return done()
            })
    })
})
