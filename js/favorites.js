
export class Favorites {
  constructor(root) {
    this.root = document.querySelector(root)
    this.load()
  }

  load() {
    this.entries = [
      {
        name: "Felipe-Monte",
        login: "Felipe-login",
        public_repor: 123,
        followers: 1234
      },
      {
        name: "Jonas",
        login: "Jonas-login",
        public_repor: 222,
        followers: 2323
      }
    ]
  }

  delete(user) {
    const filteredEntries = this.entries.filter(entry =>
      entry.login !== user.login)
    console.log(filteredEntries)
  }
}

export class FavoritesViwer extends Favorites {
  constructor(root) {
    super(root)
    this.update()
  }

  update() {
    this.removeAllRow()
    this.dataUser()
  }

  dataUser() {
    this.entries.forEach(user => {
      const tbody = document.querySelector('table tbody')
      const tr = this.createTr()

      tr.querySelector('.user img').src = `https://github.com/${user.name}.png`
      tr.querySelector('.user p').innerHTML = `${user.name}`
      tr.querySelector('.user span').innerHTML = `${user.login}`
      tr.querySelector('.repositories').innerHTML = `${user.public_repor}`
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