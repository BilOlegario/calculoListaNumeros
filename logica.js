class Numeros {
    constructor() {
        this.id = 1
        this.arrayNumeros = []
        this.editId = null
    }

    salvar() {
        let numero = this.lerDados()

        if (this.validaCampos(numero)) {
            if (this.editId == null) {
                this.adicionar(numero)
            } else {
                this.atualizar(this.editId, numero)
            }
        }

        this.listaTabela()
        this.cancelar()
    }

    listaTabela() {
        let tbody = document.getElementById('tbody')
        tbody.innerText = ''

        for (let i = 0; i < this.arrayNumeros.length; i++) {
            let tr = tbody.insertRow()

            let td_id = tr.insertCell()
            let td_valor = tr.insertCell()
            let td_acoes = tr.insertCell()

            td_id.innerText = this.arrayNumeros[i].id
            td_valor.innerText = this.arrayNumeros[i].valor

            td_id.classList.add('center')

            let imgEdit = document.createElement('img')
            imgEdit.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIEAAACBCAMAAADQfiliAAAAZlBMVEUAAAD///+amprCwsJ6enrOzs76+vrR0dF1dXXw8PAdHR0PDw8jIyMJCQnIyMgZGRmPj4+ioqI4ODixsbGCgoK8vLxqampGRkbl5eXe3t6pqakpKSlBQUFMTExTU1PY2NhcXFwxMTGcuIulAAAD+UlEQVR4nN2b2ZaqMBBFCVOLKDjh0Hqv+v8/2QyNApkqVRVcq8+jD2Gb2iTFFAT+stvsq/3h6vEI5tyqVDRJ9/8+A7DIRJ9su/wAwFYMc/4/O0AlJtnn8wJ8TwGEuM9qw0YGqG1YzAdwVAHU2c4FsNMACFHMRHDREoj7bg6AUA8gxOXkH+BhAqh9vPkGKO9mAiF8n5XGGnSz8PAK8EytBJ4RIjtAjeCxEBYNX/Gn4wFIkPk7KRVbkjIXf0vT1n70NndvBIDTsYvHPQKK4HGnhLrgsV8AuuBzWQAW4s7XO66RCHsugLI6TH8CusDVxCdCxNPfYC6ceS5lkmYsCQFWCI5TclW0Q6VSIUAIDOdD3u/HqTQLIBfoMibvwVAupNSL+2Q4GsoFqXpOWY1bIpQL3xSA9bQnw7hQUQgSeTz3QhBUXCsAEAgbNMBS3RbLLpjPiBTfrun6ckcX8Bp86Qd1KQT6MjIvTP/LAQHbJ2kc6AN3Ab0xGWdAwF1AS2BwoA+oENjl0OxAPwuABRq7EpSgy2NFIaYuHJEAVgdeMbtweWIBAA5oEQaFCLHHL8EzIEwu3B9YgBzmwAtB7UIallgAuAN9VC5EaAOcHNAiHB744y+dZ0CoXMDH0YEXgjQL6GBmoA0XAsIBVgTLdmwOhwtSW+6IQJ8FZVfsEiKCui13C6kQK1oJulTSjR6HcAAk+J2AwYEGgHD8nAOAcgOXxYFoRSBAL8WDJJT7ln/CgYgA8EccoCxEn3agZHGAMAM8DlBuW3MAfBGOz+IAZSnmcYCwEl45SlBQHIgZAEgOaN4mcpsBGgAdgeLAb6APbjUzQGnJOBCIDvTBF4LtmToWIeIoQRdcIQrO1xAxCCQHYukWp3shaA6E8l1WVwTSdtw2ZRKCWyGoDjRjIB9fd6GuA+t2FEIhKG15m0U7TIouBNGB4H3vHYlAasu7vNoS1HsElLb8N+X7LXOEC5S2vM/u/WajuwukS7M+i+GIjoVgKEEwfQjkhMADML1EcXCBoSVrcj2Ph4W7UHA4UOeUTUcGFoKpBMprBAlBVQg2AOUfBLjA5EAT6aMPAXGBy4E6uaSBuhBjBL4SjFZEM8LGE8B4RQS6wNiWB4YlT+8Cy17wjuGOgcYF1hIEXY8IRth4ADASqFzgdSDQf3+kcyFm/2DQ9iYj47NjTay3rvBvr8GyVK+IMyLoVkSjC6zRrojD8D3EVwT2erXPWQDeQ/WH8Dzbj+4X4WY/FZoUoTcVbPeR0yzaLhguy/QxiJid64PvuDcBKaoesfnnVRifZvlifK0QMQoXu/m+Tx59D9jUHP3eIDb91tzV/BMfqNddV3qutvGN8MIaLXF4fHo912z5AbBvLvzFKVIjAAAAAElFTkSuQmCC'
            imgEdit.setAttribute("onclick", "numero.preparaEditacao(" + JSON.stringify(this.arrayNumeros[i]) + ")")

            let imgDelete = document.createElement('img')
            imgDelete.src = 'data:image/png;base64,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'
            imgDelete.setAttribute("onclick", "numero.deletar(" + this.arrayNumeros[i].id + ")")

            td_acoes.appendChild(imgEdit)
            td_acoes.appendChild(imgDelete)
        }
    }

    adicionar(numero) {
        this.arrayNumeros.push(numero)
        this.id++
    }

    atualizar(id, numero) {
        for (let i = 0; i < this.arrayNumeros.length; i++) {
            if (this.arrayNumeros[i].id == id) {
                this.arrayNumeros[i].valor = numero.valor
            }
        }
    }

    preparaEditacao(dados) {
        this.editId = dados.id

        document.getElementById('numero').value = dados.valor

        document.getElementById('btn1').innerText = 'Atualizar'
    }

    lerDados() {
        let numero = {}

        numero.id = this.id
        numero.valor = document.getElementById('numero').value
        numero.valor = parseFloat(numero.valor).toFixed(2)

        return numero
    }

    validaCampos(numero) {
        let msg = ''
        if (numero.valor == NaN) {
            msg += '- Informe valor do Número'
        }
        if (msg != '') {
            alert(msg)
            return false
        }
        return true
    }

    cancelar() {
        document.getElementById('numero').value = ''

        document.getElementById('btn1').innerText = 'Salvar'
        this.editId = null
    }

    deletar(id) {

        if (confirm(`Deseja realmente deletar o produto do ID ${id}`)) {
            let tbody = document.getElementById('tbody')

            for (let i = 0; i < this.arrayNumeros.length; i++) {
                if (this.arrayNumeros[i].id == id) {
                    this.arrayNumeros.splice(i, 1)
                    tbody.deleteRow(i)
                }
            }
        }
    }

    calcular() {
        let resultado = []
        let expected = parseFloat(document.getElementById("esperado").value)
        let precision = 100;
        let validador = false

        let target = Math.floor(expected * precision);

        for (let i = 1; i < Math.pow(2, this.arrayNumeros.length); i++) {
            let soma = 0;
            let set = [];
            for (let j = 0; j < this.arrayNumeros.length; j++) {
                if (1 << j & i) {
                    set.push(this.arrayNumeros[j]);
                    soma += Math.floor(this.arrayNumeros[j].valor * precision);
                }
            }
            if (soma == target) {
                validador = true
                for (let i = 0; i < set.length; i++) {
                    resultado.push(`${set[i].id} => ${set[i].valor}`)
                }
                let resultadoFinal = document.getElementById("resultadoFinal")
                resultadoFinal.innerHTML = resultado.join(" - ")
            }
            if (validador == false) {
                let resultadoFinal = document.getElementById("resultadoFinal")
                resultadoFinal.innerHTML = ("Nenhuma soma foi encontrada!")
            }
        }
    }

    salvarOnKey(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            numero.salvar();
        }
    }

    calcularOnKey(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            numero.calcular();
        }
    }
}

let numero = new Numeros()