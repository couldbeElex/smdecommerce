import React, {Component} from 'react'
import axios from 'axios'
import Main from '../template/Main'

const headerProps = {
      icon: 'users',
      title: 'CRUD',
      subtitle: 'Cadastro de usuários: Incluir, Listar, Alterar e Excluir'
}

const baseUrl = 'http://localhost:3001/users'
const initialState = {
      user: { name: '', email: '', password: '', admin: false },
      list: []
}

export default class UserCrud extends Component {

      state = {...initialState}

      componentWillMount() {
            axios(baseUrl).then(resp => {
                  this.setState({ list: resp.data })
            })
      }

      clear() {
            this.setState({user: initialState.user})
      }
      /* 
       * Limpa o formulário. Usado ao preencher e submeter o formulário
       * reiniciando seu estado.
       */

      getUpdatedList(user, add = true) {
            const list = this.state.list.filter(u => u.id !== user.id)
            if(add) list.unshift(user)
            return list
      }
      /*
       * Remove o user (parâmetro) da lista e origina uma nova,
       * adicionando ao processo de cadastro original.
       * Em seguida, busca o novo elemento e joga ao início da lista
       * através do unshift.
       * Retorna list e entrega à função de save.
       */

      save() {
            const user = this.state.user
            const method = user.id ? 'put' : 'post'
            const url = user.id ? `${baseUrl}/${user.id}` : baseUrl
            axios[method](url, user)
                  .then(resp => {
                        const list = this.getUpdatedList(resp.data)
                        this.setState({user: initialState.user, list})
                  })
      }
      /*
       * Submete os dados ao servidor (local, por configuração).
       * Possui dois parâmetros. Verifica se user.id é real (> 0),
       * retornando dois comandos: PUT (modifica os dados) == true,
       * e POST (publica novos dados) == false. Em seguida, chama
       * o axios, que invoca o método de parâmetro duplo (url/user)
       * e os preenche com o usuário obtido à partir do webservice
       * (resp.data). Limpa o formulário e atualiza a lista ao fim. 
       */

      updateField(event) {
            const user = {...this.state.user}
            user[event.target.name] = event.target.value
            this.setState({user})
      }

      renderForm() {
            return (
                  <div className="form">
                        <div className="row">
                              <div className="col-12 col-md-4">
                                    <div className="form-group">
                                          <label>Nome</label>
                                          <input type="text" className="form-control"
                                                name="name"
                                                value={this.state.user.name}
                                                onChange={e => this.updateField(e)}
                                                placeholder="Digite o nome" required/>
                                    </div>
                              </div>
                              <div className="col-12 col-md-4">
                                    <div className="form-group">
                                          <label>E-mail</label>
                                          <input type="text" className="form-control"
                                                name="email"
                                                value={this.state.user.email}
                                                onChange={e => this.updateField(e)}
                                                placeholder="Digite seu e-mail" required/>
                                    </div>
                              </div>
                              <div className="col-12 col-md-4">
                                    <div className="form-group">
                                          <label>Senha</label>
                                          <input type="password" className="form-control"
                                                name="password"
                                                value={this.state.user.password}
                                                onChange={e => this.updateField(e)}
                                                placeholder="Crie uma senha" required/>
                                    </div>
                              </div>
                              <div className="col-12 col-md-4">
                                    <div className="form-group">
                                          <label>Admin?</label>
                                          <input type="checkbox" className="form-control"
                                                name="admin"
                                                value={this.state.user.password}
                                                onChange={e => this.updateField(e)}
                                                placeholder="Crie uma senha" required/>
                                    </div>
                              </div>
                        </div>

                        <hr />

                        <div className="row">
                              <div className="col-12 d-flex justify-content-end">
                                    <button className="btn btn-primary"
                                          onClick={e => this.save(e)}>

                                          Salvar
                                    </button>
                                    <button className="btn btn-secondary ml-2"
                                          onClick={e => this.clear(e)}>

                                          Cancelar
                                    </button>
                              </div>
                        </div>

                  </div>
            )
      }

      //--- Funções de edição de tabela ---//

      load(user) {
            this.setState({ user })
      }

      delete(user) {
            axios.delete(`${baseUrl}/${user.id}`).then(resp => {
                  const list = this.getUpdatedList(user, false)
                  this.setState({ list })
            })
      }

      renderTable() {
            return (
                  <table className="table mt-4">
                        <thead>
                              <tr>
                                    <th>ID      </th>
                                    <th>Nome    </th>
                                    <th>E-mai   </th>
                                    <th>Senha   </th>
                                    <th>Admin?  </th>
                                    <th>Ações   </th>
                              </tr>
                        </thead>
                        <tbody>
                              {this.renderRows()}
                        </tbody>
                  </table>
            )

      }

      renderRows() {
            return this.state.list.map(user => {
                  return (
                        <tr key={user.id}>
                              <td>{user.id}      </td>
                              <td>{user.name}    </td>
                              <td>{user.email}   </td>
                              <td>{user.password}</td>
                              <td>{user.admin}   </td>
                              <td>
                                    <button className="btn btn-warning"
                                          onClick={() => this.load(user)}>

                                          <i className="fa fa-pencil"></i>
                                    </button>
                                    <button className="btn btn-danger ml-2"
                                          onClick={() => this.delete(user)}>

                                          <i className="fa fa-trash"></i>
                                    </button>
                              </td>
                        </tr>
                  )
            })
      }

      render () {

            return (
                  <Main {...headerProps}>
                        {this.renderForm()}
                        {this.renderTable()}
                  </Main>
            )
      }
}