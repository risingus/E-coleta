function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then(res => res.json() )
    .then(states => {
        for(state of states) {
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
    })
    
}

populateUFs()

function getCities(event){
    const citySelect = document.querySelector('select[name=city]')
    const stateInput = document.querySelector('input[name=state]')
    
    const ufValue =event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value> Selecione a Cidade</option>"
    citySelect.disabled = true

    fetch(url)
    .then(res => res.json() )
    .then(cities => {
        for(city of cities) {
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }

        citySelect.disabled = false
    })

}


document
    .querySelector('select[name=uf]')
    .addEventListener('change', getCities)


// Itens de coleta
// pegar todos os li

const itensToCollet = document.querySelectorAll('.itens-grid li')

for (const item of itensToCollet) {
    item.addEventListener("click", handleSelectedItem)
}

const collectedItens = document.querySelector("input[name=itens]")

let selectedItens = []

function handleSelectedItem(event) {
    const itemLi = event.target
    //adicionar ou remover classe selected
    itemLi.classList.toggle("selected")
    

    const itemId = itemLi.dataset.id


    //verificar se existem itens selecionados, caso sim, pegar os itens

    const alreadySelected = selectedItens.findIndex(item => {
        const itemFound = item == itemId //será true or false
        return itemFound
    })


    //se estiver selecionado
    if(alreadySelected >= 0) {
        // remover seleção
        const filteredItens = selectedItens.filter(item => {
            const itemIsDifferent = item != itemId
            return itemIsDifferent
        })

       selectedItens = filteredItens
    }else {
          //caso não estiver selecionado, adicionar a seleção
          selectedItens.push(itemId)
    }

       //atualizar o campo escondido com itens selecionados
       collectedItens.value = selectedItens

    
}
    