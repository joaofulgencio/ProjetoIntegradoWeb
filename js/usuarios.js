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

// Evento para salvar o usuário selecionado no sessionStorage
document.getElementById('user-dropdown').addEventListener('change', async () => {
    const selectedUserId = document.getElementById('user-dropdown').value;
    if (selectedUserId) {
        sessionStorage.setItem('selectedUserId', selectedUserId);
        alert('Usuário selecionado com sucesso.');
    }
    await listaCartoes()
    await listaServicos()
    await listaKits()
});