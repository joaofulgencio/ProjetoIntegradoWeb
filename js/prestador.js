const exibirComprasDoUsuario = async () => {
    const selectedUser = sessionStorage.getItem('selectedUserId');
    if (!selectedUser) {
        alert('Nenhum usuário selecionado!');
        return;
    }

    try {
        const response = await axios.get(`http://localhost:3000/compras/${selectedUser}`);
        const compras = response.data;

        const listaCompras = document.getElementById('user-service-cards-bought');
        listaCompras.innerHTML = '';

        if (compras.length === 0) {
            const li = document.createElement('li');
            li.innerHTML = 'Nenhuma compra encontrada para este usuário.';
            listaCompras.appendChild(li);
        } else {
            for (const compra of compras) {
                const li = document.createElement('li');
                li.innerHTML = `Identificador da compra: ${compra.id} Data da Compra: ${new Date(compra.data_da_compra).toLocaleDateString()}`;
                li.setAttribute('compra-id', compra.id)
                li.addEventListener('click', handleCompraLiClick)
                // Adicionando detalhes da compra
                const detalhesCompra = await axios.get(`http://localhost:3000/compras/${compra.id}/detalhes`);
                if (detalhesCompra.data && detalhesCompra.data.length > 0) {
                    const ulDetalhes = document.createElement('ul');
                    detalhesCompra.data.forEach(det => {
                        const liDetalhe = document.createElement('li');
                        if(det.id_servico) {
                            liDetalhe.innerHTML = `Serviço ID: ${det.id_servico}, Quantidade: ${det.quantidade}, Preço Unitário: ${det.preco_unitario}`;
                        }
                        if(det.id_kit) {
                            liDetalhe.innerHTML = `Kit ID: ${det.id_kit}, Quantidade: ${det.quantidade}, Preço Unitário: ${det.preco_unitario}`;
                        }
                        if (det.utilizado) {
                            liDetalhe.classList.add('disabled');
                        }
                        ulDetalhes.appendChild(liDetalhe);
                    });
                    li.appendChild(ulDetalhes);
                }

                listaCompras.appendChild(li);
            }
            const provider = document.getElementsByClassName('prestador-servicos-cards')
            provider[0].style.display = 'block';
        }

        const providerView = document.getElementsByClassName('provider-view');
        providerView[0].style.display = 'block';
    } catch (error) {
        console.error('Erro ao buscar compras do usuário:', error);
        alert('Erro ao buscar compras do usuário.');
    }
}

const exibirRecompensasDoUsuario = async () => {
    // Exibir recompensas do usuário
    const selectedUser = sessionStorage.getItem('selectedUserId');
    if (!selectedUser) {
        alert('Nenhum usuário selecionado!');
        return;
    }
    try {
        const response = await axios.get(`http://localhost:3000/recompensas/${selectedUser}`);
        const recompensas = response.data;

        const listaRecompensas = document.getElementById('user-rewards-list');
        listaRecompensas.innerHTML = '';

        if (recompensas.length === 0) {
            const li = document.createElement('li');
            li.innerHTML = 'Nenhuma recompensa encontrada para este usuário.';
            listaRecompensas.appendChild(li);
        } else {
            for (const recompensa of recompensas) {
                const li = document.createElement('li');
                li.innerHTML = `Id: ${recompensa.id} Descricao: ${recompensa.descricao}`;
                li.setAttribute('recompensa-id', recompensa.id)
                if(recompensa.ativa === false) {
                    li.classList.add('disabled-reward');
                }
                li.addEventListener('click', handleRecompensaLiClick)
                listaRecompensas.appendChild(li);
            }
            const provider = document.getElementsByClassName('user-rewards')
            provider[0].style.display = 'block';
        }

        const providerView = document.getElementsByClassName('provider-view');
        providerView[0].style.display = 'block';

    } catch (error) {
        console.error('Erro ao buscar recompensas do usuário:', error);
        alert('Erro ao buscar recompensas do usuário.');
    }
}
const handleCompraLiClick = (event) => {
    const compraId= event.currentTarget.getAttribute('compra-id')
    if(compraId) {
        //Seta id da compra selecionada no session Storage
        sessionStorage.setItem('selectedCompraId', compraId);
        const compraIdList = document.querySelectorAll('#user-service-cards-bought li')
        compraIdList.forEach((card) => {
            //Remove classe selected-card dos cartões anteriores
            card.classList.remove('selected-card')
        })
        //Seta classe selected Card no cartão clicado
        event.currentTarget.classList.add('selected-card')
    }

}

const handleRecompensaLiClick = (event) => {
    const recompensaId= event.currentTarget.getAttribute('recompensa-id')
    if(recompensaId) {
        //Seta id da recompensa selecionada no session Storage
        sessionStorage.setItem('selectedRecompensaId', recompensaId);
        const recompensaIdList = document.querySelectorAll('#user-rewards-list li')
        recompensaIdList.forEach((card) => {
            //Remove classe selected-card dos cartões anteriores
            card.classList.remove('selected-card')
        })
        //Seta classe selected Card no cartão clicado
        event.currentTarget.classList.add('selected-card')
    }
}

document.getElementById('utilizar-servico-button').addEventListener('click', async () => {
    const selectedCompraId = sessionStorage.getItem('selectedCompraId');
    const selectedUserId = sessionStorage.getItem('selectedUserId');
    if (!selectedCompraId) {
        alert('Nenhuma compra selecionada!');
        return;
    }

    try {
        const result = await axios.patch(`http://localhost:3000/servicos/utilizar/${selectedUserId}/${selectedCompraId}`);
        alert(result.data.mensagem);
        exibirComprasDoUsuario();
        exibirRecompensasDoUsuario();
    } catch (error) {
        console.error('Erro ao utilizar compra:', error);
        alert('Erro ao utilizar compra.');
    }
});

document.getElementById('utilizar-recompensa-button').addEventListener('click', async () => {
    const selectedRecompensaId = sessionStorage.getItem('selectedRecompensaId');
    const selectedUserId = sessionStorage.getItem('selectedUserId');
    if (!selectedRecompensaId) {
        alert('Nenhuma recompensa selecionada!');
        return;
    }

    try {
        const result = await axios.patch(`http://localhost:3000/recompensas/utilizar/${selectedRecompensaId}/usuario/${selectedUserId}`);
        alert(result.data.mensagem);
        exibirComprasDoUsuario();
        exibirRecompensasDoUsuario();
    } catch (error) {
        console.error('Erro ao utilizar recompensa:', error);
        alert('Erro ao utilizar recompensa.');
    }
})