import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Home from '../components/home/Home'
import UserCrud from '../components/user/UserCrud'
import Login from '../components/auth/Login'

export default props =>
      <Routes>
            <Route exact path='/' element={<Home />} />
            <Route path='/crud' element={<UserCrud />} />
            <Route path='/login' element={<Home />} />
            <Route path='*' element={<Home />} />
      </Routes>