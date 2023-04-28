export class GithubUser {
  static search(username) {

    const endpoint = `https://api.github.com/users/${username}`

    return fetch(endpoint)
      .then(data => data.json())
      .then(({ login, name, public_repos, followers }) => ({
        login,
        name,
        public_repos,
        followers
      }))
  }
}

export class Favorites {
  constructor(root) {
    this.root = document.querySelector(root)
    this.load()
  }

  load() {
    this.entries = JSON.parse(localStorage.getItem('@github-favorites:')) || []
  }

  save() {
    localStorage.setItem('@github-favorites:', JSON.stringify(this.entries))
  }

  async add(username) {
    try {
      const userExist = this.entries.find(entry => entry.login === username)

      if (userExist) {
        throw new Error("Usuário ja cadastrado!")
      }

      const user = await GithubUser.search(username)

      if (user.login === undefined) {
        throw new Error("Usuário não encontrado!")
      }

      this.entries = [user, ...this.entries]
      this.update()
      this.save()

    } catch (error) {
      alert(error.message)
    }
  }

  delete(user) {
    const filteredEntries = this.entries.filter(entry =>
      entry.login !== user.login)
    //colocando um novo array, após verificar o resultado acima 
    this.entries = filteredEntries
    this.update()
    this.save()
  }
}

export class FavoritesViwer extends Favorites {
  constructor(root) {
    super(root)
    this.update()
    this.onadd()
  }

  onadd() {
    const btn = this.root.querySelector('header button')
    btn.onclick = () => {
      const { value } = this.root.querySelector('header input')

      this.add(value)
    }
  }

  update() {
    this.removeAllRow()
    this.dataUser()
  }

  dataUser() {
    this.entries.forEach(user => {
      const tbody = document.querySelector('table tbody')
      const tr = this.createTr()

      tr.querySelector('.user img').src = `https://github.com/${user.login}.png`
      tr.querySelector('.user p').innerHTML = `${user.name}`
      tr.querySelector('.user span').innerHTML = `${user.login}`
      tr.querySelector('.repositories').innerHTML = `${user.public_repos}`
      tr.querySelector('.followers').innerHTML = `${user.followers}`

      tr.querySelector('.remove').onclick = () => {
        let isOk = confirm("Deseja deletar ?")
        if (isOk) {
          this.delete(user)
        }
      }

      tbody.append(tr)
    })
  }

  createTr() {
    const tr = document.createElement('tr')
    tr.innerHTML = `
    <td class="user">
      <img src="https://github.com/Felipe-Monte.png" alt="Foto de Felipe-Monte">
      <a href="#">
        <p>Carlos Felipe</p>
        <span>Felipe login</span>
      </a>
    </td>
    <td class="repositories">
      123
    </td>
    <td class="followers">
      1234
    </td>
    <td class="action">
      <button class="remove">Remover</button>
    </td>
   `
    return tr
  }

  removeAllRow() {
    const row = document.querySelectorAll('table tbody tr')
    row.forEach(row => {
      row.remove()
    })
  }

}