import React from 'react'
import Main from '../template/Main'

const headerProps = {
      icon: 'home',
      title: 'Homepage',
      subtitle: 'Home de Eggstravaganza'
}

export default props =>
      <Main {...headerProps}>
            <div className="display-4">
                  Bem Vindo!
            </div>
            <hr />
            <p className="mb-0">
                  Webloja Eggstravaganza
            </p>
      </Main>
