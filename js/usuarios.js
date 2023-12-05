// script.js

// Função para preencher o dropdown com a lista de usuários
const preencherDropdown = () => {
    const userDropdown = document.getElementById('user-dropdown');
    userDropdown.innerHTML = ''
    const carregandoUsuariosDaApi = document.createElement('option')
    carregandoUsuariosDaApi.text = 'Carregando usuários...'
    carregandoUsuariosDaApi.disabled = true
    carregandoUsuariosDaApi.selected = true
    userDropdown.appendChild(carregandoUsuariosDaApi)
    // Realize a solicitação para obter a lista de usuários da API
    axios.get('http://localhost:3000/users')
        .then((response) => {
            // Limpe as opções atuais do dropdown
            userDropdown.innerHTML = '';

            // Cria uma opção default para exibir para o usuário
            const defaultOption = document.createElement('option');
            defaultOption.text = 'Selecione um usuário';
            defaultOption.disabled = true;
            defaultOption.selected = true;
            userDropdown.appendChild(defaultOption);

            if(response.data.length === 0) {
                userDropdown.innerHTML = '';
                const option = document.createElement('option');
                option.text = 'Nenhum usuário cadastrado';
                option.disabled = true;
                option.selected = true;
                userDropdown.appendChild(option);
            }

            // Preencha o dropdown com os usuários da API
            response.data.forEach((user) => {
                const option = document.createElement('option');
                option.value = user.id;
                option.text = user.nome;
                userDropdown.appendChild(option);
            });
        })
        .catch((error) => {
            console.error('Erro ao carregar usuários:', error);
        });
};

// Chama a função para preencher o dropdown quando a página carregar
preencherDropdown();

document.getElementById('user-view-button').addEventListener('click', async () => {
    document.getElementsByClassName('prestador-servicos-cards')[0].style.display = 'none';
    document.getElementsByClassName('acordeao-servicos')[0].style.display = 'none';
    document.getElementsByClassName('acordeao-recompensas')[0].style.display = 'none';
    document.getElementsByClassName('vendas-servicos-individuais')[0].style.display = 'none';
    document.getElementsByClassName('vendas-kits')[0].style.display = 'none';
    document.getElementsByClassName('servicos-utilizados-tipo')[0].style.display = 'none';
    document.getElementsByClassName('recompensas-geradas')[0].style.display = 'none';
    document.getElementsByClassName('servicos-nao-utilizados')[0].style.display = 'none';
    document.getElementsByClassName('kits-nao-utilizados')[0].style.display = 'none';
    sessionStorage.setItem('context', 'user');
    sessionStorage.removeItem('selectedUserId');
    sessionStorage.removeItem('selectedServicos');
    preencherDropdown();
})

document.getElementById('provider-view-button').addEventListener('click', async () => {
    document.getElementsByClassName('user-cards')[0].style.display = 'none';
    document.getElementsByClassName('lista-servicos')[0].style.display = 'none';
    document.getElementsByClassName('lista-kits')[0].style.display = 'none';
    document.getElementsByClassName('user-rewards')[0].style.display = 'none';
    document.getElementsByClassName('acordeao-servicos')[0].style.display = 'none';
    document.getElementsByClassName('acordeao-recompensas')[0].style.display = 'none';
    document.getElementsByClassName('vendas-servicos-individuais')[0].style.display = 'none';
    document.getElementsByClassName('vendas-kits')[0].style.display = 'none';
    document.getElementsByClassName('servicos-utilizados-tipo')[0].style.display = 'none';
    document.getElementsByClassName('recompensas-geradas')[0].style.display = 'none';
    document.getElementsByClassName('servicos-nao-utilizados')[0].style.display = 'none';
    document.getElementsByClassName('kits-nao-utilizados')[0].style.display = 'none';
    sessionStorage.setItem('context', 'provider');
    sessionStorage.removeItem('selectedUserId');
    sessionStorage.removeItem('selectedServicos');
    preencherDropdown();
})

document.getElementById('manager-view-button').addEventListener('click', async () => {
    document.getElementsByClassName('prestador-servicos-cards')[0].style.display = 'none';
    document.getElementsByClassName('acordeao-servicos')[0].style.display = 'none';
    document.getElementsByClassName('acordeao-recompensas')[0].style.display = 'none';
    document.getElementsByClassName('user-cards')[0].style.display = 'none';
    document.getElementsByClassName('lista-servicos')[0].style.display = 'none';
    document.getElementsByClassName('lista-kits')[0].style.display = 'none';
    document.getElementsByClassName('user-rewards')[0].style.display = 'none';
    document.getElementsByClassName('acordeao-servicos')[0].style.display = 'none';
    document.getElementsByClassName('acordeao-recompensas')[0].style.display = 'none';
    document.getElementsByClassName('vendas-servicos-individuais')[0].style.display = 'none';
    document.getElementsByClassName('vendas-kits')[0].style.display = 'none';
    document.getElementsByClassName('servicos-utilizados-tipo')[0].style.display = 'none';
    document.getElementsByClassName('recompensas-geradas')[0].style.display = 'none';
    document.getElementsByClassName('servicos-nao-utilizados')[0].style.display = 'none';
    document.getElementsByClassName('kits-nao-utilizados')[0].style.display = 'none';
    sessionStorage.setItem('context', 'manager');
    sessionStorage.removeItem('selectedUserId');
    sessionStorage.removeItem('selectedServicos');
    preencherDropdown();
})

// Evento para salvar o usuário selecionado no sessionStorage
document.getElementById('user-dropdown').addEventListener('change', async () => {
    const selectedUserId = document.getElementById('user-dropdown').value;
    if (selectedUserId) {
        sessionStorage.setItem('selectedUserId', selectedUserId);
        alert('Usuário selecionado com sucesso.');
    }
    if(sessionStorage.getItem('context') === 'user') {
        await listaCartoes()
        await listaServicos()
        await listaKits()
        await listarTodasAsComprasDoUsuario()
        await listarTodasAsRecompensasDoUsuario()
    }
    if(sessionStorage.getItem('context') === 'provider') {
        await exibirComprasDoUsuario()
        await exibirRecompensasDoUsuario()
    }
    if(sessionStorage.getItem('context') === 'manager') {
        await listarVendasDeServicosIndividuais()
        await listarVendasDeKits()
        await servicosUtilizadosTipo()
        await listarRecompensasGeradas()
        await listarServicosIndividuaisNaoUtilizados()
        await listarKitsDeServicosNaoUtilizados()
    }
});