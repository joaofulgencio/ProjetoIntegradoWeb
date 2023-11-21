const listaCartoes = async () => {

    const listaCartao = document.getElementById('user-service-cards');
    listaCartao.innerHTML = '';
    const selectedUser = sessionStorage.getItem('selectedUserId');
    const lista = await axios.get(`http://localhost:3000/users/${selectedUser}/cartoes`)
    if (lista.data.length === 0) {
        const li = document.createElement('li');
        li.innerHTML = 'Nenhum cartão cadastrado.';
        listaCartao.appendChild(li);
        const userCards = document.getElementsByClassName('user-cards');
        userCards[0].style.display = 'block';
        return;
    } else {
        lista.data.forEach((cartao) => {
            const li = document.createElement('li');
            li.innerHTML = `Cartão de Serviço: ${cartao.id}`;
            li.setAttribute('cartao-id', cartao.id)
            listaCartao.appendChild(li);
            li.addEventListener('click', handleCartaoServicoLiClick)
            if(cartao.usado) {
                li.classList.add("disabled")
                li.removeEventListener('click', handleCartaoServicoLiClick)
            }
            const userCards = document.getElementsByClassName('user-cards');
            userCards[0].style.display = 'block';
            return;
        })
    }
}

const handleCartaoServicoLiClick = (event) => {
    const cartaoId= event.currentTarget.getAttribute('cartao-id')
    if(cartaoId) {
        //Seta id do cartão selecionado no session Storage
        sessionStorage.setItem('selectedCartaoId', cartaoId);
        const cartaoIdList = document.querySelectorAll('#user-service-cards li')
        cartaoIdList.forEach((card) => {
            //Remove classe selected-card dos cartões anteriores
            card.classList.remove('selected-card')
        })
        //Seta classe selected Card no cartão clicado
        event.currentTarget.classList.add('selected-card')
    }
}


document.getElementById('create-card-button').addEventListener('click', () => {
    const selectedUser = sessionStorage.getItem('selectedUserId');
    axios.post(`http://localhost:3000/cartoes/${selectedUser}`)
        .then(() => {
            alert('Cartão de Serviço criado com sucesso.');
            listaCartoes();
        })
});

